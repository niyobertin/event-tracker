import React, { useState, useEffect } from 'react';

export const Header: React.FC = () => {
  const [darkMode, setDarkMode] = useState(() => {
    if (typeof window !== 'undefined') {
      return localStorage.getItem('theme') === 'dark';
    }
    return false;
  });

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('theme', 'light');
    }
  }, [darkMode]);

  useEffect(() => {
    // On mount, check for system preference if no theme is set
    if (!localStorage.getItem('theme')) {
      const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
      setDarkMode(prefersDark);
    }
  }, []);

  return (
    <header className='bg-white dark:bg-gray-900 shadow-md fixed top-0 left-0 w-full h-16 flex justify-between items-center z-50 px-4'>
      <h1 className='text-xl font-bold text-gray-800 dark:text-gray-100'>Welcome to Event Tracker</h1>
      <button
        onClick={() => setDarkMode((prev) => !prev)}
        className='ml-4 p-2 rounded focus:outline-none bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-100 transition'
        aria-label='Toggle dark mode'
      >
        {darkMode ? '🌙 Dark' : '☀️ Light'}
      </button>
    </header>
  );
};
