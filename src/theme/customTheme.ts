import { extendTheme } from '@chakra-ui/core';

export const customTheme = extendTheme({
  colors: {
    main: {
      primary: '#22223b',
      secondary: '#4a4e69',
      line1: '#9a8c98',
      line2: '#c9ada7',
      white: '#f2e9e4',
    },
  },
  fonts: {
    header: 'Bree Serif, serif',
  },
  layerStyles: {
    tags: {
      bg: 'main.secondary',
      color: 'main.white',
    },
    custBorder: {
      borderColor: 'main.line2',
    },
  },
});
