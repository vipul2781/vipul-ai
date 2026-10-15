import React, { createContext, useContext, useState, useEffect } from 'react';

const ThemeContext = createContext();

const THEME_STORAGE_KEY = 'nova_store_theme';

export const ThemeProvider = ({ children }) => {
  const [theme, setTheme] = useState(() => {
    try {
      const saved = localStorage.getItem(THEME_STORAGE_KEY);
      if (saved) return saved;
      return window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches
        ? 'dark'
        : 'light';
    } catch (e) {
      return 'light';
    }
  });

  useEffect(() => {
    try {
      document.documentElement.setAttribute('data-bs-theme', theme);
      localStorage.setItem(THEME_STORAGE_KEY, theme);
    } catch (e) {
      console.error('Error saving theme', e);
    }
  }, [theme]);

  const toggleTheme = () => {
    setTheme((prev) => (prev === 'light' ? 'dark' : 'light'));
  };

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme, isDark: theme === 'dark' }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};
