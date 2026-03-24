// src/pages/AboutPage.tsx
import { ArrowRight, MessageSquare } from "lucide-react";
import { Link } from "react-router-dom";

import Header from "@/components/Header";
import { Button } from "@/components/ui/button";

export default function AboutPage() {
  return (
    <main className="min-h-screen flex flex-col">
      <Header />

      {/* ===== HERO ===== */}
      <section className="px-6 md:px-10 pt-16 md:pt-24 pb-12">
        <div className="max-w-2xl mx-auto">
          <h1 className="text-3xl md:text-5xl font-bold tracking-tight leading-tight">
            About Juno
          </h1>
          <p className="mt-4 text-lg text-muted-foreground leading-relaxed">
            Juno is an AI companion that uses what it learns about you to match
            you with compatible people. The matchmaking is the product. The
            companion relationship is what makes it work.
          </p>
        </div>
      </section>

      {/* ===== BODY — long-form, honest, reads like a person wrote it ===== */}
      <section className="px-6 md:px-10 pb-20">
        <div className="max-w-2xl mx-auto space-y-14">

          {/* The Problem */}
          <div className="space-y-4 text-muted-foreground leading-relaxed">
            <h2 className="text-xl font-semibold text-foreground">
              The problem
            </h2>
            <p>
              Finding someone compatible is genuinely broken. Dating apps match
              on photos and bios — signals that predict almost nothing about
              whether two people would actually work. Swiping is a gamification
              technique that optimizes for time-on-app, not for outcomes. The
              people using these apps aren't the customer. Their attention is.
            </p>
            <p>
              Meanwhile, AI companions have proven that young people will talk to
              AI for hours. Character.AI users average 93 minutes a day. The AI
              learns your interests, values, humor, fears, relationship
              patterns — and does nothing with it. The conversation is a dead
              end. Research shows heavier use actually correlates with more
              loneliness, not less.
            </p>
            <p className="text-foreground font-medium">
              Dating apps match people without understanding them. AI companions
              understand people without connecting them. Nobody is doing both.
            </p>
          </div>

          {/* What Juno Is */}
          <div className="space-y-4 text-muted-foreground leading-relaxed">
            <h2 className="text-xl font-semibold text-foreground">
              What Juno is
            </h2>
            <p>
              Juno is an AI companion — like Character.AI or Replika — but with
              a purpose. Every conversation isn't just engagement. It's building
              a real understanding of who you are, so Juno can find people
              you'd actually be compatible with.
            </p>
            <p>
              You talk to Juno like a friend. It remembers what you said last
              week, forms theories about you, challenges you, has its own
              opinions. It feels like texting someone who's genuinely paying
              attention — not filling out a form or answering survey questions.
            </p>
            <p>
              Behind every conversation, Juno is mapping your values,
              communication style, emotional patterns, and what we call the
              "Need Gap" — the difference between what you say you want and what
              you actually respond to. Someone says they want "easygoing" but
              comes alive when intellectually challenged. Someone says they
              don't need attention but lights up when Juno remembers something
              small. These gaps are only visible through real conversation — and
              they're the signals that actually predict compatibility.
            </p>
            <p>
              When Juno understands two people well enough, it introduces them.
              Not as a system recommendation. Like a friend saying "I think I
              found someone for you. Here's why I think you'd work."
            </p>
          </div>

          {/* Why Conversation */}
          <div className="space-y-4 text-muted-foreground leading-relaxed">
            <h2 className="text-xl font-semibold text-foreground">
              Why conversation, not profiles
            </h2>
            <p>
              Static profiles capture a curated, aspirational version of someone
              at a single moment. Conversation captures what actually matters:
              how someone communicates in real time, what makes them light up
              vs. shut down, how they handle disagreement, their humor, their
              emotional patterns.
            </p>
            <p>
              This is what premium human matchmakers do — get to know you
              deeply over time, then find your match. They charge $5,000+ a
              month because the model works. People will pay significantly more
              for someone who actually understands them. Juno does what a
              premium matchmaker does — through AI, at scale, for a generation
              that can't afford those fees.
            </p>
          </div>

          {/* The Name */}
          <div className="rounded-2xl border border-border/40 bg-card/30 p-6">
            <h3 className="text-sm font-medium text-foreground mb-2">
              The name
            </h3>
            <p className="text-sm text-muted-foreground leading-relaxed">
              Juno takes its name from the Roman goddess of marriage and
              commitment — a reminder that connection can still mean something
              lasting, even in a world built around constant choice and
              distraction.
            </p>
          </div>

          {/* Where We're At */}
          <div className="space-y-4 text-muted-foreground leading-relaxed">
            <h2 className="text-xl font-semibold text-foreground">
              Where we're at
            </h2>
            <p>
              Juno is live on Discord today. The companion side is working — you
              can DM it and start talking. It gets to know you, remembers across
              sessions, builds understanding over time.
            </p>
            <p>
              The matching engine is next. Profile extraction, vector
              embeddings, compatibility scoring. Everything you share with Juno
              now is what powers your matches later.
            </p>

            <div className="mt-6 space-y-4">
              {[
                {
                  phase: "Now",
                  desc: "AI companion live on Discord. Conversation quality, onboarding, personality profiling, early testers.",
                },
                {
                  phase: "Next",
                  desc: "Matching engine. Profile extraction, vector embeddings, compatibility scoring, first real matches.",
                },
                {
                  phase: "Then",
                  desc: "Scale. Multi-instance deployment, production user base, platform expansion.",
                },
              ].map(({ phase, desc }) => (
                <div key={phase} className="flex gap-4">
                  <span className="shrink-0 text-xs font-medium text-muted-foreground/40 w-10 pt-0.5">
                    {phase}
                  </span>
                  <p className="text-sm">{desc}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Founder */}
          <div className="space-y-4 text-muted-foreground leading-relaxed">
            <h2 className="text-xl font-semibold text-foreground">
              Who's building this
            </h2>
            <p>
              I'm Abishek. I'm 23. I built Juno solo — the conversation engine,
              personality profiling, memory system, adaptive outreach, all of
              it. It's running live on Discord right now.
            </p>
            <p>
              I grew up between three cultures — born in the US to Indian
              parents, raised in Australia. I moved schools constantly and
              watched how people find their people in unfamiliar environments.
              My closest friends are almost all second-generation immigrants. We
              found each other without knowing why — drawn together by shared
              experiences we couldn't have put on a profile.
            </p>
            <p>
              That's the insight behind Juno. Compatibility isn't about what you
              list on a bio. It's about patterns you don't even know you have,
              and it takes real conversation to surface them. I've been building
              AI compatibility matching prototypes since 2023 — vector
              engines, psychometric embeddings, personality inference models.
              In 2026 I brought it all together into Juno.
            </p>
            <p>
              I'm building this for my generation because I'm living in it. I
              see how AI has changed the way young people communicate and
              connect — and I see the gap between where AI companions are and
              where they could go.
            </p>
          </div>

          {/* CTA */}
          <div className="pt-4">
            <h2 className="text-xl font-semibold text-foreground mb-4">
              Come shape this
            </h2>
            <p className="text-muted-foreground leading-relaxed mb-6">
              Juno is early. You're not signing up for a finished product —
              you're joining something that's still being built. If that's
              interesting to you, come talk.
            </p>
            <div className="flex flex-wrap gap-3">
              <Button
                asChild
                className="rounded-xl bg-[#5865F2] hover:bg-[#4752c4] text-white group"
              >
                <a
                  href="https://discord.gg/ZTNRCrVc6j"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <MessageSquare className="mr-2 h-4 w-4" />
                  Talk to Juno
                  <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-0.5" />
                </a>
              </Button>
              <Button asChild variant="ghost">
                <a href="mailto:projectjunoapp@gmail.com">Email me</a>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* ===== FOOTER ===== */}
      <footer className="py-8 px-6 md:px-10 border-t border-border/30">
        <div className="max-w-3xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4 text-sm text-muted-foreground/60">
          <p>&copy; {new Date().getFullYear()} Juno</p>
          <div className="flex gap-6">
            <Link
              to="/"
              className="hover:text-muted-foreground transition-colors"
            >
              Home
            </Link>
            <Link
              to="/whitepaper"
              className="hover:text-muted-foreground transition-colors"
            >
              Whitepaper
            </Link>
            <a
              href="mailto:projectjunoapp@gmail.com"
              className="hover:text-muted-foreground transition-colors"
            >
              Contact
            </a>
          </div>
        </div>
      </footer>
    </main>
  );
}
