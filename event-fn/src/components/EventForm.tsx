// components/EventForm.tsx
import React from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { eventSchema } from '../schemas/eventSchema';

interface EventInput {
  title: string;
  description: string;
  date: string; // ISO date string (e.g., "2025-06-10T14:00")
}

interface Props {
  onSubmit: (data: EventInput) => void;
  initialData?: EventInput;
}

const EventForm: React.FC<Props> = ({ onSubmit, initialData }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<EventInput>({
    resolver: yupResolver(eventSchema),
    defaultValues: initialData || {
      title: '',
      description: '',
      date: '',
    },
  });

  return (
    <form onSubmit={handleSubmit(onSubmit)} className='space-y-4'>
      <div>
        <label className='block text-sm font-medium'>Title</label>
        <input type='text' {...register('title')} className='w-full border rounded p-2' />
        <p className='text-red-500 text-sm'>{errors.title?.message}</p>
      </div>

      <div>
        <label className='block text-sm font-medium'>Description</label>
        <textarea {...register('description')} className='w-full border rounded p-2' />
        <p className='text-red-500 text-sm'>{errors.description?.message}</p>
      </div>

      <div>
        <label className='block text-sm font-medium'>Date & Time</label>
        <input type='datetime-local' {...register('date')} className='w-full border rounded p-2' />
        <p className='text-red-500 text-sm'>{errors.date?.message}</p>
      </div>

      <button type='submit' className='bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700'>
        {initialData ? 'Update Event' : 'Create Event'}
      </button>
    </form>
  );
};

export default EventForm;
