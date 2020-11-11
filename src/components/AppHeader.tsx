import { Flex, IconButton, Text } from '@chakra-ui/core';
import React from 'react';
import { GitHubIcon } from './GitHubIcon';

export const AppHeader: React.FC = () => {
  return (
    <Flex
      alignItems="center"
      justifyContent="space-between"
      height="100px"
      bg="main.primary"
    >
      <Text
        as="span"
        px={4}
        fontSize="3xl"
        fontFamily="header"
        color="main.yellow"
      >
        Species in Star Wars
      </Text>
      <IconButton
        mx={4}
        size="sm"
        aria-label="Repository Link"
        icon={<GitHubIcon boxSize={7} />}
      />
    </Flex>
  );
};
