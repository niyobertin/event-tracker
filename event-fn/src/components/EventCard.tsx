import React from 'react';

export interface EventInput {
  title: string;
  description: string;
  date: string; // Start date
  endDate: string;
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
  onView: (event: Event) => void;
}

const getTextColor = (endDate: string) => {
  const now = new Date();
  const eventEnd = new Date(endDate + (endDate.includes('Z') ? '' : 'Z'));
  const diff = Math.floor((eventEnd.getTime() - now.getTime()) / (1000 * 60 * 60 * 24));

  if (diff < 0) return 'text-red-600 dark:text-red-400';
  if (diff <= 2) return 'text-yellow-600 dark:text-yellow-400';
  return 'text-gray-700 dark:text-gray-300';
};

const getStatus = (start: string, end: string) => {
  const now = new Date();
  const startTime = new Date(start + (start.includes('Z') ? '' : 'Z'));
  const endTime = new Date(end + (end.includes('Z') ? '' : 'Z'));

  if (now < startTime) return 'Upcoming';
  if (now >= startTime && now <= endTime) return 'Happening Now';
  return 'Ended';
};

const Countdown: React.FC<{ startDate: string; endDate: string }> = ({ startDate, endDate }) => {
  const [timeLeft, setTimeLeft] = React.useState('');

  React.useEffect(() => {
    const interval = setInterval(() => {
      const now = Date.now();
      const start = new Date(startDate + (startDate.includes('Z') ? '' : 'Z')).getTime();
      const end = new Date(endDate + (endDate.includes('Z') ? '' : 'Z')).getTime();

      if (now < start) {
        const diff = start - now;
        const days = Math.floor(diff / (1000 * 60 * 60 * 24));
        const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
        const minutes = Math.floor((diff / (1000 * 60)) % 60);
        const seconds = Math.floor((diff / 1000) % 60);
        setTimeLeft(`Starts in: ${days}d ${hours}h ${minutes}m ${seconds}s`);
      } else if (now >= start && now <= end) {
        const diff = end - now;
        const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
        const minutes = Math.floor((diff / (1000 * 60)) % 60);
        const seconds = Math.floor((diff / 1000) % 60);
        setTimeLeft(`Ends in: ${hours}h ${minutes}m ${seconds}s`);
      } else {
        setTimeLeft('Event has ended.');
      }
    }, 1000);

    return () => clearInterval(interval);
  }, [startDate, endDate]);

  return <p className={`p-2 rounded text-sm font-medium ${getTextColor(endDate)}`}>{timeLeft}</p>;
};

const EventCard: React.FC<Props> = ({ event, onEdit, onDelete, onView }) => {
  const status = getStatus(event.date, event.endDate);

  return (
    <div
      className='p-4 rounded border dark:border-gray-700 shadow hover:bg-gray-50 dark:hover:bg-gray-900 transition'
      onClick={() => onView(event)}
    >
      <h3 className='text-lg font-semibold dark:text-gray-100'>{event.title}</h3>
      <p className='text-sm text-blue-600 dark:text-blue-400 font-semibold'>{status}</p>
      <p className='dark:text-gray-200'>
        {event.description.length > 150
          ? `${event.description.slice(0, 150)}...`
          : event.description}
      </p>
      <div className='text-sm text-gray-600 dark:text-gray-400 mt-2'>
        <p>
          <strong>Start:</strong>{' '}
          {new Intl.DateTimeFormat('en-US', {
            dateStyle: 'medium',
            timeStyle: 'short',
          }).format(new Date(event.date + (event.date.includes('Z') ? '' : 'Z')))}
        </p>
        <p>
          <strong>End:</strong>{' '}
          {new Intl.DateTimeFormat('en-US', {
            dateStyle: 'medium',
            timeStyle: 'short',
          }).format(new Date(event.endDate + (event.endDate.includes('Z') ? '' : 'Z')))}
        </p>
      </div>
      <Countdown startDate={event.date} endDate={event.endDate} />
      <div className='flex gap-4 mt-3'>
        <button
          onClick={(e) => {
            e.stopPropagation();
            onEdit(event);
          }}
          className='text-blue-600 dark:text-blue-400 hover:underline'
        >
          Edit
        </button>
        <button
          onClick={(e) => {
            e.stopPropagation();
            onDelete(event.id);
          }}
          className='text-red-600 dark:text-red-400 hover:underline'
        >
          Delete
        </button>
      </div>
    </div>
  );
};

export default EventCard;
