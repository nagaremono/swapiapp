import {
  Box,
  Heading,
  VStack,
  Badge,
  Link,
  HStack,
  SimpleGrid,
} from '@chakra-ui/core';
import { ArrowRightIcon } from '@chakra-ui/icons';
import React from 'react';
import { Waypoint } from 'react-waypoint';
import { useFetchSWAPI } from '../utils/useFetchSWAPI';

export const SpeciesList = () => {
  const [data, fetchMore] = useFetchSWAPI('species');

  return (
    <Box>
      <Heading fontSize="3xl">Species List</Heading>
      <VStack spacing={6}>
        {data?.results &&
          data.results?.map((species, index, arr) => {
            return (
              <SimpleGrid
                alignItems="center"
                columns={2}
                spacingY={1}
                width="100%"
                key={species.name}
              >
                <Heading fontSize="2xl" as="h3">
                  {species.name}
                </Heading>
                <Link justifySelf="end" fontSize="md" href="#">
                  View Details <ArrowRightIcon />
                </Link>
                <HStack>
                  <Badge>{species.classification}</Badge>
                  <Badge>{species.designation}</Badge>
                </HStack>
                {index === arr.length - 3 && (
                  <Waypoint
                    onEnter={() => {
                      fetchMore();
                    }}
                  />
                )}
              </SimpleGrid>
            );
          })}
      </VStack>
    </Box>
  );
};
