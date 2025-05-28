import React from 'react';

export const Header: React.FC = () => {
  return (
    <header className='bg-white shadow-md fixed top-0 left-0 w-full h-16 flex justify-center items-center z-50'>
      <h1 className='text-xl font-bold text-gray-800'>Welcome to Event Tracker</h1>
    </header>
  );
};
