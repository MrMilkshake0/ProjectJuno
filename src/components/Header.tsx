// src/components/Header.tsx
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

export default function Header() {
  return (
    <header
      role="banner"
      className="
        sticky top-0 z-40 w-full
        border-b border-border/30 bg-background/80 backdrop-blur-md
        supports-[backdrop-filter]:bg-background/60
      "
    >
      <div className="mx-auto max-w-3xl px-6 md:px-10 h-14 flex items-center">
        {/* Logo */}
        <Link
          to="/"
          className="font-semibold tracking-tight text-foreground/90 hover:text-foreground transition-colors"
          aria-label="Go to front page"
        >
          Juno
        </Link>

        {/* Nav */}
        <nav className="ml-8 hidden sm:block">
          <ul className="flex items-center gap-5 text-sm text-muted-foreground/70">
            <li>
              <Link
                to="/about"
                className="hover:text-foreground transition-colors"
              >
                About
              </Link>
            </li>
            <li>
              <Link
                to="/whitepaper"
                className="hover:text-foreground transition-colors"
              >
                Whitepaper
              </Link>
            </li>
          </ul>
        </nav>

        <div className="flex-1" />

        {/* CTA */}
        <Button
          asChild
          size="sm"
          className="rounded-lg bg-[#5865F2] hover:bg-[#4752c4] text-white text-xs group"
        >
          <a
            href="https://discord.gg/ZTNRCrVc6j"
            target="_blank"
            rel="noopener noreferrer"
          >
            Talk to Juno
            <ArrowRight className="ml-1.5 h-3 w-3 transition-transform group-hover:translate-x-0.5" />
          </a>
        </Button>
      </div>
    </header>
  );
}
