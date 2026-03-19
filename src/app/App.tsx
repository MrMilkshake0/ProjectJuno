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
      <title>Juno — An AI companion that finds your people</title>
      <meta
        name="description"
        content="Juno is an AI companion that gets to know you through real conversation — and uses that understanding to find people you'd genuinely click with."
      />
      <meta name="robots" content="index,follow" />
      <meta name="theme-color" content="#0b0b0f" />
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
