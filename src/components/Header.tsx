// src/components/Header.tsx
import { Link } from "react-router-dom";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Sparkles } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";
import LoginPanel from "@/components/auth/LoginPanel";
import UserMenu from "@/components/auth/UserMenu";
import {
  Dialog,
  DialogContent,
  DialogHeader as DHeader,
  DialogTitle as DTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

export default function Header() {
  const { user, loading } = useAuth();
  const [open, setOpen] = useState(false);

  return (
    <header
      role="banner"
      className="
        sticky top-0 z-40 w-full
        border-b bg-background/80 backdrop-blur
        supports-[backdrop-filter]:bg-background/60
      "
    >
      <div className="mx-auto max-w-6xl px-6 md:px-10 h-14 flex items-center">
        {/* Left: Logo */}
        <Link
          to="/"
          className="flex items-center gap-2 font-semibold hover:opacity-90 transition-opacity"
          aria-label="Go to front page"
        >
          <span className="inline-flex h-6 w-6 items-center justify-center rounded-md border">
            <Sparkles className="h-3.5 w-3.5" />
          </span>
          <span className="text-sm md:text-base tracking-tight">Project Juno</span>
        </Link>

        {/* Middle: simple nav (optional) */}
        <nav className="ml-6 hidden sm:block">
          <ul className="flex items-center gap-4 text-sm">
            <li>
              <Link to="/questionnaire" className="hover:underline">Questionnaire</Link>
            </li>
            <li>
              <Link to="/about" className="hover:underline">About</Link>
            </li>
          </ul>
        </nav>

        {/* Spacer */}
        <div className="flex-1" />

        {/* Right: Auth actions */}
        <nav aria-label="Primary">
          <div className="flex items-center gap-2">
            {loading ? (
              // Loading skeleton (keeps layout stable)
              <Button variant="ghost" disabled className="opacity-60">
                Loading…
              </Button>
            ) : user ? (
              // Logged in -> show user dropdown
              <UserMenu />
            ) : (
              // Signed out -> open a dialog to sign in
              <Dialog open={open} onOpenChange={setOpen}>
                <DialogTrigger asChild>
                  <Button variant="default">Sign in</Button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-md">
                  <DHeader>
                    <DTitle>Welcome back</DTitle>
                  </DHeader>
                  <LoginPanel onSuccess={() => setOpen(false)} />
                </DialogContent>
              </Dialog>
            )}
          </div>
        </nav>
      </div>
    </header>
  );
}
