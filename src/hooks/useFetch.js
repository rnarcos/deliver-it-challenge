import useSWR from 'swr';
import api from '../global/api';

export function useFetch(resourceURL, options) {
  const { data, error, mutate } = useSWR(resourceURL, async (requestResourceURL) => {
    const response = await api.get(requestResourceURL, options);

    return response.data;
  });

  return { data, error, mutate };
}
