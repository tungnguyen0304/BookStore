import React from "react";
import { createRoot } from "react-dom/client";
import { Provider } from "react-redux";
import { PersistGate } from 'redux-persist/integration/react'
import { persistStore } from 'redux-persist'  
import App from "./App";
import axios from 'axios';
import store from "./app/store";
// allow cookie to be written in CORS policy
axios.defaults.withCredentials = true;

const persistor = persistStore(store);

const container = document.getElementById("root");
const root = createRoot(container);

root.render(
  <Provider store={store}>
    <PersistGate persistor={persistor}>
      <App />
    </PersistGate>
  </Provider>
);
