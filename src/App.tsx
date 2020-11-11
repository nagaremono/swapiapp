import * as React from 'react';
import { ChakraProvider, Container, CSSReset } from '@chakra-ui/core';
import { AppHeader } from './components/AppHeader';
import { customTheme } from './theme/customTheme';
import './main.css';
import { Welcome } from './components/Welcome';
import { SpeciesList } from './components/SpeciesList';

export const App = () => (
  <ChakraProvider theme={customTheme}>
    <CSSReset />
    <AppHeader />
    <Container>
      <Welcome />
      <SpeciesList />
    </Container>
  </ChakraProvider>
);
