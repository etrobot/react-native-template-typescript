import React from 'react';

export interface themeState {
    theme: string,
    toggleTheme:object
  }
export const ThemeContext = React.createContext<themeState|null>(null);

export const ThemeConstants = {
    light: {
      backgroundColor: '#fff',
      fontColor: '#000',
    },
    dark: {
      backgroundColor: '#000',
      fontColor: '#fff',
    },
  };