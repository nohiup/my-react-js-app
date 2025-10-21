
import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { Provider } from 'react-redux';
import { store } from './store/configureStore';
import { BrowserRouter } from 'react-router-dom';
import AppRoutes from './routes/AppRoutes';

const rootElement = document.getElementById('root');
if (!rootElement) {
  throw new Error("Could not find root element to mount to");
}

const root = ReactDOM.createRoot(rootElement);
root.render(
  <Provider store={store}>
    <BrowserRouter>
      <React.StrictMode>
        <AppRoutes>
        </AppRoutes>
      </React.StrictMode>
    </BrowserRouter>
  </Provider>
);
