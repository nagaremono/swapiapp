import { Alert, AlertIcon, Box, Flex, Heading, VStack } from '@chakra-ui/core';
import React from 'react';
import { Waypoint } from 'react-waypoint';
import { useFetchSWAPI } from '../utils/useFetchSWAPI';
import { LoadIndicator } from './LoadIndicator';
import { SearchBox } from './SearchBox';
import { SpeciesListItem } from './SpeciesListItem';

export const SpeciesList = () => {
  const { data, fetchMore, isLoading, search, error } = useFetchSWAPI(
    'species'
  );

  let message;

  if (error && !isLoading) {
    message = (
      <Alert status="error">
        <AlertIcon />
        {error?.message}
      </Alert>
    );
  } else if (data?.results?.length === 0) {
    message = (
      <Alert status="warning">
        <AlertIcon />
        No such species
      </Alert>
    );
  }

  return (
    <Box>
      <Heading fontSize="3xl">Species List</Heading>
      <SearchBox onSubmit={search} />
      <VStack spacing={6}>
        {message || null}
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
        {!data?.next && <Flex fontSize="lg">End of the list</Flex>}
      </VStack>
    </Box>
  );
};
