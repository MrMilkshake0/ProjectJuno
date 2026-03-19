// src/pages/FrontPage.tsx
import { Link } from 'react-router-dom';
import { ArrowRight, MessageSquare, Users, Brain, Shield, Clock } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import DiscordInvite from "@/components/DiscordInvite";
import Header from '@/components/Header';

function abs(path: string) {
  const base = "https://www.projectjuno.ai";
  return path.startsWith("http") ? path : `${base}${path.startsWith("/") ? "" : "/"}${path}`;
}
function JsonLd<T extends object>({ data }: { data: T }) {
  return <script type="application/ld+json">{JSON.stringify(data)}</script>;
}

export default function FrontPage() {
  const orgLd = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "Juno",
    url: abs("/"),
    logo: abs("/icon-512.png"),
    sameAs: [],
  };
  const siteLd = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    url: abs("/"),
    name: "Juno",
  };

  return (
    <main className="min-h-screen flex flex-col">
      <title>Juno — An AI companion that finds your people</title>
      <meta
        name="description"
        content="Juno is an AI companion that gets to know you through real conversation — and uses that understanding to find people you'd genuinely click with."
      />
      <link rel="canonical" href={abs("/")} />
      <meta name="robots" content="index,follow" />
      <meta property="og:title" content="Juno — An AI companion that finds your people" />
      <meta property="og:description" content="Not a dating app. An AI that actually gets to know you — and uses that to find people you'd click with." />
      <meta property="og:url" content={abs("/")} />
      <meta property="og:type" content="website" />
      <meta name="twitter:card" content="summary_large_image" />
      <JsonLd data={orgLd} />
      <JsonLd data={siteLd} />

      <Header />

      {/* ===== HERO ===== */}
      <section
        className="
          relative isolate overflow-clip
          flex items-center
          min-h-[80svh]
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
              An AI companion that finds your people
            </h1>

            <p className="mt-4 text-muted-foreground text-base md:text-lg max-w-prose">
              Juno gets to know you through real conversation — your values, how you connect,
              what makes you tick. We use that understanding to find people you'd genuinely click with.
              No swiping. No bios. No quizzes.
            </p>

            <div className="mt-8 flex flex-wrap items-center gap-3">
              <Button asChild size="lg" className="group">
                <a
                  href="https://discord.gg/ZTNRCrVc6j"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Join the Juno Discord server"
                >
                  <MessageSquare className="mr-2 h-4 w-4" />
                  Join the Discord
                  <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-0.5" />
                </a>
              </Button>

              <Button
                asChild
                variant="ghost"
                className="glow-button text-primary font-medium px-5 py-2 rounded-md"
              >
                <Link to="/about" aria-label="Learn more about Juno" className="inline-flex items-center">
                  Learn more
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </div>

            <p className="mt-6 text-sm text-muted-foreground">
              Juno lives on Discord. Join the server, DM the bot, and start talking.
            </p>
          </div>

          {/* Right: Feature cards */}
          <div className="flex items-center">
            <div className="grid gap-4 w-full">
              <Card className="shadow-md">
                <CardHeader className="pb-2">
                  <CardTitle className="flex items-center gap-2 text-base">
                    <Brain className="h-4 w-4" />
                    A companion, not a form
                  </CardTitle>
                </CardHeader>
                <CardContent className="text-sm text-muted-foreground">
                  Juno is someone you actually talk to. It remembers what you said last week,
                  notices when something's off, and has its own opinions. The better it knows you,
                  the better we can match you.
                </CardContent>
              </Card>

              <Card className="shadow-md">
                <CardHeader className="pb-2">
                  <CardTitle className="flex items-center gap-2 text-base">
                    <Users className="h-4 w-4" />
                    Matching that means something
                  </CardTitle>
                </CardHeader>
                <CardContent className="text-sm text-muted-foreground">
                  We match you based on who you actually are — your values, how you communicate,
                  what you need — not a photo and a bio. When we find someone you'd click with,
                  we introduce you.
                </CardContent>
              </Card>
            </div>
          </div>
        </div>

        <div className="absolute inset-x-0 bottom-[env(safe-area-inset-bottom,1rem)] z-10 pointer-events-none">
          <div className="mx-auto w-fit rounded-full px-3 py-1 text-xs text-muted-foreground bg-background/70 backdrop-blur shadow">
            Scroll for details
          </div>
        </div>
      </section>

      <Separator />

      {/* ===== HOW IT WORKS ===== */}
      <section className="py-16 md:py-20 px-6 md:px-10 bg-background">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-2xl md:text-3xl font-semibold tracking-tight text-center">
            How it works
          </h2>
          <p className="mt-3 text-muted-foreground text-center max-w-2xl mx-auto">
            No profiles to fill out. No algorithms gaming your attention. Just conversation.
          </p>

          <div className="mt-12 grid md:grid-cols-3 gap-6">
            <div className="text-center">
              <div className="mx-auto w-10 h-10 rounded-full bg-muted flex items-center justify-center text-sm font-semibold">1</div>
              <h3 className="mt-4 font-medium">Say hi</h3>
              <p className="mt-2 text-sm text-muted-foreground">
                Join the Discord server and DM Juno. It'll introduce itself and start getting to know you.
              </p>
            </div>
            <div className="text-center">
              <div className="mx-auto w-10 h-10 rounded-full bg-muted flex items-center justify-center text-sm font-semibold">2</div>
              <h3 className="mt-4 font-medium">Talk about your life</h3>
              <p className="mt-2 text-sm text-muted-foreground">
                Come back whenever. Juno remembers everything and picks up where you left off.
                Over time, it builds a deep understanding of who you are.
              </p>
            </div>
            <div className="text-center">
              <div className="mx-auto w-10 h-10 rounded-full bg-muted flex items-center justify-center text-sm font-semibold">3</div>
              <h3 className="mt-4 font-medium">We find your people</h3>
              <p className="mt-2 text-sm text-muted-foreground">
                When we find someone you'd genuinely click with, we introduce you.
                No swiping. Just a real introduction based on real understanding.
              </p>
            </div>
          </div>
        </div>
      </section>

      <Separator />

      {/* ===== WHY JUNO ===== */}
      <section className="py-16 md:py-20 px-6 md:px-10 bg-background">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-2xl md:text-3xl font-semibold tracking-tight text-center">
            Why Juno is different
          </h2>

          <div className="mt-12 grid md:grid-cols-2 gap-6">
            <Card className="shadow-md">
              <CardHeader className="pb-2">
                <CardTitle className="flex items-center gap-2 text-base">
                  <Brain className="h-4 w-4" />
                  It actually knows you
                </CardTitle>
              </CardHeader>
              <CardContent className="text-sm text-muted-foreground">
                Juno learns through conversation — not a quiz you fill out once. It notices patterns,
                forms theories, and understands not just what you say you want, but what you actually respond to.
              </CardContent>
            </Card>

            <Card className="shadow-md">
              <CardHeader className="pb-2">
                <CardTitle className="flex items-center gap-2 text-base">
                  <Clock className="h-4 w-4" />
                  No pressure, no schedule
                </CardTitle>
              </CardHeader>
              <CardContent className="text-sm text-muted-foreground">
                Message whenever. Disappear for a week. Come back at 3am.
                Juno isn't going anywhere. Conversations happen at your pace.
              </CardContent>
            </Card>

            <Card className="shadow-md">
              <CardHeader className="pb-2">
                <CardTitle className="flex items-center gap-2 text-base">
                  <Shield className="h-4 w-4" />
                  Your data stays yours
                </CardTitle>
              </CardHeader>
              <CardContent className="text-sm text-muted-foreground">
                We use your data to find you better matches — never sold or shared with third parties.
                Type /forgetme at any time and everything is wiped clean.
              </CardContent>
            </Card>

            <Card className="shadow-md">
              <CardHeader className="pb-2">
                <CardTitle className="flex items-center gap-2 text-base">
                  <Users className="h-4 w-4" />
                  Real connections, not content
                </CardTitle>
              </CardHeader>
              <CardContent className="text-sm text-muted-foreground">
                No feeds. No likes. No performative profiles. Juno is about finding people who get you —
                based on who you actually are, not who you present yourself as.
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      <Separator />

      {/* ===== COMMUNITY / DISCORD ===== */}
      <section id="community" className="py-16 md:py-20 px-6 md:px-10 bg-background">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-2xl md:text-3xl font-semibold tracking-tight">
            Get started
          </h2>
          <p className="mt-3 text-muted-foreground">
            Juno is in early development and you're getting in early. Join the Discord,
            DM the bot, and start talking. You're helping shape what Juno becomes.
          </p>

          <div className="mt-8 max-w-md mx-auto">
            <DiscordInvite
              inviteUrl="https://discord.gg/ZTNRCrVc6j"
              serverName="Juno Community"
            />
          </div>

          <p className="mt-6 text-sm text-muted-foreground">
            Not into Discord? Reach out at{" "}
            <a href="mailto:projectjunoapp@gmail.com" className="underline underline-offset-4">
              projectjunoapp@gmail.com
            </a>
          </p>
        </div>
      </section>

      <Separator />

      {/* ===== FAQ ===== */}
      <section className="py-12 md:py-16 px-6 md:px-10 bg-background">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-xl md:text-2xl font-semibold tracking-tight mb-4">Questions</h2>

          <Accordion type="single" collapsible className="w-full">
            <AccordionItem value="how">
              <AccordionTrigger>How does it work?</AccordionTrigger>
              <AccordionContent className="text-sm text-muted-foreground">
                Join the Discord server and DM Juno. It'll introduce itself, ask a few quick things
                to get started, and then you're just talking. Come back whenever — Juno picks up where
                you left off. Over time, it builds a deep understanding of who you are, and we use that
                to find people you'd genuinely click with.
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="companion">
              <AccordionTrigger>What do you mean by "AI companion"?</AccordionTrigger>
              <AccordionContent className="text-sm text-muted-foreground">
                Juno isn't a chatbot that asks you survey questions. It's an AI you have real conversations
                with — about your life, what you're figuring out, what matters to you. It remembers
                everything, forms opinions about you, and gets to know you over weeks and months.
                The companion relationship is what makes the matching work — Juno knows you because it
                actually paid attention, not because you filled out a form.
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="matching">
              <AccordionTrigger>Is matching available yet?</AccordionTrigger>
              <AccordionContent className="text-sm text-muted-foreground">
                Right now Juno is focused on the companion side — getting to know you, building that
                understanding. The matching side is coming, and everything you share with Juno now is
                what powers it later. You're getting in early.
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="privacy">
              <AccordionTrigger>What happens with my data?</AccordionTrigger>
              <AccordionContent className="text-sm text-muted-foreground">
                Your data is used to find you better matches — never sold or shared with third parties.
                Type <code>/forgetme</code> in your DM with Juno at any time to wipe all your data completely.
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="age">
              <AccordionTrigger>Who is Juno for?</AccordionTrigger>
              <AccordionContent className="text-sm text-muted-foreground">
                Juno is built for people aged 16-25 who want genuine connection — not swiping, not
                performative profiles. If you're open to something real and willing to actually talk,
                Juno is for you.
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </div>
      </section>

      {/* ===== FOOTER ===== */}
      <footer className="py-8 px-6 md:px-10 border-t bg-background">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4 text-sm text-muted-foreground">
          <p>&copy; {new Date().getFullYear()} Juno. All rights reserved.</p>
          <div className="flex gap-4">
            <Link to="/about" className="hover:underline">About</Link>
            <Link to="/whitepaper" className="hover:underline">Whitepaper</Link>
            <a href="mailto:projectjunoapp@gmail.com" className="hover:underline">Contact</a>
          </div>
        </div>
      </footer>
    </main>
  );
}
