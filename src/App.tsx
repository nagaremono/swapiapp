import * as React from 'react';
import { ChakraProvider, CSSReset } from '@chakra-ui/core';
import { AppHeader } from './components/AppHeader';
import { customTheme } from './theme/customTheme';
import './main.css';
import { Welcome } from './components/Welcome';
import { SpeciesList } from './components/SpeciesList';
import { MainWrapper } from './components/MainWrapper';

export const App = () => (
  <ChakraProvider theme={customTheme}>
    <CSSReset />
    <AppHeader />
    <MainWrapper>
      <Welcome />
      <SpeciesList />
    </MainWrapper>
  </ChakraProvider>
);
