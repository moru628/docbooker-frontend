import React from 'react'
import ReactDOM from 'react-dom/client'
import { Provider } from 'react-redux'
import { RouterProvider } from 'react-router-dom'
import router from './router'
import './index.css'
import store from './store'

if (process.env.NODE_ENV !== 'production') {
    const originalWarn = console.warn;
    console.warn = (...args) => {
      if (/React Router Future Flag Warning/.test(args[0])) return;
      originalWarn(...args);
    };
  }

const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
  <Provider store={store}>
    <RouterProvider router={router} />
  </Provider>
);