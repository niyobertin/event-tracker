import React from 'react';
import { Dialog } from '@headlessui/react';

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
  isOpen: boolean;
  onClose: () => void;
  event: Event | null;
}

const EventDetailModal: React.FC<Props> = ({ isOpen, onClose, event }) => {
  if (!event) return null;

  return (
    <Dialog open={isOpen} onClose={onClose} className='fixed z-50 inset-0 overflow-y-auto'>
      <div className='flex items-center justify-center min-h-screen p-4'>
        <Dialog.Panel className='bg-white dark:bg-gray-900 p-6 rounded-lg w-full max-w-lg shadow-xl'>
          <Dialog.Title className='text-lg font-bold mb-4 dark:text-gray-100'>{event.title}</Dialog.Title>
          <p className='text-gray-700 dark:text-gray-200 mb-2'>{event.description}</p>
          <p className='text-sm text-gray-500 dark:text-gray-400 mb-4'>
            Scheduled for: {new Date(event.date).toLocaleString()}
          </p>
          <button onClick={onClose} className='text-blue-600 dark:text-blue-400 hover:underline'>
            Close
          </button>
        </Dialog.Panel>
      </div>
    </Dialog>
  );
};

export default EventDetailModal;
