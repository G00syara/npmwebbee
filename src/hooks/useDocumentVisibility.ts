import React, { useEffect, useState, useRef } from 'react';

type Callback = (isVisible: boolean) => void;

export const useDocumentVisibility = () => {
  const [visible, setVisible] = useState<boolean>(true);
  const [count, setCount] = useState<number>(0);
	const onVisibilityCallback = useRef<Callback[]>([]);

	const onVisibilityChange = (callback: Callback) => {
		onVisibilityCallback.current.push(callback);
	};

  useEffect(() => {
		const handleVisibilityChange = (): void => {
			setVisible(document.visibilityState === 'visible');
			if (document.hidden) {
        setCount((prevCount) => prevCount + 1);
			}
			onVisibilityCallback.current.forEach((callback) =>
				callback(document.visibilityState === 'visible')
			);
		};

		document.addEventListener('visibilitychange', handleVisibilityChange);

		return () => {
			document.removeEventListener( 'visibilitychange', handleVisibilityChange);
		};
	}, []);

  return { visible, count, onVisibilityChange };
};
