import { Box, Heading, VStack } from '@chakra-ui/core';
import React from 'react';
import { Waypoint } from 'react-waypoint';
import { useFetchSWAPI } from '../utils/useFetchSWAPI';
import { LoadIndicator } from './LoadIndicator';
import { SearchBox } from './SearchBox';
import { SpeciesListItem } from './SpeciesListItem';

export const SpeciesList = () => {
  const { data, fetchMore, isLoading, search } = useFetchSWAPI('species');

  return (
    <Box>
      <Heading fontSize="3xl">Species List</Heading>
      <SearchBox onSubmit={search} />
      <VStack spacing={6}>
        {data?.results &&
          data.results?.map((species, index, arr) => {
            return (
              <SpeciesListItem key={species.name} species={species}>
                {index === arr.length - 3 && (
                  <Waypoint
                    onEnter={() => {
                      fetchMore();
                    }}
                  />
                )}
              </SpeciesListItem>
            );
          })}
        {isLoading && <LoadIndicator />}
      </VStack>
    </Box>
  );
};
