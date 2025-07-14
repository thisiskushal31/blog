
// useTheme.tsx - Provides theme context and hooks for light/dark/system theme switching.
// Used to manage and persist the user's theme preference across the app.
// If theme logic fails, an error is logged and a fallback is used.
import { createContext, useContext, useEffect, useState } from 'react';

type Theme = 'dark' | 'light' | 'system';

type ThemeProviderProps = {
  children: React.ReactNode;
  defaultTheme?: Theme;
  storageKey?: string;
};

type ThemeProviderState = {
  theme: Theme;
  setTheme: (theme: Theme) => void;
  toggleTheme: () => void;
};

const initialState: ThemeProviderState = {
  theme: 'system',
  setTheme: () => null,
  toggleTheme: () => null,
};

const ThemeProviderContext = createContext<ThemeProviderState>(initialState);

/**
 * ThemeProvider - Provides theme context to the app.
 * Handles theme switching and persistence.
 */
export function ThemeProvider({
  children,
  defaultTheme = 'system',
  storageKey = 'ui-theme',
  ...props
}: ThemeProviderProps) {
  // Only wrap the logic in try/catch for error boundaries
  try {
    const [theme, setTheme] = useState<Theme>(
      () => (localStorage.getItem(storageKey) as Theme) || defaultTheme
    );

    useEffect(() => {
      const root = window.document.documentElement;
      root.classList.remove('light', 'dark');
      if (theme === 'system') {
        const systemTheme = window.matchMedia('(prefers-color-scheme: dark)')
          .matches
          ? 'dark'
          : 'light';
        root.classList.add(systemTheme);
        return;
      }
      root.classList.add(theme);
    }, [theme]);

    const value = {
      theme,
      setTheme: (theme: Theme) => {
        localStorage.setItem(storageKey, theme);
        setTheme(theme);
      },
      toggleTheme: () => {
        const newTheme = theme === 'light' ? 'dark' : 'light';
        localStorage.setItem(storageKey, newTheme);
        setTheme(newTheme);
      },
    };

    return (
      <ThemeProviderContext.Provider {...props} value={value}>
        {children}
      </ThemeProviderContext.Provider>
    );
  } catch (err) {
    // Log the error and show a fallback UI
    // eslint-disable-next-line no-console
    console.error('Error in ThemeProvider:', err);
    return <>{children}</>;
  }
}

/**
 * useTheme - Hook to access and control the current theme.
 * @returns ThemeProviderState (theme, setTheme, toggleTheme)
 */
export const useTheme = () => {
  try {
    return useContext(ThemeProviderContext);
  } catch (err) {
    // Log the error and return fallback state
    // eslint-disable-next-line no-console
    console.error('Error in useTheme hook:', err);
    return initialState;
  }
};
