import { Flex, Spinner } from '@chakra-ui/core';
import React from 'react';

export const LoadIndicator = () => {
  return (
    <Flex justifyContent="center">
      <Spinner
        label="Loading..."
        mx="auto"
        size="lg"
        thickness="3px"
        speed="0.6s"
      />
    </Flex>
  );
};
