import React from 'react';
import { Link } from 'react-router-dom';
export const HeroSection: React.FC = () => {
  return (
    <section className='h-screen flex flex-col justify-center items-center bg-gradient-to-r from-blue-50 to-blue-100 text-center px-4'>
      <h1 className='text-4xl md:text-6xl font-extrabold text-gray-800 mb-4'>
        Welcome to <span className='text-blue-600'>Event Tracker</span>
      </h1>
      <p className='text-lg md:text-xl text-gray-600 max-w-2xl mb-6'>
        Your all-in-one platform to track, manage, and enjoy events effortlessly.
      </p>
      <Link
        to='/home'
        className='bg-blue-600 text-white px-6 py-3 rounded-xl text-lg shadow-md hover:bg-blue-700 transition'
      >
        Explore Events
      </Link>
    </section>
  );
};
