import React from 'react';
import { Dialog } from '@headlessui/react';
import EventForm from '../EventForm';

interface EventInput {
  title: string;
  description: string;
  date: string;
}

interface Props {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: EventInput) => void;
  initialData?: EventInput;
}

const EventModal: React.FC<Props> = ({ isOpen, onClose, onSubmit, initialData }) => {
  return (
    <Dialog open={isOpen} onClose={onClose} className='fixed z-50 inset-0 overflow-y-auto'>
      <div className='flex items-center justify-center min-h-screen p-4'>
        <Dialog.Panel className='bg-white dark:bg-gray-900 p-6 rounded-lg w-full max-w-lg shadow-xl'>
          <Dialog.Title className='text-lg font-bold mb-4 dark:text-gray-100'>
            {initialData ? 'Edit Event' : 'Add Event'}
          </Dialog.Title>
          <EventForm onSubmit={onSubmit} initialData={initialData} />
        </Dialog.Panel>
      </div>
    </Dialog>
  );
};

export default EventModal;
