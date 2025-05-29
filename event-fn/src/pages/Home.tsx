/* eslint-disable @typescript-eslint/ban-ts-comment */
/* eslint-disable @typescript-eslint/no-explicit-any */
// @ts-nocheck
import { useState, useEffect, useRef, useCallback } from 'react';
import EventCard from '../components/EventCard';
import EventModal from '../components/Model/EventModal';
import EventDetailModal from '../components/Model/EventDetailModal';
import { Layout } from '../components/common/Layout';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import NOTIFICATION_SOUND from '../assets/notification-9-158194.mp3';

export interface EventInput {
  title: string;
  description: string;
  dateTime: string;
}

export interface Event extends EventInput {
  id: string;
  createdAt: string;
  updatedAt: string;
}

const API_URL = import.meta.env.VITE_API_URL;

const Home = () => {
  const [events, setEvents] = useState<Event[]>([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [editingEvent, setEditingEvent] = useState<Event | null>(null);
  const [viewingEvent, setViewingEvent] = useState<Event | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [page, setPage] = useState(1);
  const [limit] = useState(6);
  const [totalPages, setTotalPages] = useState(1);

  const notifiedRef = useRef<Set<string>>(new Set());

  const fetchEvents = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch(`${API_URL}/api/v1/events?page=${page}&limit=${limit}`);
      if (!res.ok) throw new Error('Network response was not ok');
      const response = await res.json();
      setEvents(
        response.events.map((item: any) => ({
          id: item._id,
          title: item.title,
          description: item.description,
          date: item.dateTime,
          createdAt: item.createdAt,
          updatedAt: item.updatedAt,
        })),
      );
      setTotalPages(response.totalPages || 1);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } catch (err: any) {
      setError('Failed to fetch events: ' + err.message);
      toast.error('Failed to fetch events');
    } finally {
      setLoading(false);
    }
  }, [page, limit]);

  useEffect(() => {
    fetchEvents();
  }, [fetchEvents]);

  useEffect(() => {
    const interval = setInterval(() => {
      const now = Date.now();
      events.forEach((event) => {
        const eventTime = new Date(event.date).getTime();
        if (eventTime - now <= 5000 && eventTime - now >= 0 && !notifiedRef.current.has(event.id)) {
          notifiedRef.current.add(event.id);
          toast.info(`⏰ Event "${event.title}" is starting now!`, {
            autoClose: 15000,
            style: {
              fontWeight: 'bold',
              fontSize: '1.1rem',
              color: '#d97706',
              background: '#fffbe6',
            },
          });
          const audio = new Audio(NOTIFICATION_SOUND);
          audio.play();
        }
      });
    }, 10000);
    return () => clearInterval(interval);
  }, [events]);

  const handleCreate = async (data: EventInput) => {
    setLoading(true);
    setError(null);
    try {
      await fetch(API_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });
      toast.success('Event created successfully!');
      fetchEvents();
    } catch (err: any) {
      setError('Failed to create event: ' + err.message);
      toast.error('Failed to create event');
    } finally {
      setModalOpen(false);
      setLoading(false);
    }
  };

  const handleUpdate = async (data: EventInput) => {
    if (!editingEvent) return;
    setLoading(true);
    setError(null);
    try {
      await fetch(`${API_URL}/api/v1/events/${editingEvent.id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });
      toast.success('Event updated successfully!');
      fetchEvents();
    } catch (err: any) {
      setError('Failed to update event: ' + err.message);
      toast.error('Failed to update event');
    } finally {
      setModalOpen(false);
      setEditingEvent(null);
      setLoading(false);
    }
  };

  const handleDelete = async (id: string) => {
    setLoading(true);
    setError(null);
    try {
      await fetch(`${API_URL}/api/v1/events/${id}`, { method: 'DELETE' });
      toast.success('Event deleted successfully!');
      fetchEvents();
    } catch (err: any) {
      setError('Failed to delete event: ' + err.message);
      toast.error('Failed to delete event');
    } finally {
      setLoading(false);
    }
  };

  const openEditModal = (event: Event) => {
    setEditingEvent(event);
    setModalOpen(true);
  };

  const sortedEvents = [...events].sort(
    (a, b) => new Date(a.date).getTime() - new Date(b.date).getTime(),
  );

  return (
    <Layout>
      <ToastContainer position='top-right' aria-label='Notification list' />
      <div className='p-6 max-w-5xl mx-auto'>
        <div className='flex justify-between items-center mb-6'>
          <h1 className='text-3xl font-bold'>Upcoming and Happening events</h1>
          <button
            className='bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700'
            onClick={() => {
              setEditingEvent(null);
              setModalOpen(true);
            }}
          >
            + Add Event
          </button>
        </div>
        {loading && <div className='mb-4 text-blue-600'>Loading...</div>}
        {error && <div className='mb-4 text-red-600'>{error}</div>}
        <div className='grid md:grid-cols-2 lg:grid-cols-3 gap-6'>
          {sortedEvents.map((event) => (
            <EventCard
              key={event.id}
              event={event}
              onEdit={openEditModal}
              onDelete={handleDelete}
              onView={setViewingEvent}
            />
          ))}
        </div>

        <div className='flex justify-center mt-6 space-x-4'>
          <button
            className='px-4 py-2 bg-gray-300 rounded hover:bg-gray-400 disabled:opacity-50'
            onClick={() => setPage((prev) => Math.max(prev - 1, 1))}
            disabled={page === 1}
          >
            Previous
          </button>
          <span className='self-center text-lg font-medium'>
            Page {page} of {totalPages}
          </span>
          <button
            className='px-4 py-2 bg-gray-300 rounded hover:bg-gray-400 disabled:opacity-50'
            onClick={() => setPage((prev) => Math.min(prev + 1, totalPages))}
            disabled={page === totalPages}
          >
            Next
          </button>
        </div>

        <EventDetailModal
          isOpen={!!viewingEvent}
          onClose={() => setViewingEvent(null)}
          event={viewingEvent}
        />
        <EventModal
          isOpen={modalOpen}
          onClose={() => setModalOpen(false)}
          onSubmit={editingEvent ? handleUpdate : handleCreate}
          initialData={editingEvent || undefined}
        />
      </div>
    </Layout>
  );
};

export default Home;
