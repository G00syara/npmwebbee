import React from 'react';
import { useMediaQuery } from '../hooks/useMediaQuery';
import { Example } from './secondHook/testUseMediaQuery';

type ResolutionQuery = number | `${number}dppx`;

interface MediaQueryProps {
  orientation?: 'portrait' | 'landscape';
  minResolution?: ResolutionQuery;
  maxResolution?: ResolutionQuery;
  minWidth?: number;
  maxWidth?: number;
  minHeight?: number;
  maxHeight?: number;
  children: React.ReactNode | ((matches: boolean) => React.ReactNode);
}

const formatMinResolutionQuery = (minResolution: ResolutionQuery) => {
  return typeof minResolution === 'number'
    ? `(min-resolution: ${minResolution}dppx)`
    : `(min-resolution: ${minResolution})`;
};

const formatMaxResolutionQuery = (maxResolution: ResolutionQuery) => {
  return typeof maxResolution === 'number'
    ? `(min-resolution: ${maxResolution}dppx)`
    : `(min-resolution: ${maxResolution})`;
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
    maxResolution ? formatMaxResolutionQuery(maxResolution) : '',
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
