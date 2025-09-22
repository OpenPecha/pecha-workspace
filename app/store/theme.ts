import { create } from 'zustand';
import { devtools, persist } from 'zustand/middleware';

type Theme = 'light' | 'dark';

interface ThemeStore {
  theme: Theme;
  toggleTheme: () => void;
  setTheme: (theme: Theme) => void;
}

export const useThemeStore = create<ThemeStore>()(
  devtools(
    persist(
      (set, get) => ({
        theme: 'light',
        toggleTheme: () => {
          const newTheme = get().theme === 'light' ? 'dark' : 'light';
          set({ theme: newTheme });
          // Apply theme to document immediately
          document.documentElement.classList.toggle('dark', newTheme === 'dark');
        },
        setTheme: (theme: Theme) => {
          set({ theme });
          // Apply theme to document immediately
          document.documentElement.classList.toggle('dark', theme === 'dark');
        },
      }),
      {
        name: 'theme-storage',
        onRehydrateStorage: () => (state) => {
          // Apply theme on rehydration
          if (state?.theme) {
            document.documentElement.classList.toggle('dark', state.theme === 'dark');
          }
        },
      }
    )
  )
);
