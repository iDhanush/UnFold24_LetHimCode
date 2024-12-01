import { createRoot } from "react-dom/client";
import App from "./App.jsx";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import { Toaster } from "react-hot-toast";
import ChatPage from "./pages/Chat/ChatPage.jsx";
import Nav from "./components/Nav/Nav.jsx";

createRoot(document.getElementById("root")).render(
  <BrowserRouter>
    <Nav/>
    <Toaster />
    <Routes>
      <Route path="/" element={<App />} />
      <Route path="/chat" element={<ChatPage />} />
    </Routes>
  </BrowserRouter>
);
