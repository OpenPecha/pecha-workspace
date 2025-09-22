import React, { useEffect } from 'react';
import { useThemeStore } from '~/store/theme';

const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { theme } = useThemeStore();

  useEffect(() => {
    // Apply theme to document on mount and when theme changes
    document.documentElement.classList.toggle('dark', theme === 'dark');
  }, [theme]);

  // Also apply theme immediately on hydration to prevent flash
  useEffect(() => {
    const savedTheme = localStorage.getItem('theme-storage');
    if (savedTheme) {
      try {
        const parsed = JSON.parse(savedTheme);
        const themeValue = parsed.state?.theme;
        if (themeValue) {
          document.documentElement.classList.toggle('dark', themeValue === 'dark');
        }
      } catch (error) {
        console.log('Failed to parse saved theme:', error);
      }
    }
  }, []);

  return <>{children}</>;
};

export default ThemeProvider;
