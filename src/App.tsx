import * as React from 'react';
import { ChakraProvider, CSSReset } from '@chakra-ui/core';
import { AppHeader } from './components/AppHeader';
import { customTheme } from './theme/customTheme';
import './main.css';

export const App = () => (
  <ChakraProvider theme={customTheme}>
    <CSSReset />
    <AppHeader />
  </ChakraProvider>
);
