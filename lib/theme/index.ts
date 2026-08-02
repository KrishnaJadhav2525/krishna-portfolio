import { darkColors } from './dark/colors';
import { darkBackground } from './dark/background';
import { darkEffects } from './dark/effects';
import { darkShadows } from './dark/shadows';

import { lightColors } from './light/colors';
import { lightBackground } from './light/background';
import { lightEffects } from './light/effects';
import { lightShadows } from './light/shadows';

export const darkTheme = {
  name: 'dark',
  colors: darkColors,
  background: darkBackground,
  effects: darkEffects,
  shadows: darkShadows,
};

export const lightTheme = {
  name: 'light',
  colors: lightColors,
  background: lightBackground,
  effects: lightEffects,
  shadows: lightShadows,
};

export type ThemeType = 'dark' | 'light';
