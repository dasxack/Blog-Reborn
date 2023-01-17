import { createRoot } from 'react-dom/client';
import React from 'react';
import App from './components/App';
import store from './store/store';
import { BrowserRouter as Router } from 'react-router-dom';
import { Provider } from 'react-redux';
const container = document.getElementById('root');
const root = createRoot(container);
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <Router>
        <App />
      </Router>
    </Provider>
  </React.StrictMode>
);
