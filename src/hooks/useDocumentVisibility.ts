import React, { useEffect, useState, useCallback } from 'react';

type Callback = (isVisible: boolean) => void;

export const useDocumentVisibility = () => {
  const [visible, setVisible] = useState<boolean>(true);
  const [count, setCount] = useState<number>(0);

  const onVisibilityChange = useCallback((callback: Callback) => {
    const listener = () => {
      callback(document.hidden);
    };

    document.addEventListener('visibilitychange', listener);

    return () => {
      document.removeEventListener('visibilitychange', listener);
    };
  }, []);

  const handleVisibilityChange = () => {
    if (document.hidden) {
      setVisible(false);
      setCount((prevCount) => prevCount + 1);
    } else {
      setVisible(true);
    }
  };

  useEffect(() => {
    document.addEventListener('visibilitychange', handleVisibilityChange);
    return () => {
      document.removeEventListener('visibilitychange', handleVisibilityChange);
    };
  }, []);

  return { visible, count, onVisibilityChange };
};
