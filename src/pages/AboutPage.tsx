// src/pages/AboutPage.tsx
import { ArrowRight, MessageSquare, Check, X, Minus } from "lucide-react";
import { Link } from "react-router-dom";

import Header from "@/components/Header";
import { Button } from "@/components/ui/button";

export default function AboutPage() {
  return (
    <main className="min-h-screen flex flex-col">
      <Header />

      {/* ===== HERO ===== */}
      <section className="px-6 md:px-10 pt-16 md:pt-24 pb-16">
        <div className="max-w-3xl mx-auto">
          <h1 className="text-2xl sm:text-3xl md:text-5xl font-bold tracking-tight leading-tight">
            An AI companion that matches you{" "}
            <br className="hidden sm:block" />
            with compatible people.
          </h1>
          <p className="mt-5 text-lg text-muted-foreground leading-relaxed max-w-2xl">
            Juno gets to know you through real conversation — your values, how
            you connect, what you actually need. Then it uses that understanding
            to find someone genuinely compatible. The matchmaking is the product.
            The companion relationship is what makes it work.
          </p>
        </div>
      </section>

      {/* ===== THE PROBLEM — with stats ===== */}
      <section className="px-6 md:px-10 py-16 md:py-24">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-2xl md:text-3xl font-bold tracking-tight">
            The problem
          </h2>
          <p className="mt-4 text-muted-foreground leading-relaxed max-w-2xl">
            Young people are the loneliest generation and the tools they have
            make it worse. Dating apps match without understanding. AI companions
            understand without connecting. Nobody is doing both.
          </p>

          {/* Stats grid */}
          <div className="mt-12 grid grid-cols-2 md:grid-cols-4 gap-8">
            {[
              { stat: "79%", desc: "of Gen Z burned out on dating apps", src: "Forbes Health, 2025" },
              { stat: "80%", desc: "of Gen Z felt lonely this year", src: "GWI, 2024" },
              { stat: "72%", desc: "of teens have used an AI companion", src: "Common Sense Media, 2025" },
              { stat: "93 min", desc: "daily AI companion usage", src: "Character.AI average" },
            ].map(({ stat, desc, src }) => (
              <div key={stat}>
                <div className="text-3xl md:text-4xl font-bold">{stat}</div>
                <p className="mt-1.5 text-sm text-muted-foreground">{desc}</p>
                <p className="mt-0.5 text-xs text-muted-foreground/40">{src}</p>
              </div>
            ))}
          </div>

          {/* Additional context */}
          <div className="mt-12 grid md:grid-cols-2 gap-6">
            <div className="rounded-xl border border-border/40 bg-card/30 p-5">
              <p className="text-sm font-medium mb-2">Dating apps are failing</p>
              <p className="text-sm text-muted-foreground leading-relaxed">
                Tinder lost 8% of paying subscribers. Bumble lost 16%. 1.4M UK
                users left dating apps in a single year. Swiping on photos
                predicts nothing about compatibility.
              </p>
            </div>
            <div className="rounded-xl border border-border/40 bg-card/30 p-5">
              <p className="text-sm font-medium mb-2">AI companions are a dead end</p>
              <p className="text-sm text-muted-foreground leading-relaxed">
                Character.AI users spend 93 min/day talking to AI. The AI learns
                everything about them and does nothing with it. Heavier use
                correlates with more loneliness, not less.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ===== THE GAP — comparison table ===== */}
      <section className="px-6 md:px-10 py-16 md:py-24">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-2xl md:text-3xl font-bold tracking-tight">
            Everyone is solving half the problem
          </h2>
          <p className="mt-4 text-muted-foreground leading-relaxed">
            Juno is the first product that builds a genuine AI relationship and
            uses it to match you with real people.
          </p>

          {/* Comparison table */}
          <div className="mt-10 overflow-x-auto">
            <table className="w-full min-w-[480px] text-sm border-collapse">
              <thead>
                <tr className="border-b border-border/40">
                  <th className="text-left py-3 pr-4 font-medium text-muted-foreground/60 w-[35%]" />
                  <th className="py-3 px-3 font-medium text-muted-foreground/60 text-center">Dating Apps</th>
                  <th className="py-3 px-3 font-medium text-muted-foreground/60 text-center">AI Companions</th>
                  <th className="py-3 px-3 font-medium text-center text-[#5865F2]">Juno</th>
                </tr>
              </thead>
              <tbody>
                {[
                  { label: "Understands you deeply", dating: false, ai: true, juno: true },
                  { label: "Ongoing relationship", dating: false, ai: true, juno: true },
                  { label: "Connects to real people", dating: true, ai: false, juno: true },
                  { label: "Predicts real compatibility", dating: false, ai: false, juno: true },
                  { label: "Learns over time", dating: false as const, ai: "partial" as const, juno: true as const },
                ].map(({ label, dating, ai, juno }) => (
                  <tr key={label} className="border-b border-border/20">
                    <td className="py-3 pr-4 text-muted-foreground">{label}</td>
                    <td className="py-3 px-3 text-center">
                      <CellIcon value={dating} />
                    </td>
                    <td className="py-3 px-3 text-center">
                      <CellIcon value={ai} />
                    </td>
                    <td className="py-3 px-3 text-center">
                      <CellIcon value={juno} accent />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* ===== HOW IT WORKS — user journey ===== */}
      <section className="px-6 md:px-10 py-16 md:py-24">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-2xl md:text-3xl font-bold tracking-tight">
            How a user experiences Juno
          </h2>

          <div className="mt-10 space-y-0">
            {[
              {
                time: "Week 1",
                title: "Onboarding",
                desc: "DM Juno on Discord. Quick transparent setup — name, age, orientation. Then Juno transitions into real conversation. By the end: at least one moment of \"huh, that's actually true about me\" and an open loop to come back.",
              },
              {
                time: "Weeks 1–4",
                title: "Getting to know you",
                desc: "Juno messages with callbacks to past conversations, theories about who you are, its own opinions. Each conversation builds on the last. Mapping values, emotions, communication style, and how you connect with people.",
              },
              {
                time: "Month 1+",
                title: "Companion + profiling",
                desc: "Depth progression — same topics revisited deeper over time. Proactive outreach adapts to your rhythm. The matchmaking thread weaves in naturally.",
              },
              {
                time: "The match",
                title: "Introduction",
                desc: "Personality data extracted into vector embeddings. A matching engine finds genuinely compatible pairs. Juno delivers it through conversation — \"I think I found someone for you. Here's why.\"",
                accent: true,
              },
            ].map(({ time, title, desc, accent }, i) => (
              <div key={time} className="flex gap-5 md:gap-8">
                {/* Timeline */}
                <div className="flex flex-col items-center shrink-0 w-16 md:w-20">
                  <div
                    className={`w-3 h-3 rounded-full shrink-0 ${
                      accent ? "bg-[#5865F2]" : "bg-muted-foreground/30"
                    }`}
                  />
                  {i < 3 && (
                    <div className="w-px flex-1 bg-border/40 my-1" />
                  )}
                </div>

                {/* Content */}
                <div className="pb-10">
                  <p className="text-xs font-medium text-muted-foreground/50 mb-1">
                    {time}
                  </p>
                  <h3 className="font-semibold">{title}</h3>
                  <p className="mt-2 text-sm text-muted-foreground leading-relaxed">
                    {desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== WHAT JUNO LEARNS ===== */}
      <section className="px-6 md:px-10 py-16 md:py-24">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-2xl md:text-3xl font-bold tracking-tight">
            What conversation captures that profiles can't
          </h2>

          <div className="mt-10 grid sm:grid-cols-2 gap-4">
            {[
              { signal: "Communication style", what: "How someone expresses themselves — message length, humor, directness, emotional expression." },
              { signal: "Values in action", what: "Not what someone claims to value, but what they consistently engage with, defend, or return to." },
              { signal: "Emotional patterns", what: "How someone processes difficulty, vulnerability, excitement. Their emotional fluency." },
              { signal: "Reaction to challenge", what: "How they respond when pushed back on — engage, deflect, shut down. Predicts conflict style." },
              { signal: "The Need Gap", what: "The difference between stated preferences and observed behavior. What they respond to vs. what they say they want." },
              { signal: "Attachment signals", what: "How quickly they trust, how they handle silence, whether they initiate or wait." },
            ].map(({ signal, what }) => (
              <div
                key={signal}
                className="rounded-xl border border-border/40 bg-card/30 p-5"
              >
                <p className="text-sm font-medium mb-1.5">{signal}</p>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  {what}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== MARKET ===== */}
      <section className="px-6 md:px-10 py-16 md:py-24">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-2xl md:text-3xl font-bold tracking-tight">
            Three markets converging
          </h2>
          <p className="mt-4 text-muted-foreground leading-relaxed">
            Juno sits at the intersection of three massive markets — and nobody
            else occupies it.
          </p>

          <div className="mt-10 grid md:grid-cols-3 gap-4">
            {[
              {
                market: "AI Companions",
                size: "$37B",
                growth: "31% CAGR",
                projected: "$552B by 2035",
                source: "Precedence Research",
              },
              {
                market: "Dating Services",
                size: "$11B",
                growth: "8–12% CAGR",
                projected: "$19B by 2033",
                source: "Straits Research",
              },
              {
                market: "Matchmaking",
                size: "$4.7B",
                growth: "7.8% CAGR",
                projected: "$10B by 2035",
                source: "Wise Guy Reports",
              },
            ].map(({ market, size, growth, projected, source }) => (
              <div
                key={market}
                className="rounded-xl border border-border/40 bg-card/30 p-5"
              >
                <p className="text-xs font-medium text-muted-foreground/50 mb-2">
                  {market}
                </p>
                <p className="text-2xl font-bold">{size}</p>
                <p className="text-sm text-muted-foreground mt-1">{growth}</p>
                <div className="mt-3 pt-3 border-t border-border/30">
                  <p className="text-xs text-muted-foreground/60">
                    {projected}
                  </p>
                  <p className="text-xs text-muted-foreground/40">{source}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== ROADMAP ===== */}
      <section className="px-6 md:px-10 py-16 md:py-24">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-2xl md:text-3xl font-bold tracking-tight">
            Roadmap
          </h2>

          <div className="mt-8 grid md:grid-cols-3 gap-4">
            {[
              {
                phase: "Now",
                title: "AI Companion",
                items: [
                  "Live on Discord",
                  "Conversation engine + memory",
                  "Personality profiling",
                  "Onboarding first testers",
                ],
                active: true,
              },
              {
                phase: "Next",
                title: "Matching Engine",
                items: [
                  "Profile extraction → embeddings",
                  "Compatibility scoring",
                  "First real matches",
                  "Post-match feedback loops",
                ],
              },
              {
                phase: "Then",
                title: "Scale",
                items: [
                  "Multi-instance deployment",
                  "Paid tier ($10–15/mo)",
                  "Platform expansion",
                  "Assistant capabilities",
                ],
              },
            ].map(({ phase, title, items, active }) => (
              <div
                key={phase}
                className={`rounded-xl border p-5 ${
                  active
                    ? "border-[#5865F2]/30 bg-[#5865F2]/[0.04]"
                    : "border-border/40 bg-card/30"
                }`}
              >
                <p
                  className={`text-xs font-medium mb-2 ${
                    active ? "text-[#5865F2]" : "text-muted-foreground/50"
                  }`}
                >
                  {phase}
                </p>
                <p className="font-semibold mb-3">{title}</p>
                <ul className="space-y-1.5">
                  {items.map((item) => (
                    <li
                      key={item}
                      className="text-sm text-muted-foreground flex gap-2"
                    >
                      <span className="text-muted-foreground/30 shrink-0">–</span>
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== FOUNDER ===== */}
      <section className="px-6 md:px-10 py-16 md:py-24">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-2xl md:text-3xl font-bold tracking-tight">
            Who's building this
          </h2>
          <div className="mt-6 space-y-4 text-muted-foreground leading-relaxed max-w-2xl">
            <p>
              I'm Abishek. 23, dual US-Australian citizen, Data Science
              background. I built Juno solo — conversation engine, personality
              profiling, memory system, adaptive outreach — and it's running
              live on Discord today.
            </p>
            <p>
              I've been building AI compatibility matching prototypes since
              2023 — vector engines, psychometric embeddings, personality
              inference models. In 2026 I brought it all together into Juno.
            </p>
          </div>
        </div>
      </section>

      {/* ===== CTA ===== */}
      <section className="px-6 md:px-10 py-16 md:py-24">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-2xl md:text-3xl font-bold tracking-tight">
            Get involved
          </h2>
          <p className="mt-4 text-muted-foreground leading-relaxed mb-8">
            Juno is early and that's the point. Talk to the bot, read the
            whitepaper, or reach out directly.
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
            <Button asChild variant="outline" className="rounded-xl">
              <Link to="/whitepaper">Read the whitepaper</Link>
            </Button>
            <Button asChild variant="ghost" className="rounded-xl">
              <a href="mailto:projectjunoapp@gmail.com">Email me</a>
            </Button>
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

/* ── Helper for comparison table ── */
function CellIcon({
  value,
  accent,
}: {
  value: boolean | "partial";
  accent?: boolean;
}) {
  if (value === true) {
    return (
      <Check
        className={`w-4 h-4 mx-auto ${
          accent ? "text-[#5865F2]" : "text-green-400/70"
        }`}
      />
    );
  }
  if (value === "partial") {
    return <Minus className="w-4 h-4 mx-auto text-muted-foreground/40" />;
  }
  return <X className="w-4 h-4 mx-auto text-muted-foreground/20" />;
}
