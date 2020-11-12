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
import { Waypoint } from 'react-waypoint';
import { BASE_API_URL } from '../constants';
import { SpeciesResponse } from '../types/SpeciesResponse';

export const SpeciesList = () => {
  const [data, setData] = useState<SpeciesResponse | null>(null);
  const isMounted = useRef(true);

  async function getData(url: string) {
    return Axios.get(url);
  }

  async function fetchMore() {
    if (data?.next) {
      const nextPage = await getData(data.next);

      setData({
        ...nextPage.data,
        results: [...data.results, ...nextPage.data.results],
      });
    }
  }

  useEffect(() => {
    return () => {
      isMounted.current = false;
    };
  });

  useEffect(() => {
    async function Species() {
      const response = await getData(`${BASE_API_URL}/species`);
      if (isMounted.current) {
        setData(response.data);
      }
    }

    Species();
  }, []);

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
