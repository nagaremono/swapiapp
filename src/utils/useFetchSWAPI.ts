import Axios from 'axios';
import { useState, useRef, useEffect } from 'react';
import { BASE_API_URL } from '../constants';
import { ApiResponse } from '../types/ApiResponse';

type SWResource =
  | 'species'
  | 'people'
  | 'films'
  | 'starships'
  | 'vehicles'
  | 'planets';

interface StateMethod {
  data: ApiResponse;
  fetchMore: () => Promise<void>;
  isLoading: boolean;
  search: (string: string) => Promise<void>;
  error: ErrorObject | null;
}

interface ErrorObject {
  name: string;
  message: string;
}

export const useFetchSWAPI = (resource: SWResource): StateMethod => {
  const [data, setData] = useState<ApiResponse>({
    count: 0,
    next: null,
    previous: null,
    results: null,
  });
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<ErrorObject | null>(null);

  const isMounted = useRef(true);

  const withData = (url: any, cb: (resObj: ApiResponse) => void) => {
    return async () => {
      try {
        if (url) {
          const httpsUrl = url.startsWith('https://')
            ? url
            : `https://${url.slice(7)}`;
          setIsLoading(true);
          const response = await Axios.get(httpsUrl);
          cb(response.data);
          setIsLoading(false);
        }
      } catch (error) {
        setError({ name: error.name, message: error.message });
        setIsLoading(false);
      }
    };
  };

  const search = async (searchString: string) => {
    await withData(
      `${BASE_API_URL}/${resource}/?search=${searchString}`,
      (searchResult) => {
        setData(searchResult);
      }
    )();
  };

  const fetchMore = withData(data.next, (nextPage) => {
    setData((prevPage) => {
      return {
        ...nextPage,
        results: [...prevPage.results, ...nextPage.results],
      };
    });
  });

  useEffect(() => {
    return () => {
      isMounted.current = false;
    };
  });

  useEffect(() => {
    const getSpecies = withData(`${BASE_API_URL}/${resource}/`, (response) => {
      if (isMounted.current) {
        setData(response);
      }
    });

    getSpecies();
  }, [resource]);

  return { data, fetchMore, isLoading, search, error };
};
