import React from 'react';
import { createRoot } from 'react-dom/client';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import store from 'store/store';
import './index.scss';
import App from './components/App/App';

const rootDiv = document.getElementById('root');
const rootNode = createRoot(rootDiv as Element);

rootNode.render(
  <React.StrictMode>
    <Provider store={store}>
      <BrowserRouter basename={process.env.PUBLIC_URL}>
        <App />
      </BrowserRouter>
    </Provider>
  </React.StrictMode>
);
