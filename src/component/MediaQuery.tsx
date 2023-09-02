import React from 'react';
import { useMediaQuery } from '../hooks/useMediaQuery';

type ResolutionQuery = number | `${number}dppx`;

interface MediaQueryProps {
  orientation?: 'portrait' | 'landscape';
  minResolution?: ResolutionQuery;
  maxResolution?: ResolutionQuery;
  minWidth?: number;
  maxWidth?: number;
  minHeight?: number;
  maxHeight?: number;
  children?: React.ReactNode | ((matches: boolean) => React.ReactNode);
}

const formatMaxMinResolutionQuery = (minResolution?: ResolutionQuery, maxResolution?: ResolutionQuery) => {
  if (typeof minResolution === 'number') {
    return `(min-resolution: ${minResolution}dppx)`;
  }
  if (typeof minResolution !== 'number') {
    return `(min-resolution: ${minResolution})`;
  }
  if (typeof maxResolution === 'number') {
    return `(max-resolution: ${maxResolution}dppx)`;
  }
  if (typeof maxResolution !== 'number') {
    return `(min-resolution: ${maxResolution})`;
  }
  return '';
};

const dataToQuery = (props: MediaQueryProps) => {
  const data: { [key in keyof MediaQueryProps]: (value: MediaQueryProps[key]) => string } = {
    orientation: (value) => `(orientation: ${value})`,
    minWidth: (value) => `(min-width: ${value}px)`,
    maxWidth: (value) => `(max-width: ${value}px)`,
    minHeight: (value) => `(min-height: ${value}px)`,
    maxHeight: (value) => `(max-height: ${value}px)`,
    minResolution: (value) => formatMaxMinResolutionQuery(value),
    maxResolution: (value) => formatMaxMinResolutionQuery(value),
  };

  return Object.entries(props)
    .filter((q) => !!q)
    .map(([key, value]) => data[key as keyof MediaQueryProps]?.(value!))
    .join(' and ');
};

const MediaQuery: React.FC<MediaQueryProps> = ({ children, ...data }) => {
  const matches = useMediaQuery({ query: dataToQuery(data) });
  return <>{typeof children === 'function' ? children(matches) : matches && children}</>;
};

export default MediaQuery;
