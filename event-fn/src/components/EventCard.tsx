import React from 'react';

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

interface Props {
  event: Event;
  onEdit: (event: Event) => void;
  onDelete: (id: string) => void;
  onView: (event: Event) => void; // 👈 Add this
}

const getBackgroundColor = (dateStr: string) => {
  const now = new Date();
  const eventDate = new Date(dateStr);
  const diff = Math.floor((eventDate.getTime() - now.getTime()) / (1000 * 60 * 60 * 24));
  if (diff < 0) return 'bg-red-200';
  if (diff <= 2) return 'bg-yellow-100';
  return 'bg-white';
};

const Countdown: React.FC<{ eventDate: string }> = ({ eventDate }) => {
  const [timeLeft, setTimeLeft] = React.useState('');

  React.useEffect(() => {
    const interval = setInterval(() => {
      const now = new Date().getTime();
      const target = new Date(eventDate).getTime();
      const diff = target - now;

      if (diff <= 0) {
        setTimeLeft('Event is happening now!');
        return;
      }

      const days = Math.floor(diff / (1000 * 60 * 60 * 24));
      const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
      const minutes = Math.floor((diff / (1000 * 60)) % 60);
      const seconds = Math.floor((diff / 1000) % 60);

      setTimeLeft(`${days}d ${hours}h ${minutes}m ${seconds}s`);
    }, 1000);

    return () => clearInterval(interval);
  }, [eventDate]);

  return <p className='text-sm text-gray-600 mt-2'>{timeLeft}</p>;
};

const EventCard: React.FC<Props> = ({ event, onEdit, onDelete, onView }) => {
  return (
    <div
      className={`p-4 rounded shadow cursor-pointer ${getBackgroundColor(event.date)}`}
      onClick={() => onView(event)}
    >
      <h3 className='text-lg font-semibold'>{event.title}</h3>
      <p>
        {event.description.length > 150
          ? `${event.description.slice(0, 150)}...`
          : event.description}
      </p>
      <p className='text-sm text-gray-600'>{new Date(event.date).toLocaleString()}</p>
      <Countdown eventDate={event.date} />
      <div className='flex gap-2 mt-2'>
        <button
          onClick={(e) => {
            e.stopPropagation();
            onEdit(event);
          }}
          className='text-blue-600 hover:underline'
        >
          Edit
        </button>
        <button
          onClick={(e) => {
            e.stopPropagation();
            onDelete(event.id);
          }}
          className='text-red-600 hover:underline'
        >
          Delete
        </button>
      </div>
    </div>
  );
};

export default EventCard;
