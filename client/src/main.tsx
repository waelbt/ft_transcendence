import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.css";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
);

// import { createRoot } from "react-dom/client";

// const App: React.FC = () => {
//   return <>test</>;
// };

// const container = document.getElementById("root");
// if (container) {
//   const root = createRoot(container);
//   root.render(<App />);
// }
