import { Box, Heading, Text } from '@chakra-ui/core';
import React from 'react';

export const Welcome: React.FC = ({ children }) => {
  return (
    <Box mb={2} py={2} borderColor="main.line1" boxShadow="xl">
      <Heading mb={2}>Welcome</Heading>
      <Text>
        This is a list of every known species in the Star Wars Universe. Browse
        the list or find certain species using the search box below.
      </Text>
      {children}
    </Box>
  );
};
