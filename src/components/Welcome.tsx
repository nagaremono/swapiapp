import { Box, Heading, Text } from '@chakra-ui/core';
import React from 'react';

export const Welcome: React.FC = ({ children }) => {
  return (
    <Box p={2} border="3px solid" borderColor="main.secondary" boxShadow="lg">
      <Heading>Welcome</Heading>
      <Text>
        This is a list of every species in the Star Wars Universe. Browse the
        list or find certain species using the search box below.
      </Text>
      {children}
    </Box>
  );
};
