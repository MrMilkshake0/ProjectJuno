// src/pages/AboutPage.tsx
import { Link } from 'react-router-dom';
import {
  ArrowRight,
  Info,
  Sparkles,
  ScrollText,
  FileText,
  MessageSquare
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
                About Project Juno
              </Badge>
              <h1
                id="about-hero"
                className="text-3xl md:text-5xl font-bold tracking-tight leading-tight"
              >
                Thoughtful matching, human-checked.
              </h1>
              <p className="mt-4 text-muted-foreground text-base md:text-lg">
                We’re building a <em>gen-2</em> dating experience: Using data for something that is
                actually valuable to you and your life.
              </p>

              <div className="mt-6 flex flex-wrap gap-3">
                <Button asChild size="lg" className="group">
                  <Link to="/questionnaire" aria-label="Start the questionnaire">
                    Start the questionnaire
                    <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-0.5" />
                  </Link>
                </Button>
                <Button asChild variant="ghost">
                  <a href="#toc" aria-label="Skip to sections">Jump to sections</a>
                </Button>
              </div>

              {/* Small trust bar to mirror FrontPage */}
              <div className="mt-6 flex flex-wrap gap-4 text-sm text-muted-foreground">
                <span className="inline-flex items-center gap-2">
                  <ScrollText className="h-4 w-4" /> Private by default
                </span>
                <span className="inline-flex items-center gap-2">
                  <Info className="h-4 w-4" /> Human-in-the-loop
                </span>
                <span className="inline-flex items-center gap-2">
                  <Sparkles className="h-4 w-4" /> Built with shadcn
                </span>
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

            {/* About Project Juno (expanded) */}
            <Card id="about-juno" className="shadow-md">
              <CardHeader className="pb-3">
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle className="flex items-center gap-2">
                      <Sparkles className="h-5 w-5" />
                      About Project Juno
                    </CardTitle>
                    <CardDescription>
                      The story, inspiration, and direction behind Juno.
                    </CardDescription>
                  </div>
                  <Badge variant="outline">Overview</Badge>
                </div>
              </CardHeader>

              <CardContent className="prose prose-invert max-w-none leading-relaxed text-[0.96rem]">
                {/* 1️⃣ Opening blockquote for theme */}
                <blockquote className="border-l-4 pl-4 italic text-muted-foreground">
                  “The next generation of dating systems will optimize for compatibility, not engagement.”
                </blockquote>

                {/* 2️⃣ Add small heading between idea shifts */}
                <h3 className="mt-8 text-lg font-semibold text-foreground/90">The Name and the Idea</h3>
                <p>
                  <em>Project Juno</em> takes its name from Juno, the Roman goddess of marriage and commitment — 
                  a reminder that connection can still mean something lasting, even in a world built around 
                  constant choice and distraction.
                </p>

                <p>
                  The project began as a question: what would a dating system look like if it cared more
                  about compatibility than engagement? If it tried to understand people — their values,
                  habits, communication styles and the thousands of data points that make them unique — instead of reducing them to swipes and photos?
                </p>

                {/* 3️⃣ Highlight inspiration with subtle box */}
                <div className="my-6 rounded-xl border border-muted bg-muted/20 p-4">
                  <h4 className="text-sm font-medium text-foreground/90 mb-2">Inspiration</h4>
                  <p className="text-muted-foreground">
                    It was partly inspired by{" "}
                    <a
                      href="https://youtubeatlas.com/"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="underline underline-offset-4"
                    >
                      YouTube Atlas
                    </a>
                    , a visualization that showed how people naturally group together based on what they engage
                    with online. Seeing that pattern sparked an idea: if simple data can reveal shared interests,
                    maybe the right kind of data could reveal compatibility too — not as a replacement for human
                    intuition, but as a tool to support it.
                  </p>
                </div>

                {/* 4️⃣ Break long paragraphs with visual separators */}
                <Separator className="my-8 opacity-40" />

                <h3 className="text-lg font-semibold text-foreground/90">The Philosophy</h3>
                <p>
                  <em>Project Juno</em> isn’t about building another app for attention.
                  It’s about exploring how technology could help people find alignment more thoughtfully — 
                  to use data in a way that supports human judgment, rather than trying to replace it.
                </p>

                <div className="my-6 border-l-2 pl-4 text-muted-foreground">
                  <p>
                    “You can’t guarantee chemistry, but you can improve the odds of it happening.”
                  </p>
                </div>

                <h3 className="text-lg font-semibold text-foreground/90 mt-10">The Vision Ahead</h3>
                <p>
                  It’s still early — more of a framework and set of experiments than a product.
                  But the vision is larger: to eventually grow Juno into a complete product ecosystem
                  built around meaningful connection — a platform that values understanding over noise,
                  and long-term outcomes over quick interactions.
                </p>
              </CardContent>
            </Card>



            {/* The Future of Project Juno (Vision / Pillars) */}
            <Card id="future" className="shadow-md">
              <CardHeader className="pb-3">
                <CardTitle className="flex items-center gap-2">
                  <FileText className="h-5 w-5" />
                  The Future of Project Juno
                </CardTitle>
                <CardDescription>
                  Where I want to take it — in simple, concrete terms.
                </CardDescription>
              </CardHeader>

              <CardContent className="prose prose-invert max-w-none">
                <p>
                  <strong>From forms to dialogue.</strong> Replace the questionnaire with a
                  conversation-led system that learns naturally over time. Think reflective chats
                  that can ask better follow-ups, notice consistency, and build a truer picture of a
                  person than checkboxes ever could.
                </p>

                <p>
                  <strong>Many small signals, learned weights.</strong> Model compatibility from
                  thousands of weak correlations — habits, preferences, rhythms, constraints — and
                  let the system learn the <em>weights</em> that matter. Not to score people, but to
                  map a space of likely fit with room for serendipity.
                </p>

                <p>
                  <strong>Plain-language “why”.</strong> When a suggestion is made, explain it
                  simply: the 2–3 reasons the system thinks you might click. No mystique, no
                  buzzwords — just enough context to decide if saying hello makes sense.
                </p>

                <p>
                  <strong>Outcome-aware iteration.</strong> Use opt-in feedback (what led to a good
                  date, what didn’t) to quietly adjust those weights over time. Keep experiments
                  small — early, local cohorts — and publish what’s learned so others can poke holes
                  in it.
                </p>

                <p>
                  <strong>Build an ecosystem, not just a feature.</strong> Over time, stitch these
                  pieces into something that feels alive: a system that understands people better the
                  longer it walks with them — and uses that understanding to make fewer, better
                  introductions.
                </p>
              </CardContent>
            </Card>

            {/* Roadmap (tactical next steps) */}
            <Card id="roadmap" className="shadow-md">
              <CardHeader className="pb-3">
                <CardTitle className="flex items-center gap-2">
                  <FileText className="h-5 w-5" />
                  The Roadmap
                </CardTitle>
                <CardDescription>
                  The near-term milestones and long-term direction for Project Juno.
                </CardDescription>
              </CardHeader>

              <CardContent className="prose prose-invert max-w-none">
                <ol className="relative border-l pl-6 space-y-6">
                  <li>
                    <div className="absolute -left-[9px] top-0 h-4 w-4 rounded-full bg-primary" />
                    <p className="font-medium text-foreground">Near term — v0.x foundations</p>
                    <p className="mt-1">
                      Use the questionnaire as a first step to gather signal, learn from early users, and test
                      which factors actually correlate with meaningful compatibility. Keep everything
                      private-by-default and clearly explain how data is used.
                    </p>
                  </li>

                  <li>
                    <div className="absolute -left-[9px] h-4 w-4 rounded-full bg-primary mt-7" />
                    <p className="font-medium text-foreground">Conversation-led understanding</p>
                    <p className="mt-1">
                      Transition from static questions to a dynamic, conversation-based system that learns about
                      each person naturally over time — more reflective and human, less transactional.
                    </p>
                  </li>

                  <li>
                    <div className="absolute -left-[9px] h-4 w-4 rounded-full bg-primary mt-7" />
                    <p className="font-medium text-foreground">Explainable matching engine</p>
                    <p className="mt-1">
                      Build a transparent matching layer that combines signals to generate suggestions, and
                      communicates <em>why</em> each introduction makes sense — always keeping a light human
                      review step before connections are made.
                    </p>
                  </li>

                  <li>
                    <div className="absolute -left-[9px] h-4 w-4 rounded-full bg-primary mt-7" />
                    <p className="font-medium text-foreground">Warm introductions over swiping</p>
                    <p className="mt-1">
                      Replace infinite feeds and swipes with occasional, high-quality introductions. Emphasize
                      comfort and clarity over novelty and speed — reducing noise and decision fatigue.
                    </p>
                  </li>

                  <li>
                    <div className="absolute -left-[9px] h-4 w-4 rounded-full bg-primary mt-7" />
                    <p className="font-medium text-foreground">Beyond v1 — a supportive ecosystem</p>
                    <p className="mt-1">
                      Expand Juno into a platform that helps couples thrive long after they meet — with
                      lightweight shared planning tools, reflection prompts, and feedback loops that promote
                      growth and long-term stability.
                    </p>
                  </li>
                </ol>
              </CardContent>
            </Card>

            {/* Building Together (Discord CTA) */}
            <Card id="help" className="shadow-md">
              <CardHeader>
                <CardTitle>Building Together</CardTitle>
                <CardDescription>
                  Looking for people who see potential in this idea — and want to shape it.
                </CardDescription>
              </CardHeader>
              <CardContent className="prose prose-invert max-w-none">
                <p>
                  <em>Project Juno</em> is still an idea taking shape — a framework, a set of questions,
                  and a direction. It’s too big to explore alone, which is why I’m sharing it early.
                </p>
                <p>
                  I’m looking for people who are curious about how connection, data, and design can
                  intersect in a more human way — builders, researchers, creatives, or simply
                  thoughtful people who want to talk about what a better system might look like.
                </p>
                <p>
                  If this resonates, I’d love to connect — to trade ideas, share feedback, and
                  explore what bringing something like Juno to life could mean.
                </p>

                <div className="mt-5 flex flex-wrap gap-3">
                  <Button asChild>
                    <a
                      href="https://discord.gg/YOUR_INVITE_CODE"
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label="Join the Project Juno Discord server"
                    >
                      <MessageSquare className="mr-2 h-4 w-4" />
                      Join the Discord
                    </a>
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* CTA row */}
            <div className="pt-2 flex flex-wrap gap-3">
              <Button asChild className="group">
                <Link to="/questionnaire">
                  Start the questionnaire
                  <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-0.5" />
                </Link>
              </Button>
              <Button asChild variant="ghost">
                <a href="mailto:hello@projectjuno.app">Email us</a>
              </Button>
            </div>
          </div>

          {/* === Right rail / TOC === */}
          <aside id="toc" className="hidden lg:block">
            <div className="sticky top-20 space-y-4">
              <div className="text-sm font-medium text-muted-foreground">On this page</div>
              <nav className="text-sm space-y-2">
                <a className="block hover:underline underline-offset-4" href="#about-juno">
                  About Project Juno
                </a>
                <a className="block hover:underline underline-offset-4" href="#future">
                  The Future of Project Juno
                </a>
                <a className="block hover:underline underline-offset-4" href="#help">
                  Building Together
                </a>
                <a className="block hover:underline underline-offset-4" href="#roadmap">
                  Roadmap
                </a>
              </nav>

              <Separator />

              {/* Small “Why Juno” cards */}
              <div className="grid gap-3">
                <Card>
                  <CardHeader className="py-3">
                    <CardTitle className="text-sm">Why Juno?</CardTitle>
                    <CardDescription className="text-xs">Less noise, more signal.</CardDescription>
                  </CardHeader>
                  <CardContent className="text-xs text-muted-foreground">
                    We prioritize alignment over attention. No swiping, no performative profiles.
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader className="py-3">
                    <CardTitle className="text-sm">Privacy first</CardTitle>
                    <CardDescription className="text-xs">Private by default.</CardDescription>
                  </CardHeader>
                  <CardContent className="text-xs text-muted-foreground">
                    Drafts stay in your browser; submissions are stored securely and reviewed only
                    to improve matching.
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
