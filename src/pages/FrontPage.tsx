// src/pages/FrontPage.tsx
import { Link } from 'react-router-dom';
import { ArrowRight, Info, Sparkles, ScrollText } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import DiscordInvite from "@/components/DiscordInvite";

import Header from '@/components/Header';

export default function FrontPage() {
  return (
    <main className="min-h-screen flex flex-col">
      <Header />

      {/* ===== HERO (IDENTICAL TO YOUR ORIGINAL) ===== */}
      <section
        className="
          relative flex items-center
          min-h-[80dvh]
          px-6 md:px-10
          bg-gradient-to-b from-background via-background to-muted/40
        "
        aria-labelledby="hero-heading"
      >
        <div className="max-w-6xl mx-auto w-full grid md:grid-cols-2 gap-12">
          {/* Left: Headline + CTA */}
          <div className="flex flex-col justify-center">
            <h1
              id="hero-heading"
              className="text-4xl md:text-6xl font-bold tracking-tight leading-tight"
            >
              Project Juno - The first Gen 3 dating app
            </h1>

            <p className="mt-4 text-muted-foreground text-base md:text-lg max-w-prose">
              Creating a new paradigm in dating apps by prioritizing meaningful connections and authentic
              interactions over superficial swipes.
            </p>

            <div className="mt-8 flex flex-wrap items-center gap-3">
              <Button asChild size="lg" className="group">
                <Link to="/questionnaire" aria-label="Start the questionnaire">
                  Start the questionnaire
                  <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-0.5" />
                </Link>
              </Button>

              <Button asChild variant="ghost">
                <Link to="/about" aria-label="Learn more about Project Juno">
                    Learn more
                </Link>
              </Button>
            </div>

            {/* Small trust bar / bullets */}
            <div className="mt-6 flex flex-wrap gap-4 text-sm text-muted-foreground">
              <span className="inline-flex items-center gap-2">
                <Sparkles className="h-4 w-4" /> Built with shadcn
              </span>
              <span className="inline-flex items-center gap-2">
                <ScrollText className="h-4 w-4" /> Private
              </span>
              <span className="inline-flex items-center gap-2">
                <Info className="h-4 w-4" /> Quick to complete*
              </span>
            </div>
          </div>

          {/* Right: Visual card cluster (secondary emphasis) */}
          <div className="flex items-center">
            <div className="grid gap-4 w-full">
              <Card className="shadow-md">
                <CardHeader>
                  <CardTitle>How It Will Work (For Now)</CardTitle>
                  <CardDescription>
                    Just fill out the details and the AI/ML system will find the best matches for you.
                  </CardDescription>
                </CardHeader>
                <CardContent className="text-sm text-muted-foreground">
                  As this is an early MVP I will be iterating the matching system as I get user
                  data and feedback. I will personally reach out to both sides of the match before
                  introducing them and collect feedback afterwards.
                </CardContent>
              </Card>

              <Card className="shadow-md">
                <CardHeader>
                  <CardTitle>My mission to end swiping</CardTitle>
                  <CardDescription>
                    Lets be honest, we all hate swiping and the current state of dating.
                  </CardDescription>
                </CardHeader>
                <CardContent className="text-sm text-muted-foreground">
                  Swiping is a gamification technique that exploits our psychological biases,
                  leading to addictive behaviors and superficial judgments. Its a plague on modern dating
                  leading to decreased satisfaction to everyone involved.
                </CardContent>
              </Card>
            </div>
          </div>
        </div>

        {/* Subtle bottom cue to scroll */}
        <div className="absolute bottom-6 left-1/2 -translate-x-1/2 text-xs text-muted-foreground">
          Scroll for details
        </div>
      </section>

      <Separator />

      {/* ===== COMMUNITY / DISCORD SECTION ===== */}
      <section id="community" className="py-16 md:py-20 px-6 md:px-10 bg-background">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-2xl md:text-3xl font-semibold tracking-tight">
            Join the Project Juno Community
          </h2>
          <p className="mt-3 text-muted-foreground">
            The Discord server is where I will share updates, gather direct feedback, and connect
            with early testers. If you’d like to help shape Juno I am actively looking for passionate people to talk and work with including potential co-founders.
          </p>

          <div className="mt-8 max-w-md mx-auto">
            <DiscordInvite
              inviteUrl="https://discord.gg/27WUQkzaSX"
              serverName="Project Juno Community"
            />
          </div>

          <p className="mt-6 text-sm text-muted-foreground">
            Not into Discord? No worries — you can always reach me directly at{" "}
            <a href="mailto:projectjunoapp@gmail.com" className="underline underline-offset-4">
              projectjunoapp@gmail.com
            </a>.
          </p>
        </div>
      </section>

      <Separator />

      {/* ===== FAQ ===== */}
      <section className="py-12 md:py-16 px-6 md:px-10 bg-background">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-xl md:text-2xl font-semibold tracking-tight mb-4">Quick questions</h2>

          <Accordion type="single" collapsible className="w-full">
            <AccordionItem value="how">
              <AccordionTrigger>How does it work?</AccordionTrigger>
              <AccordionContent className="text-sm text-muted-foreground">
                <ol className="list-decimal pl-5 space-y-2">
                  <li>
                    <span className="font-medium text-foreground">Fill the questionnaire:</span>{" "}
                    capture values, habits, timelines, boundaries, and must-haves.
                  </li>
                  <li>
                    <span className="font-medium text-foreground">We review & rank:</span>{" "}
                    early engine + human sanity-check to filter obvious misalignments and highlight strong fits.
                  </li>
                  <li>
                    <span className="font-medium text-foreground">Warm introduction:</span>{" "}
                    if both say yes, we connect you and learn from outcomes to improve future matches.
                  </li>
                </ol>

                <div className="mt-4">
                  <Link
                    to="/questionnaire"
                    className="inline-flex items-center rounded-md px-4 py-2 text-sm font-medium bg-primary text-primary-foreground hover:opacity-90"
                    aria-label="Start the questionnaire"
                  >
                    Start the questionnaire
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </div>
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="privacy">
              <AccordionTrigger>Where is my data stored and used?</AccordionTrigger>
              <AccordionContent className="text-sm text-muted-foreground">
                Drafts stay in your browser until you submit. Once submitted, it’s stored securely
                in a database only I can access. I use it to test, research, and improve the matching system.
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="delete">
              <AccordionTrigger>How can I delete my data?</AccordionTrigger>
              <AccordionContent className="text-sm text-muted-foreground">
                For now, email or DM me via Discord and I’ll remove it. A self-serve dashboard is on the roadmap.
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </div>
      </section>
    </main>
  );
}
