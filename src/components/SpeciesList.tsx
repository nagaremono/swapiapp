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
import Axios from 'axios';
import React, { useEffect, useState, useRef } from 'react';
import { BASE_API_URL } from '../constants';
import { SpeciesResponse } from '../types/SpeciesResponse';

export const SpeciesList = () => {
  const [data, setData] = useState<SpeciesResponse | null>(null);
  const isMounted = useRef(true);

  useEffect(() => {
    return () => {
      isMounted.current = false;
    };
  });

  useEffect(() => {
    async function getData() {
      const response = await Axios.get(`${BASE_API_URL}/species`);
      if (isMounted.current) {
        setData(response.data);
      }
    }

    getData();
  }, []);

  return (
    <Box>
      <Heading fontSize="3xl">Species List</Heading>
      <VStack spacing={6}>
        {data?.results &&
          data.results?.map((species) => {
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
              </SimpleGrid>
            );
          })}
      </VStack>
    </Box>
  );
};
