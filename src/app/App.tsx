import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import FrontPage from "@/pages/FrontPage";
import AboutPage from "@/pages/AboutPage";
import WhitepaperPage from "@/pages/WhitepaperPage";
import { Toaster } from "sonner";

function Canonical({ href }: { href: string }) {
  return <link rel="canonical" href={href} />;
}

export default function App() {
  return (
    <BrowserRouter>
      <title>Juno — an AI that gets to know you, then finds your match</title>
      <meta
        name="description"
        content="Juno is an AI companion you talk to like a friend. It learns who you are through real conversation — then matches you with someone genuinely compatible."
      />
      <meta name="robots" content="index,follow" />
      <meta name="theme-color" content="#1a1625" />
      <link rel="icon" href="/favicon.ico" />
      <Canonical href="https://projectjuno.ai/" />

      <Routes>
        <Route path="/" element={<FrontPage />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/whitepaper" element={<WhitepaperPage />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>

      <Toaster richColors closeButton position="top-right" />
    </BrowserRouter>
  );
}
