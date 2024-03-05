import React from 'react';
import {Provider} from 'react-redux';
import {store} from './src/redux/store';
import Todo from './src/components/Todo';

function App() {
  return (
    <Provider store={store}>
      <Todo />
    </Provider>
  );
}

export default App;
