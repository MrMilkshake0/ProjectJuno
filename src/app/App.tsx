import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider } from "@/contexts/AuthContext";
import FrontPage from "@/pages/FrontPage";
import QuestionnairePage from "@/pages/QuestionnairePage";
import AboutPage from "@/pages/AboutPage";

import { Toaster } from "sonner";

export default function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <Routes>
          <Route path="/" element={<FrontPage />} />
          <Route path="/questionnaire" element={<QuestionnairePage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>

        {/* 👇 Place Sonner Toaster here so it renders globally */}
        <Toaster richColors closeButton position="top-right" />
      </AuthProvider>
    </BrowserRouter>
  );
}
