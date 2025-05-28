import React from 'react';
import { Header } from './Header';

export const Layout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <div className='flex flex-col min-h-screen'>
      <Header />
      <main className='flex-grow p-4 bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-gray-100'>{children}</main>
      <footer className='bg-white dark:bg-gray-800 shadow-inner py-4 text-center text-gray-500 dark:text-gray-400 text-sm'>
        &copy; {new Date().getFullYear()} EventTracker. All rights reserved.
      </footer>
    </div>
  );
};
