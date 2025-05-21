//import React from 'react';
import { Provider } from 'react-redux'
import { createRoot } from 'react-dom/client'
import { store } from './store';
import App from './App.tsx'

const el = document.getElementById('root');
const root = createRoot(el);

root.render(
  <Provider store={store}>
    <App />
  </Provider>
);