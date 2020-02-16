import React from 'react';
import ReactDOM from 'react-dom';

import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { store, persistor } from './store';

import RouterWrap from './Root';

const Root = () => (
  <Provider store={store}>
    <PersistGate loading={null} persistor={persistor}>
      <RouterWrap />
    </PersistGate>
  </Provider>
);

ReactDOM.render(<Root />, document.getElementById('root'));
