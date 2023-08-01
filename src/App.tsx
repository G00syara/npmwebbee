import React from 'react';
import MainPage from './component/MainPage';
import MediaQuery from './component/MediaQuery';
import { Example } from './component/secondHook/componentTestUseMediaQuery';

const App = () => {
  return (
    <>
      <MainPage />

      <Example />
    </>
  );
};

export default App;
