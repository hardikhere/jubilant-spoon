import { BrowserRouter, Route, Routes } from "react-router-dom";
import App from "./App";

export default function AppRoutes() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />} />
      </Routes>
    </BrowserRouter>
  );
}
