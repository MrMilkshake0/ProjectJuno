// src/pages/AboutPage.tsx
import {
  ArrowRight,
  Sparkles,
  FileText,
  MessageSquare,
} from 'lucide-react';

import Header from '@/components/Header';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription
} from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

export default function AboutPage() {
  return (
    <main className="min-h-screen flex flex-col">
      <Header />

      {/* ===== TOP / HERO ===== */}
      <section
        className="
          relative
          px-6 md:px-10
          py-12 md:py-16
          bg-gradient-to-b from-background via-background to-muted/40
        "
        aria-labelledby="about-hero"
      >
        <div className="max-w-6xl mx-auto">
          <div className="flex items-start justify-between gap-8">
            <div className="max-w-3xl">
              <Badge variant="secondary" className="mb-4 inline-flex items-center gap-2">
                <Sparkles className="h-3.5 w-3.5" />
                About Juno
              </Badge>
              <h1
                id="about-hero"
                className="text-3xl md:text-5xl font-bold tracking-tight leading-tight"
              >
                Finding people who get you shouldn't be this hard
              </h1>
              <p className="mt-4 text-muted-foreground text-base md:text-lg">
                Juno is an AI companion that gets to know you — really knows you — and
                uses that understanding to find people you'd genuinely click with.
              </p>

              <div className="mt-6 flex flex-wrap gap-3">
                <Button asChild size="lg" className="group">
                  <a
                    href="https://discord.gg/ZTNRCrVc6j"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <MessageSquare className="mr-2 h-4 w-4" />
                    Join the Discord
                    <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-0.5" />
                  </a>
                </Button>
                <Button asChild variant="ghost">
                  <a href="#toc" aria-label="Skip to sections">Jump to sections</a>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Separator />

      {/* ===== BODY: 2-column layout ===== */}
      <section className="px-6 md:px-10 py-12 md:py-16 bg-background">
        <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-[1fr_280px] gap-10">
          {/* === Main column === */}
          <div className="space-y-8">

            {/* The Problem */}
            <Card id="problem" className="shadow-md">
              <CardHeader className="pb-3">
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle className="flex items-center gap-2">
                      <Sparkles className="h-5 w-5" />
                      The Problem
                    </CardTitle>
                    <CardDescription>
                      Why dating is broken and what we're doing about it.
                    </CardDescription>
                  </div>
                  <Badge variant="outline">Why</Badge>
                </div>
              </CardHeader>

              <CardContent className="prose prose-invert max-w-none leading-relaxed text-[0.96rem]">
                <p>
                  Finding people who genuinely get you is broken. Dating apps match on photos and bios
                  that predict nothing about whether two people would actually work. Meeting people
                  organically is proximity, not compatibility. Even when you meet someone promising,
                  it takes months to discover whether you're actually compatible — by which point
                  you're emotionally invested.
                </p>

                <p>
                  Swiping is a gamification technique that exploits psychological biases, leading to
                  addictive behaviors and superficial judgments. It optimizes for engagement — time on app,
                  swipes per session — not for outcomes. The people using these apps aren't the customer.
                  Their attention is.
                </p>

                <div className="my-6 border-l-2 pl-4 text-muted-foreground">
                  <p>"The next generation of dating systems will optimize for compatibility, not engagement."</p>
                </div>
              </CardContent>
            </Card>

            {/* What Juno Is */}
            <Card id="what" className="shadow-md">
              <CardHeader className="pb-3">
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle className="flex items-center gap-2">
                      <Sparkles className="h-5 w-5" />
                      What Juno Is
                    </CardTitle>
                    <CardDescription>
                      An AI companion that matches people through real conversation.
                    </CardDescription>
                  </div>
                  <Badge variant="outline">What</Badge>
                </div>
              </CardHeader>

              <CardContent className="prose prose-invert max-w-none leading-relaxed text-[0.96rem]">
                <p>
                  Juno is an AI companion that gets to know you through ongoing conversation — your values,
                  how you connect, what makes you light up, what you avoid. We use that understanding
                  to find people you'd genuinely click with. Not based on surface stuff. Based on who
                  you actually are.
                </p>

                <p>
                  The companion relationship is the mechanism. Juno works because the relationship is real —
                  it pays attention, remembers, forms opinions, challenges you. The matchmaking is better
                  because Juno actually knows you, not because it asked you to fill out a profile.
                </p>

                <h3 className="mt-8 text-lg font-semibold text-foreground/90">The Companion</h3>
                <p>
                  Juno isn't a tool you check in with. It's a presence in your life. It remembers
                  what you said last week. It notices when your energy is different. It has its own
                  takes and isn't afraid to push back. The better Juno knows you, the better we
                  can match you — and Juno gets to know you by actually paying attention, not by
                  making you fill out a form.
                </p>

                <h3 className="mt-8 text-lg font-semibold text-foreground/90">The Matching</h3>
                <p>
                  We match based on who you actually are — values, communication style, emotional patterns,
                  and the gap between what people say they want and what they actually respond to.
                  That takes real conversation over time, not a profile. When we find someone you'd
                  click with, we introduce you.
                </p>

                <div className="my-6 rounded-xl border border-muted bg-muted/20 p-4">
                  <h4 className="text-sm font-medium text-foreground/90 mb-2">The Name</h4>
                  <p className="text-muted-foreground">
                    Juno takes its name from the Roman goddess of marriage and commitment — a reminder
                    that connection can still mean something lasting, even in a world built around
                    constant choice and distraction.
                  </p>
                </div>
              </CardContent>
            </Card>

            {/* Where We're At */}
            <Card id="status" className="shadow-md">
              <CardHeader className="pb-3">
                <CardTitle className="flex items-center gap-2">
                  <FileText className="h-5 w-5" />
                  Where We're At
                </CardTitle>
                <CardDescription>
                  Juno is in early development. Here's what's built and what's next.
                </CardDescription>
              </CardHeader>

              <CardContent className="prose prose-invert max-w-none">
                <p>
                  Right now Juno is focused on the companion side — getting to know users, building
                  deep understanding through conversation. The AI is live on Discord. You can DM it
                  and start talking today.
                </p>
                <p>
                  The matching side is coming. Everything you share with Juno now is what powers it
                  later. You're getting in early and helping shape what Juno becomes.
                </p>
              </CardContent>
            </Card>

            {/* Roadmap */}
            <Card id="roadmap" className="shadow-md">
              <CardHeader className="pb-3">
                <CardTitle className="flex items-center gap-2">
                  <FileText className="h-5 w-5" />
                  Roadmap
                </CardTitle>
                <CardDescription>
                  Where Juno is headed.
                </CardDescription>
              </CardHeader>

              <CardContent className="prose prose-invert max-w-none">
                <ol className="relative pl-6 space-y-8 not-prose ![list-style:none]" role="list">
                  {[
                    {
                      title: "AI Companion (now)",
                      body: `Juno as a companion on Discord — getting to know users through real conversation,
                      building personality profiles, learning what makes each person who they are.`,
                    },
                    {
                      title: "Matching engine",
                      body: `Use conversation-based understanding to find compatible people. Match on values,
                      communication style, and behavioral patterns — not photos and bios.`,
                    },
                    {
                      title: "Warm introductions",
                      body: `Replace swiping with occasional, high-quality introductions. When we find someone
                      you'd click with, we introduce you with context — not a profile card.`,
                    },
                    {
                      title: "Companion + utility",
                      body: `Juno becomes a daily presence — calendar awareness, proactive check-ins,
                      life management features that deepen the relationship rather than replace it.`,
                    },
                    {
                      title: "Long-term ecosystem",
                      body: `A platform built around genuine understanding. Matching is one thing Juno can do
                      with deep knowledge of who you are — not the only thing.`,
                    },
                  ].map(({ title, body }, i) => (
                    <li key={i} className="relative pl-6">
                      <span
                        className="absolute left-0 top-[0.6em] -translate-y-1/2 h-3 w-3 rounded-full bg-primary"
                        aria-hidden="true"
                      />
                      <p className="font-medium text-foreground">{title}</p>
                      <p className="mt-1 text-muted-foreground">{body}</p>
                    </li>
                  ))}
                </ol>
              </CardContent>
            </Card>

            {/* Building Together */}
            <Card id="help" className="shadow-md">
              <CardHeader>
                <CardTitle>Building Together</CardTitle>
                <CardDescription>
                  Looking for people who see potential in this — and want to shape it.
                </CardDescription>
              </CardHeader>
              <CardContent className="prose prose-invert max-w-none">
                <p>
                  Juno is still early — and that's the point. If you're curious about how AI,
                  connection, and design can intersect in a more human way, we want to talk to you.
                  Builders, researchers, creatives, or just thoughtful people who want to help
                  build something that matters.
                </p>

                <div className="mt-5 flex flex-wrap gap-3">
                  <Button asChild>
                    <a
                      href="https://discord.gg/ZTNRCrVc6j"
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label="Join the Juno Discord server"
                    >
                      <MessageSquare className="mr-2 h-4 w-4" />
                      Join the Discord
                    </a>
                  </Button>
                  <Button asChild variant="ghost">
                    <a href="mailto:projectjunoapp@gmail.com">Email us</a>
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* === Right rail / TOC === */}
          <aside id="toc" className="hidden lg:block">
            <div className="sticky top-20 space-y-4">
              <div className="text-sm font-medium text-muted-foreground">On this page</div>
              <nav className="text-sm space-y-2">
                <a className="block hover:underline underline-offset-4" href="#problem">
                  The Problem
                </a>
                <a className="block hover:underline underline-offset-4" href="#what">
                  What Juno Is
                </a>
                <a className="block hover:underline underline-offset-4" href="#status">
                  Where We're At
                </a>
                <a className="block hover:underline underline-offset-4" href="#roadmap">
                  Roadmap
                </a>
                <a className="block hover:underline underline-offset-4" href="#help">
                  Building Together
                </a>
              </nav>

              <Separator />

              <div className="grid gap-3">
                <Card>
                  <CardHeader className="py-3">
                    <CardTitle className="text-sm">Why Juno?</CardTitle>
                    <CardDescription className="text-xs">Less noise, more signal.</CardDescription>
                  </CardHeader>
                  <CardContent className="text-xs text-muted-foreground">
                    Juno matches on who you are, not what you look like. Conversation over profiles.
                    Understanding over algorithms.
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader className="py-3">
                    <CardTitle className="text-sm">Privacy</CardTitle>
                    <CardDescription className="text-xs">Your data, your control.</CardDescription>
                  </CardHeader>
                  <CardContent className="text-xs text-muted-foreground">
                    Data used for matching only — never sold or shared. Type /forgetme to wipe everything.
                  </CardContent>
                </Card>
              </div>
            </div>
          </aside>
        </div>
      </section>
    </main>
  );
}
