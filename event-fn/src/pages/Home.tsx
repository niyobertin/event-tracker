import { useState } from 'react';
import EventCard from '../components/EventCard';
import EventModal from '../components/Model/EventModal';
import { v4 as uuid } from 'uuid';
import EventDetailModal from '../components/Model/EventDetailModal';
import { Layout } from '../components/common/Layout';

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

const Home = () => {
  const [events, setEvents] = useState<Event[]>([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [editingEvent, setEditingEvent] = useState<Event | null>(null);
  const [viewingEvent, setViewingEvent] = useState<Event | null>(null);

  const handleCreate = (data: EventInput) => {
    const newEvent: Event = {
      ...data,
      id: uuid(),
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
    setEvents((prev) =>
      [...prev, newEvent].sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime()),
    );
    setModalOpen(false);
  };

  const handleUpdate = (data: EventInput) => {
    setEvents((prev) =>
      prev
        .map((e) =>
          e.id === editingEvent?.id ? { ...e, ...data, updatedAt: new Date().toISOString() } : e,
        )
        .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime()),
    );
    setEditingEvent(null);
    setModalOpen(false);
  };

  const handleDelete = (id: string) => {
    setEvents((prev) => prev.filter((e) => e.id !== id));
  };

  const openEditModal = (event: Event) => {
    setEditingEvent(event);
    setModalOpen(true);
  };

  return (
    <Layout>
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

        <div className='grid md:grid-cols-2 lg:grid-cols-3 gap-6'>
          {events.map((event) => (
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
