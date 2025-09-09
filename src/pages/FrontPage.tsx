// src/pages/FrontPage.tsx
import { Link } from 'react-router-dom';
import { ArrowRight, Info, Sparkles, ScrollText } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';

/**
 * FrontPage
 * - A clean, modern startup-style landing page.
 * - Hero: large headline, supportive subtext, primary CTA → /questionnaire.
 * - Secondary: after-scroll info section with Cards and an FAQ-style Accordion.
 * - Built with shadcn components for consistency and a polished look.
 */
export default function FrontPage() {
  return (
    <main className="min-h-screen flex flex-col">
      {/* HERO SECTION */}
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
              Project Juno - The first gen 2 dating app
            </h1>

            <p className="mt-4 text-muted-foreground text-base md:text-lg max-w-prose">
              Creating a new paradigm in dating by prioritizing meaningful connections and authentic
              interactions over superficial swipes.
            </p>

            <div className="mt-8 flex flex-wrap items-center gap-3">
              {/* Primary CTA → /questionnaire (shadcn Button as React Router Link) */}
              <Button asChild size="lg" className="group">
                <Link to="/questionnaire" aria-label="Start the questionnaire">
                  Start the questionnaire
                  <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-0.5" />
                </Link>
              </Button>

              {/* Secondary CTA: smooth-scroll to info section */}
              <Button asChild variant="ghost">
                <a href="#more" aria-label="Learn more about how it works">
                  Learn more
                </a>
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
                  <CardTitle>How It Will Work</CardTitle>
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

      {/* DIVIDER */}
      <Separator />

      {/* SECONDARY SECTION */}
      <section
        id="more"
        className="py-16 md:py-24 px-6 md:px-10 bg-background"
        aria-labelledby="more-heading"
      >
        <div className="max-w-6xl mx-auto">
          <div className="max-w-2xl">
            <h2 id="more-heading" className="text-2xl md:text-3xl font-semibold tracking-tight">
              The Rambelings of a Madman
            </h2>
            <p className="mt-3 text-muted-foreground">
              It is just a hypothesis."With enough data, with the *correct* data it is possible to match people
              romantically with reasonable accuracy”. It's an odd assertion, something that divides people 
              even. Many say (and rightfully so) that humans are just too complex, too unique for such a 
              system to ever work, but I disagree. The human brain does this every single day. My whole 
              school life I traveled, I don't think I ever stayed at a school for more than 2 years before 
              moving and in that time I met many many people, yet they weren't so different. In my brain, 
              without even thinking, these people got sorted into their own group, you could call it a cluster. 
              Sometimes you meet someone new, someone unique and a new cluster is born and as you 
              meet more and more people the density of these clusters increase. You start getting an 
              understanding of how different people think and see the world and eventually if you have seen 
              enough people and how they interact with each other you get what we call “Matchmakers”. I 
              believe in the data driven world we live in, especially with the advances we have seen in recent 
              years that such a system is not only possible but completely inevitable. I am 100% certain 
              about this. 
            </p>
            <h2 id="more-heading" className="text-2xl md:text-3xl font-semibold tracking-tight">
              A Cry for help
            </h2>
            <p className="mt-3 text-muted-foreground">
              This project can not be done alone, I am looking for co-founders, advisors and anyone to be a part of this journey. 
            </p>
          </div>

          {/* Feature Cards */}
          <div className="mt-10 grid gap-6 md:grid-cols-3">
            <Card className="shadow-sm">
              <CardHeader>
                <CardTitle className="text-lg">Signal over Swipes</CardTitle>
                <CardDescription>Depth first, not left/right.</CardDescription>
              </CardHeader>
              <CardContent className="text-sm text-muted-foreground">
                The questionnaire surfaces values, habits, and non-obvious preferences so the model
                can look past glossy profiles and lock onto genuine compatibility signals.
              </CardContent>
            </Card>

            <Card className="shadow-sm">
              <CardHeader>
                <CardTitle className="text-lg">Human-Checked Intros</CardTitle>
                <CardDescription>Every match gets a sanity check.</CardDescription>
              </CardHeader>
              <CardContent className="text-sm text-muted-foreground">
                In the MVP, I personally review both sides before introducing you, then collect
                feedback to tighten the loop and improve the match engine with real outcomes.
              </CardContent>
            </Card>

            <Card className="shadow-sm">
              <CardHeader>
                <CardTitle className="text-lg">Privacy by Default</CardTitle>
                <CardDescription>Your data, your call.</CardDescription>
              </CardHeader>
              <CardContent className="text-sm text-muted-foreground">
                Drafts live locally until you choose to share. Export on your terms, revoke access
                anytime, and expect plain-English explanations of what the model uses and why.
              </CardContent>
            </Card>
          </div>

          {/* FAQ / Details */}
          <div className="mt-10">
            <Accordion type="single" collapsible className="w-full">
              <AccordionItem value="item-1">
                <AccordionTrigger>What happens after I finish the questionnaire?</AccordionTrigger>
                <AccordionContent className="text-sm text-muted-foreground">
                  You’ll be taken to a summary view and we generate a structured profile. I review
                  promising pairings, reach out to both sides to confirm interest, then make a warm
                  introduction. Post-intro feedback feeds the next round of matches.
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="item-2">
                <AccordionTrigger>How does the flow work?</AccordionTrigger>
                <AccordionContent className="text-sm text-muted-foreground">
                  Sections appear one at a time. Required fields are clearly marked. You can move
                  back and forth before submitting, and autosave keeps your progress as you go.
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="item-3">
                <AccordionTrigger>Where is my data stored?</AccordionTrigger>
                <AccordionContent className="text-sm text-muted-foreground">
                  By default your draft is stored locally in your browser. You decide when to export
                  or share it. During the MVP, only the minimum necessary fields are used for
                  matching, and I can walk you through exactly what those are.
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </div>

          {/* Sticky CTA fallback at bottom */}
          <div className="mt-12">
            <Button asChild size="lg" className="w-full sm:w-auto">
              <Link to="/questionnaire" aria-label="Start the questionnaire from details section">
                Start the questionnaire
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </div>
        </div>
      </section>
    </main>
  );
}