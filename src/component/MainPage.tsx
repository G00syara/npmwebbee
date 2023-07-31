import React from 'react';
import useDocumentVisibility from '../hooks/useDocumentVisibility';
import MediaQuery from './MediaQuery';

const MainPage: React.FC = () => {
  const { isActive, count } = useDocumentVisibility();

  return (
    <div>
      <p>Tab is {isActive ? 'active' : 'inactive'}</p>
      <p>Tab has been inactive {count} times since component initialization.</p>
    </div>
  );
};

export default MainPage;
