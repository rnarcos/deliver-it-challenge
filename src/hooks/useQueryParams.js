import { useLocation } from 'react-router-dom';
import { parse } from 'query-string';

export function useQueryParams() {
  const { search } = useLocation();

  return parse(search);
}
