import { Flex, Link, Text } from '@chakra-ui/core';
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
      <Link mx={4} href="https://github.com/nagaremono/swapiapp" isExternal>
        <GitHubIcon boxSize={8} color="#fff" _hover={{ color: 'grey' }} />
      </Link>
    </Flex>
  );
};
