import React, { useEffect, useState } from 'react';

const useMediaQuery = () => {
  const [isActive, setIsActive] = useState<boolean>(true);
  const [count, setCount] = useState<number>(0);

  const handleVisibilityChange = () => {
    if (document.hidden) {
      setIsActive(false);
      setCount((prevCount) => prevCount + 1);
    } else {
      setIsActive(true);
    }
  };

  useEffect(() => {
    document.addEventListener('visibilitychange', handleVisibilityChange);
    return () => {
      document.removeEventListener('visibilitychange', handleVisibilityChange);
    };
  }, []);

  return { isActive, count };
};

export default useMediaQuery;
