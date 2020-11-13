import { Box, Container } from '@chakra-ui/core';
import React from 'react';

export const MainWrapper: React.FC = ({ children }) => {
  return (
    <Box minHeight="100vh" bg="main.primary" py={4}>
      <Container boxShadow="lg main.white" py={4} color="main.white">
        {children}
      </Container>
    </Box>
  );
};
