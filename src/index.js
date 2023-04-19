import React from "react";
import { createRoot } from "react-dom/client";
import App from "./App";

const container = document.getElementById("root");
const root = createRoot(container);

root.render(<App />);

// Tóm lại, đoạn code này được sử dụng để khởi tạo ứng dụng React 
// và render một component vào một vị trí cụ thể trên trang web.
