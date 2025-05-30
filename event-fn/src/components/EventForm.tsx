import React from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { eventSchema } from '../schemas/eventSchema';

interface EventInput {
  title: string;
  description: string;
  dateTime: string;
  endingTime: string;
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
    defaultValues: initialData
      ? {
          ...initialData,
          dateTime: initialData.dateTime,
          endingTime: initialData.endingTime,
        }
      : {
          title: '',
          description: '',
          dateTime: '',
          endingTime: '',
        },
  });

  const toUTC = (localString: string): string => {
    const localDate = new Date(localString);
    return new Date(localDate.getTime() - localDate.getTimezoneOffset() * 60000).toISOString();
  };

  const handleUTCSubmit = (data: EventInput) => {
    const transformedData: EventInput = {
      ...data,
      dateTime: toUTC(data.dateTime),
      endingTime: toUTC(data.endingTime),
    };

    onSubmit(transformedData);
  };

  return (
    <form onSubmit={handleSubmit(handleUTCSubmit)} className='space-y-4'>
      <div>
        <label className='block text-sm font-medium dark:text-gray-100'>Title</label>
        <input
          type='text'
          {...register('title')}
          className='w-full border rounded p-2 bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100'
        />
        <p className='text-red-500 text-sm'>{errors.title?.message}</p>
      </div>

      <div>
        <label className='block text-sm font-medium dark:text-gray-100'>Description</label>
        <textarea
          {...register('description')}
          className='w-full border rounded p-2 bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100'
        />
        <p className='text-red-500 text-sm'>{errors.description?.message}</p>
      </div>

      <div>
        <label className='block text-sm font-medium dark:text-gray-100'>Date & Time</label>
        <input
          type='datetime-local'
          {...register('dateTime')}
          className='w-full border rounded p-2 bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100'
        />
        <p className='text-red-500 text-sm'>{errors.dateTime?.message}</p>
      </div>

      <div>
        <label className='block text-sm font-medium dark:text-gray-100'>Ending Date & Time</label>
        <input
          type='datetime-local'
          {...register('endingTime')}
          className='w-full border rounded p-2 bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100'
        />
        <p className='text-red-500 text-sm'>{errors.endingTime?.message}</p>
      </div>

      <button
        type='submit'
        className='bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 dark:bg-blue-800 dark:hover:bg-blue-900'
      >
        {initialData ? 'Update Event' : 'Create Event'}
      </button>
    </form>
  );
};

export default EventForm;
