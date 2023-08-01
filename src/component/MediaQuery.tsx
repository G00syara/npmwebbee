import React from 'react';
import { useMediaQuery } from '../hooks/useMediaQuery';
import { Example } from './secondHook/testUseMediaQuery';

interface MediaQueryProps {
  orientation?: 'portrait' | 'landscape';
  minResolution?: number | `${number}dppx`;
  maxResolution?: number | `${number}dppx`;
  minWidth?: number;
  maxWidth?: number;
  minHeight?: number;
  maxHeight?: number;
  children: React.ReactNode | ((matches: boolean) => React.ReactNode);
}

const formatMinResolutionQuery = (minResolution: number | `${number}dppx`) => {
  if (typeof minResolution === 'number') {
    return `(min-resolution: ${minResolution}dppx)`;
  } else {
    return `(min-resolution: ${minResolution})`;
  }
};

const MediaQuery: React.FC<MediaQueryProps> = ({
  orientation,
  minResolution,
  maxResolution,
  minWidth,
  maxWidth,
  minHeight,
  maxHeight,
  children,
}) => {
  const query = [
    orientation ? `(orientation: ${orientation})` : '',
    minResolution ? formatMinResolutionQuery(minResolution) : '',
    maxResolution ? `(max-resolution: ${maxResolution})` : '',
    minWidth ? `(min-width: ${minWidth}px)` : '',
    maxWidth ? `(max-width: ${maxWidth}px)` : '',
    minHeight ? `(min-height: ${minHeight}px)` : '',
    maxHeight ? `(max-height: ${maxHeight}px)` : '',
  ]
    .filter((q) => q !== '')
    .join(' and ');

  const matches = useMediaQuery({ query });

  return <>{typeof children === 'function' ? children(matches) : matches && children}</>;
};

export default MediaQuery;
