import Axios from 'axios';
import { useState, useRef, useEffect } from 'react';
import { BASE_API_URL } from '../constants';
import { SpeciesResponse } from '../types/SpeciesResponse';

type SWResource =
  | 'species'
  | 'people'
  | 'films'
  | 'starships'
  | 'vehicles'
  | 'planets';

interface StateMethod {
  data: SpeciesResponse | null;
  fetchMore: () => Promise<void>;
  isLoading: boolean;
  search: (string: string) => Promise<void>;
}

export const useFetchSWAPI = (resource: SWResource): StateMethod => {
  const [data, setData] = useState<SpeciesResponse | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const isMounted = useRef(true);

  async function getData(url: string) {
    return Axios.get(url);
  }

  async function search(string: string) {
    if (isMounted) {
      setIsLoading(true);
      const result = await getData(
        `${BASE_API_URL}/${resource}/?search=${string}`
      );

      setIsLoading(false);
      setData(result.data);
    }
  }

  async function fetchMore(): Promise<void> {
    if (data?.next && isMounted) {
      setIsLoading(true);
      const nextPage = await getData(data.next);

      setData({
        ...nextPage.data,
        results: [...data.results, ...nextPage.data.results],
      });
      setIsLoading(false);
    }
  }

  useEffect(() => {
    return () => {
      isMounted.current = false;
    };
  });

  useEffect(() => {
    async function Species() {
      const response = await getData(`${BASE_API_URL}/${resource}`);
      if (isMounted.current) {
        setData(response.data);
        setIsLoading(false);
      }
    }

    Species();
  }, [resource]);

  return { data, fetchMore, isLoading, search };
};
