import { extendTheme } from '@chakra-ui/core';

export const customTheme = extendTheme({
  colors: {
    main: {
      primary: '#303035',
      secondary: '#829399',
      yellow: '#eef36a',
      pink: '#E8998D',
      brown: '#A1683A',
    },
  },
  fonts: {
    header: 'Bree Serif, serif',
  },
});
