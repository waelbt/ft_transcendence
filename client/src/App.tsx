import { createRoot } from "react-dom/client";

const App: React.FC = () => {
  return <>test</>;
};

const container = document.getElementById("root");
if (container) {
  const root = createRoot(container);
  root.render(<App />);
}
