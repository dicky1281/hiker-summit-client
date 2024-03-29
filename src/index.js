import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css'
import { createRoot } from 'react-dom/client';
import { Provider } from 'react-redux';
import { persistor, store } from './app/store';
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import App from './App';
import { PersistGate } from 'redux-persist/integration/react';
import ScrollUp from './ScrollUp';

const container = document.getElementById('root');
const root = createRoot(container);

root.render(
 <PersistGate persistor={persistor}>
    <Provider store={store}>
      <BrowserRouter>
      <ScrollUp/>
      <Routes>
        <Route path='/*' element={<App/>}/>
      </Routes>
      </BrowserRouter>
    </Provider>
  </PersistGate>
  
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals

