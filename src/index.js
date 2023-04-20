import React from "react";
import { createRoot } from "react-dom/client";
import { configureStore } from "@reduxjs/toolkit";
import { Provider } from "react-redux";
import allReducers from "./reducers";
import App from "./App";

const container = document.getElementById("root");
const root = createRoot(container);
const store = configureStore({
    reducer: allReducers,
});

root.render(
    <Provider store={store}>
        <App />
    </Provider>,
);


// Tóm lại, đoạn code này được sử dụng để khởi tạo ứng dụng React 
// và render một component vào một vị trí cụ thể trên trang web.
