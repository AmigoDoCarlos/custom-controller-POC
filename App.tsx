import React from 'react';
import GlobalProvider from './src/contexts/GlobalContext';
import Controller from './src/pages/EditController';
// import ChooseController from './src/pages/ChooseController';

function App(): JSX.Element {
  return (
      <GlobalProvider>
          <Controller />
          {/* <ChooseController /> */}
      </GlobalProvider>
  );
}

export default App;
