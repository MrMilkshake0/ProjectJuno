// src/pages/AboutPage.tsx
import { Link } from 'react-router-dom';
import {
  ArrowRight,
  Info,
  Sparkles,
  ScrollText,
  FileText,
  Mail
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

            {/* About Project Juno */}
            <Card id="about-juno" className="shadow-md">
              <CardHeader className="pb-3">
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle className="flex items-center gap-2">
                      <Sparkles className="h-5 w-5" />
                      About Project Juno
                    </CardTitle>
                    <CardDescription>
                      The story, inspiration, and dream behind Juno.
                    </CardDescription>
                  </div>
                  <Badge variant="outline">Overview</Badge>
                </div>
              </CardHeader>
              <CardContent className="prose prose-invert max-w-none">
                <p>
                  <strong>Project Juno</strong> takes its name from <em>Juno</em>, the Roman goddess of
                  marriage, commitment, and the protector of sacred union. She represents devotion,
                  stability, and the belief that partnership can be something sacred — not
                  disposable.
                </p>
                <p>
                  This project is my attempt to explore what a modern system for meaningful
                  connection could look like. I want to build an ecosystem that encourages depth over
                  novelty, alignment over attention — a space where the idea of long-term
                  relationships and marriage can find new relevance in a digital world.
                </p>
                <p>
                  It’s still early, more of a vision than a product. But at its core, <em>Project
                  Juno</em> is about rekindling belief in lasting partnership, and seeing if
                  technology — used carefully — can help bring that ideal back into focus.
                </p>
              </CardContent>
            </Card>

            {/* Manifesto / Story as a callout */}
            <Card id="manifesto" className="shadow-md">
              <CardHeader className="pb-3">
                <CardTitle className="flex items-center gap-2">
                  <FileText className="h-5 w-5" />
                  The Case for Data-Informed Matching
                </CardTitle>
                <CardDescription>
                  Why I believe technology, used thoughtfully, can strengthen how people find one another.
                </CardDescription>
              </CardHeader>
              <CardContent className="prose prose-invert max-w-none">
                <p>
                  I’ve always believed that the way we connect can be improved — not replaced — by technology.
                  We already use data to make better decisions about nearly everything: health, learning,
                  work, and wellbeing. Yet when it comes to relationships, the systems we have often push us
                  toward speed and surface-level judgment, not understanding.
                </p>
                <p>
                  The idea behind <em>Project Juno</em> is simple: to explore whether we can use data
                  responsibly to make introductions that actually make sense. Not to quantify love, but to
                  help people notice compatibility they might otherwise miss — values, timelines, and life
                  rhythms that naturally align.
                </p>
                <p>
                  I don’t see this as an algorithmic replacement for intuition or chemistry, but as a way to
                  give those things a better starting point. The goal is not control, but clarity — tools that
                  support real human judgment and reduce the noise that makes dating exhausting.
                </p>
                <p>
                  If technology can help people approach relationships with more awareness, more honesty, and
                  more intention, then maybe it can serve something truly human after all.
                </p>
              </CardContent>
            </Card>


            <Card id="help" className="shadow-md">
              <CardHeader>
                <CardTitle>Building Together</CardTitle>
                <CardDescription>
                  Looking for people who see potential in this idea — and want to shape it.
                </CardDescription>
              </CardHeader>
              <CardContent className="prose prose-invert max-w-none">
                <p>
                  <em>Project Juno</em> is still an idea taking shape — a framework, a set of questions, and a
                  vision of how technology could help people form more meaningful relationships. It’s far too
                  big and complex to build alone, and that’s why I’m sharing it early.
                </p>
                <p>
                  I’m looking for people who care about the intersection of <strong>data, relationships, and
                  ethics</strong> — builders, researchers, designers, or simply thoughtful individuals who want
                  to explore what a better system might look like. Whether you’re curious, skeptical, or
                  inspired, your perspective matters.
                </p>
                <p>
                  If this resonates with you, I’d love to connect — to discuss ideas, challenges, and
                  possibilities. Join the community, share feedback, or just see where the conversation goes.
                </p>

                <div className="mt-5 flex flex-wrap gap-3">
                  <Button asChild>
                    <a
                      href="https://discord.gg/YOUR_INVITE_CODE"
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label="Join the Project Juno Discord server"
                    >
                      <Mail className="mr-2 h-4 w-4" />
                      Join the Discord
                    </a>
                  </Button>
                </div>
              </CardContent>
            </Card>



            {/* Roadmap */}
            <Card id="roadmap" className="shadow-md">
              <CardHeader>
                <CardTitle>Roadmap</CardTitle>
                <CardDescription>What we’re shipping next (subject to change).</CardDescription>
              </CardHeader>
              <CardContent className="text-sm text-muted-foreground">
                <ol className="relative border-l pl-6 space-y-6">
                  <li>
                    <div className="absolute -left-[9px] top-0 h-4 w-4 rounded-full bg-primary" />
                    <p className="font-medium text-foreground">MVP matching (constraints + preferences)</p>
                    <p className="mt-1">Rank candidate pairs without swiping; warm intros only.</p>
                  </li>
                  <li>
                    <div className="absolute -left-[9px] h-4 w-4 rounded-full bg-primary mt-7" />
                    <p className="font-medium text-foreground">Outcome feedback loops</p>
                    <p className="mt-1">Use opt-in outcomes to refine rankings and reduce bad fits.</p>
                  </li>
                  <li>
                    <div className="absolute -left-[9px] h-4 w-4 rounded-full bg-primary mt-7" />
                    <p className="font-medium text-foreground">Feature weighting & explainability</p>
                    <p className="mt-1">Show <em>why</em> a match was suggested in plain language.</p>
                  </li>
                  <li>
                    <div className="absolute -left-[9px] h-4 w-4 rounded-full bg-primary mt-7" />
                    <p className="font-medium text-foreground">Private-by-default profiles</p>
                    <p className="mt-1">You control what’s visible and when.</p>
                  </li>
                </ol>
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
                <a className="block hover:underline underline-offset-4" href="#manifesto">
                  The Ramblings of a Madman
                </a>
                <a className="block hover:underline underline-offset-4" href="#help">
                  A Cry for Help
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
