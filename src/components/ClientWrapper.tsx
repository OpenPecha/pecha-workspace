'use client';

import { useEffect } from 'react';
import { useTheme } from '@/hooks/useTheme';

export default function ClientWrapper({ children }: { children: React.ReactNode }) {
  const { theme } = useTheme();

  useEffect(() => {
    // Apply theme on mount and when it changes
    if (typeof document !== 'undefined') {
      document.documentElement.classList.toggle('dark', theme === 'dark');
    }
  }, [theme]);

  return <>{children}</>;
}

