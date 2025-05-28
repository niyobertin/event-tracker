import * as yup from 'yup';

export const eventSchema = yup.object().shape({
  title: yup.string().required('Event title is required'),
  description: yup.string().required('Event description is required'),
  date: yup
    .string()
    .required('Event date and time is required')
    .test('is-future', 'Event date must be in the future', (value) => {
      return new Date(value || '') > new Date();
    }),
});
