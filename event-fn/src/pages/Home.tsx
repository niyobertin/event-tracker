import { useState, useEffect, useRef } from 'react';
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
  date: string;
}

export interface Event extends EventInput {
  id: string;
  createdAt: string;
  updatedAt: string;
}

const API_URL = 'https://jsonplaceholder.typicode.com/posts'; // Placeholder API

const Home = () => {
  const [events, setEvents] = useState<Event[]>([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [editingEvent, setEditingEvent] = useState<Event | null>(null);
  const [viewingEvent, setViewingEvent] = useState<Event | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const notifiedRef = useRef<Set<string>>(new Set());

  // Fetch events
  useEffect(() => {
    setLoading(true);
    setError(null);
    fetch(API_URL)
      .then((res) => res.json())
      .then((data) => {
        setEvents(
          data.slice(0, 10).map((item: any) => ({
            id: String(item.id),
            title: item.title,
            description: item.body,
            date: new Date(Date.now() + Math.random() * 5 * 60 * 1000).toISOString(), // random future date within 5 min
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString(),
          }))
        );
        setLoading(false);
      })
      .catch((err) => {
        setError('Failed to fetch events');
        toast.error('Failed to fetch events');
        setLoading(false);
      });
  }, []);

  // Notification for events hitting deadline in 1 min
  useEffect(() => {
    const interval = setInterval(() => {
      const now = Date.now();
      events.forEach((event) => {
        const eventTime = new Date(event.date).getTime();
        if (
          eventTime - now <= 60 * 1000 &&
          eventTime - now > 0 &&
          !notifiedRef.current.has(event.id)
        ) {
          notifiedRef.current.add(event.id);
          toast.info(`⏰ Event "${event.title}" is starting in less than 1 minute!`, {
            autoClose: 15000,
            style: { fontWeight: 'bold', fontSize: '1.1rem', color: '#d97706', background: '#fffbe6' },
          });
          const audio = new Audio(NOTIFICATION_SOUND);
          audio.play();
        }
      });
    }, 10000); // check every 10 seconds
    return () => clearInterval(interval);
  }, [events]);

  const handleCreate = async (data: EventInput) => {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch(API_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });
      const newEvent = await res.json();
      setEvents((prev) => [
        {
          ...data,
          id: String(newEvent.id || Math.random()),
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
        },
        ...prev,
      ]);
      setModalOpen(false);
      toast.success('Event created successfully!');
    } catch (err) {
      setError('Failed to create event');
      toast.error('Failed to create event');
    } finally {
      setLoading(false);
    }
  };

  const handleUpdate = async (data: EventInput) => {
    if (!editingEvent) return;
    setLoading(true);
    setError(null);
    try {
      await fetch(`${API_URL}/${editingEvent.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });
      setEvents((prev) =>
        prev.map((e) =>
          e.id === editingEvent.id
            ? { ...e, ...data, updatedAt: new Date().toISOString() }
            : e
        )
      );
      setEditingEvent(null);
      setModalOpen(false);
      toast.success('Event updated successfully!');
    } catch (err) {
      setError('Failed to update event');
      toast.error('Failed to update event');
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: string) => {
    setLoading(true);
    setError(null);
    try {
      await fetch(`${API_URL}/${id}`, { method: 'DELETE' });
      setEvents((prev) => prev.filter((e) => e.id !== id));
      toast.success('Event deleted successfully!');
    } catch (err) {
      setError('Failed to delete event');
      toast.error('Failed to delete event');
    } finally {
      setLoading(false);
    }
  };

  const openEditModal = (event: Event) => {
    setEditingEvent(event);
    setModalOpen(true);
  };

  // Sort events by soonest date before rendering
  const sortedEvents = [...events].sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());

  return (
    <Layout>
      <ToastContainer position='top-right' />
      <div className='p-6 max-w-5xl mx-auto'>
        <div className='flex justify-between items-center mb-6'>
          <h1 className='text-3xl font-bold'>Event Tracker</h1>
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
