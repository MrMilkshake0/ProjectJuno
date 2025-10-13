import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider } from "@/contexts/AuthContext";
import FrontPage from "@/pages/FrontPage";
import QuestionnairePage from "@/pages/QuestionnairePage";
import AboutPage from "@/pages/AboutPage";
import { Toaster } from "sonner";

// ✅ Optional helpers for meta reuse
function Canonical({ href }: { href: string }) {
  return <link rel="canonical" href={href} />;
}

export default function App() {
  return (
    <BrowserRouter>
      {/* Global head elements */}
      <title>Project Juno</title>
      <meta
        name="description"
        content="A gen-2 matchmaking experience focused on compatibility, not swipes."
      />
      <meta name="robots" content="index,follow" />
      <meta name="theme-color" content="#0b0b0f" />
      <link rel="icon" href="/favicon.ico" />
      <Canonical href="https://projectjuno.ai/" />

      <AuthProvider>
        <Routes>
          <Route path="/" element={<FrontPage />} />
          <Route path="/questionnaire" element={<QuestionnairePage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>

        {/* Global toast notifications */}
        <Toaster richColors closeButton position="top-right" />
      </AuthProvider>
    </BrowserRouter>
  );
}
