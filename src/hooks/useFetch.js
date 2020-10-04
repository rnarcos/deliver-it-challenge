import useSWR from 'swr';

const baseURL = 'http://5d8b64ad3c0aaf0014342c2a.mockapi.io/api/v1/';

export function useFetch(resourceURL, options) {
  const { data, error } = useSWR(resourceURL, async (requestResourceURL) => {
    const response = await fetch(`${baseURL}${requestResourceURL}`, options);
    const responseData = await response.json();

    return responseData;
  });

  return { data, error };
}
