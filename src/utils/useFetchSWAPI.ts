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
          setIsLoading(true);
          const response = await Axios.get(url);
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

  const fetchMore = withData(data.next, (next) => {
    setData((prev) => {
      return {
        ...next,
        results: [...prev.results, ...next.results],
      };
    });
  });

  useEffect(() => {
    return () => {
      isMounted.current = false;
    };
  });

  useEffect(() => {
    const getSpecies = withData(`${BASE_API_URL}/${resource}/`, (res) => {
      if (isMounted.current) {
        setData(res);
      }
    });

    getSpecies();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return { data, fetchMore, isLoading, search, error };
};
