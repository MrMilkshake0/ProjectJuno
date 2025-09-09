// src/App.tsx
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import FrontPage from '@/pages/FrontPage';
import QuestionnairePage from '@/pages/QuestionnairePage';

/**
 * App-level router:
 * - "/" renders the startup-style landing page (FrontPage).
 * - "/questionnaire" renders your existing QuestionnairePage.
 * - Wildcards redirect home.
 */
export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<FrontPage />} />
        <Route path="/questionnaire" element={<QuestionnairePage />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  );
}
