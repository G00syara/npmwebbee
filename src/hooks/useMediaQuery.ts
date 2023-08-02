import { useEffect, useState } from 'react';

interface UseQueryType {
  query: string;
}

export const useMediaQuery = ({ query }: UseQueryType): boolean => {
  const [state, setState] = useState<boolean>(
    typeof window !== 'undefined' ? () => window.matchMedia(query).matches : false,
  );

  useEffect(() => {
    const MediaQueryHandle = () => {
      setState(() => window.matchMedia(query).matches);
    };

    const mediaQueryList = window.matchMedia(query);

    mediaQueryList.addEventListener('change', MediaQueryHandle);
    return () => {
      mediaQueryList.removeEventListener('change', MediaQueryHandle);
    };
  }, [query]);
  return state;
};
