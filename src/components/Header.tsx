// src/components/Header.tsx
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Sparkles } from "lucide-react";

export default function Header() {
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
          <span className="text-sm md:text-base tracking-tight">Juno</span>
        </Link>

        {/* Middle: nav */}
        <nav className="ml-6 hidden sm:block">
          <ul className="flex items-center gap-4 text-sm">
            <li>
              <Link to="/about" className="hover:underline">About</Link>
            </li>
            <li>
              <Link to="/whitepaper" className="hover:underline">Whitepaper</Link>
            </li>
          </ul>
        </nav>

        {/* Spacer */}
        <div className="flex-1" />

        {/* Right: Discord CTA */}
        <Button asChild size="sm">
          <a
            href="https://discord.gg/ZTNRCrVc6j"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Join the Juno Discord server"
          >
            Join Discord
          </a>
        </Button>
      </div>
    </header>
  );
}
