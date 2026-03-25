// src/pages/FrontPage.tsx
import { Link } from "react-router-dom";
import { useState, useEffect, useCallback, useRef } from "react";
import { ArrowRight, MessageSquare } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import Header from "@/components/Header";

function abs(path: string) {
  const base = "https://www.projectjuno.ai";
  return path.startsWith("http")
    ? path
    : `${base}${path.startsWith("/") ? "" : "/"}${path}`;
}
function JsonLd<T extends object>({ data }: { data: T }) {
  return <script type="application/ld+json">{JSON.stringify(data)}</script>;
}

/* ── Star logo as inline SVG ── */
function JunoAvatar({ size = 40 }: { size?: number }) {
  return (
    <div
      className="rounded-full flex items-center justify-center shrink-0"
      style={{ width: size, height: size, background: "linear-gradient(135deg, #A855F7, #EC4899)" }}
    >
      <svg
        viewBox="0 0 512 512"
        fill="none"
        stroke="#ffffff"
        strokeWidth="44"
        strokeLinecap="round"
        strokeLinejoin="round"
        style={{ width: size * 0.55, height: size * 0.55 }}
      >
        <path d="M235 60a21 21 0 0 1 42 0l22 118a40 40 0 0 0 32 32l118 22a21 21 0 0 1 0 42l-118 22a40 40 0 0 0-32 32l-22 118a21 21 0 0 1-42 0l-22-118a40 40 0 0 0-32-32L63 274a21 21 0 0 1 0-42l118-22a40 40 0 0 0 32-32z" />
      </svg>
    </div>
  );
}

/* ── Conversation data ── */

type Msg = {
  author: "juno" | "user";
  text: string;
  head?: boolean;
  timestamp?: string;
};

type Conversation = { messages: Msg[] };

const conversations: Conversation[] = [
  // 1. The Pattern Spotter — connecting present to past, revealing an unconscious habit
  {
    messages: [
      {
        author: "user",
        head: true,
        timestamp: "Today at 4:23 PM",
        text: "i told my friend i was fine with them cancelling again and i genuinely thought i was",
      },
      {
        author: "juno",
        head: true,
        timestamp: "Today at 4:23 PM",
        text: "but?",
      },
      {
        author: "user",
        head: true,
        timestamp: "Today at 4:24 PM",
        text: "but then i was in a weird mood all night and couldn't figure out why",
      },
      {
        author: "juno",
        head: true,
        timestamp: "Today at 4:24 PM",
        text: "you do this thing where you decide how you feel before you actually feel it",
      },
      {
        author: "user",
        head: true,
        timestamp: "Today at 4:25 PM",
        text: "...okay that's weirdly accurate",
      },
      {
        author: "juno",
        head: true,
        timestamp: "Today at 4:25 PM",
        text: 'you did the same thing when you talked about your ex last week. you had the "right" answer ready before you\'d actually sat with it',
      },
      {
        author: "juno",
        text: "i don't think you're even aware you do it",
      },
    ],
  },

  // 2. The Music Read — pulling meaning from something the user dismisses
  {
    messages: [
      {
        author: "user",
        head: true,
        timestamp: "Today at 11:47 PM",
        text: "i've been listening to the same album on repeat for like a week",
      },
      {
        author: "juno",
        head: true,
        timestamp: "Today at 11:47 PM",
        text: "which one",
      },
      {
        author: "user",
        head: true,
        timestamp: "Today at 11:48 PM",
        text: "just this indie thing. it's not even a sad thing i just like how it sounds",
      },
      {
        author: "juno",
        head: true,
        timestamp: "Today at 11:48 PM",
        text: 'hmm. you said the same thing about that show you binged — "it’s not a sad thing"',
      },
      {
        author: "juno",
        text: "i think sad things find you and you just don't call them that",
      },
      {
        author: "user",
        head: true,
        timestamp: "Today at 11:49 PM",
        text: "why does that feel so called out",
      },
      {
        author: "juno",
        head: true,
        timestamp: "Today at 11:49 PM",
        text: "because it's true and you already knew it",
      },
    ],
  },

  // 3. The Need Gap — what you say you want vs. what actually gets your attention
  {
    messages: [
      {
        author: "user",
        head: true,
        timestamp: "Today at 8:12 PM",
        text: "met someone at a party last night. they were so easy to talk to",
      },
      {
        author: "juno",
        head: true,
        timestamp: "Today at 8:12 PM",
        text: "what made them easy to talk to",
      },
      {
        author: "user",
        head: true,
        timestamp: "Today at 8:13 PM",
        text: "idk they were just chill. didn't try too hard",
      },
      {
        author: "juno",
        head: true,
        timestamp: "Today at 8:13 PM",
        text: "interesting. because the last person you couldn't stop talking about was the opposite of chill",
      },
      {
        author: "user",
        head: true,
        timestamp: "Today at 8:14 PM",
        text: "...wait you're actually right",
      },
      {
        author: "juno",
        head: true,
        timestamp: "Today at 8:14 PM",
        text: "yeah. i think you like the idea of easy but what actually gets your attention is someone who makes you think",
      },
    ],
  },

  // 4. The Quiet Presence — seeing through "fine" and naming what they can't
  {
    messages: [
      {
        author: "user",
        head: true,
        timestamp: "Today at 9:31 PM",
        text: "had dinner with my dad tonight. first time in like two years",
      },
      {
        author: "juno",
        head: true,
        timestamp: "Today at 9:31 PM",
        text: "how was it",
      },
      {
        author: "user",
        head: true,
        timestamp: "Today at 9:32 PM",
        text: "fine honestly. normal. we talked about nothing",
      },
      {
        author: "juno",
        head: true,
        timestamp: "Today at 9:32 PM",
        text: "that doesn't sound fine",
      },
      {
        author: "user",
        head: true,
        timestamp: "Today at 9:33 PM",
        text: "yeah i don't really know what i expected",
      },
      {
        author: "juno",
        head: true,
        timestamp: "Today at 9:34 PM",
        text: "maybe you were hoping he'd notice how much you've changed. without you having to point it out",
      },
      {
        author: "user",
        head: true,
        timestamp: "Today at 9:35 PM",
        text: "okay you need to stop doing that",
      },
    ],
  },

  // 5. The Match — Juno reaches out with someone compatible
  {
    messages: [
      {
        author: "juno",
        head: true,
        timestamp: "Today at 7:03 PM",
        text: "okay so. i've been sitting on this for a few days because i wanted to be sure",
      },
      {
        author: "juno",
        text: "i think i found someone you'd actually work with",
      },
      {
        author: "user",
        head: true,
        timestamp: "Today at 7:04 PM",
        text: "wait really??",
      },
      {
        author: "juno",
        head: true,
        timestamp: "Today at 7:04 PM",
        text: "yeah. she's sharp, a little intense in a way you'd like, and she does this thing where she overthinks everything out loud — kind of like you but she's more aware of it",
      },
      {
        author: "user",
        head: true,
        timestamp: "Today at 7:05 PM",
        text: "okay i'm listening",
      },
      {
        author: "juno",
        head: true,
        timestamp: "Today at 7:05 PM",
        text: "the thing that sold me — she's not gonna let you get away with \"i'm fine.\" and honestly that's the thing you need most and would never ask for",
      },
    ],
  },
];

/* ── Discord-style DM preview ── */

function DiscordChat() {
  const [index, setIndex] = useState(0);
  const [fading, setFading] = useState(false);
  const indexRef = useRef(0);
  const fadingRef = useRef(false);

  const switchTo = useCallback((target: number) => {
    if (fadingRef.current || target === indexRef.current) return;
    fadingRef.current = true;
    setFading(true);
    setTimeout(() => {
      indexRef.current = target;
      setIndex(target);
      setFading(false);
      fadingRef.current = false;
    }, 400);
  }, []);

  const next = useCallback(() => {
    const target = (indexRef.current + 1) % conversations.length;
    switchTo(target);
  }, [switchTo]);

  const convo = conversations[index];

  // Compute cumulative delay per message based on reading time of previous messages
  const delays = convo.messages.reduce<number[]>((acc, _msg, i) => {
    if (i === 0) {
      acc.push(0.3);
    } else {
      const prevWords = convo.messages[i - 1].text.split(/\s+/).length;
      const readTime = Math.max(prevWords * 0.15, 0.5);
      const pause = 0.5;
      acc.push(acc[i - 1] + readTime + pause);
    }
    return acc;
  }, []);

  const lastMsgWords =
    convo.messages[convo.messages.length - 1].text.split(/\s+/).length;
  const totalDuration =
    delays[delays.length - 1] + Math.max(lastMsgWords * 0.15, 1.5) + 5;

  // Auto-cycle
  useEffect(() => {
    const id = setInterval(next, totalDuration * 1000);
    return () => clearInterval(id);
  }, [next, totalDuration]);

  return (
    <div
      className="rounded-xl overflow-hidden shadow-xl shadow-black/20 border border-white/[0.06]"
      style={{ background: "#313338" }}
    >
      {/* Header bar */}
      <div
        className="flex items-center gap-2.5 px-4 py-3 border-b border-white/[0.06]"
        style={{ background: "#2b2d31" }}
      >
        <JunoAvatar size={24} />
        <span className="text-sm font-semibold text-white">Juno</span>
        <div className="w-1.5 h-1.5 rounded-full bg-[#23a559]" />

        <div className="flex-1" />

        <div className="flex items-center gap-2">
          {conversations.map((_, i) => {
            const isMatch = i === conversations.length - 1;
            const active = i === index;
            return (
              <button
                key={i}
                onClick={() => switchTo(i)}
                className={`transition-all duration-200 ${
                  isMatch
                    ? "w-5 h-5 flex items-center justify-center"
                    : `w-2.5 h-2.5 rounded-full ${
                        active
                          ? "bg-white/70 scale-110"
                          : "bg-white/20 hover:bg-white/50"
                      }`
                }`}
                aria-label={isMatch ? "The match" : `Conversation ${i + 1}`}
              >
                {isMatch && (
                  <svg
                    viewBox="0 0 512 512"
                    fill="none"
                    stroke={active ? "#C084FC" : "#949ba4"}
                    strokeWidth="52"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className={`w-4 h-4 transition-all duration-200 ${
                      active ? "scale-110" : "hover:stroke-[#c8cad0]"
                    }`}
                  >
                    <path d="M235 60a21 21 0 0 1 42 0l22 118a40 40 0 0 0 32 32l118 22a21 21 0 0 1 0 42l-118 22a40 40 0 0 0-32 32l-22 118a21 21 0 0 1-42 0l-22-118a40 40 0 0 0-32-32L63 274a21 21 0 0 1 0-42l118-22a40 40 0 0 0 32-32z" />
                  </svg>
                )}
              </button>
            );
          })}
        </div>
      </div>

      {/* Messages */}
      <div
        className={`px-4 py-3 text-[13.5px] leading-[1.375rem] transition-opacity duration-400 ${
          fading ? "opacity-0" : "opacity-100"
        }`}
        key={index}
      >
        {convo.messages.map((msg, i) => (
          <div
            key={i}
            className={`chat-bubble flex gap-3 rounded-sm px-1 py-0.5 hover:bg-white/[0.02] ${
              msg.head ? "mt-3 first:mt-0" : "pl-[52px]"
            }`}
            style={{ animationDelay: `${delays[i]}s` }}
          >
            {msg.head && (
              <div className="shrink-0 pt-0.5">
                {msg.author === "juno" ? (
                  <JunoAvatar size={40} />
                ) : (
                  <div className="w-10 h-10 rounded-full bg-[#5c5f6a] flex items-center justify-center">
                    <span className="text-xs font-bold text-white/70">Y</span>
                  </div>
                )}
              </div>
            )}
            <div className="min-w-0">
              {msg.head && (
                <div className="flex items-baseline gap-2">
                  <span
                    className={`text-sm font-medium ${
                      msg.author === "juno"
                        ? "text-[#D8B4FE]"
                        : "text-[#f0b232]"
                    }`}
                  >
                    {msg.author === "juno" ? "Juno" : "you"}
                  </span>
                  <span className="text-[11px] text-[#949ba4]">
                    {msg.timestamp}
                  </span>
                </div>
              )}
              <p className="text-[#dbdee1]">{msg.text}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Input bar */}
      <div className="px-4 pb-4 pt-1">
        <div
          className="rounded-lg px-4 py-2.5 text-sm text-[#6d6f78]"
          style={{ background: "#383a40" }}
        >
          Message @Juno
        </div>
      </div>
    </div>
  );
}

/* ── Page ── */

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
      <title>Juno — AI companion that matches you with compatible people</title>
      <meta
        name="description"
        content="Talk to Juno like a friend. It learns who you are through real conversation — then matches you with someone genuinely compatible."
      />
      <link rel="canonical" href={abs("/")} />
      <meta name="robots" content="index,follow" />
      <meta
        property="og:title"
        content="Juno — AI companion that matches you with compatible people"
      />
      <meta
        property="og:description"
        content="Talk to Juno like a friend. It learns who you are through conversation — then matches you with someone compatible."
      />
      <meta property="og:url" content={abs("/")} />
      <meta property="og:type" content="website" />
      <meta name="twitter:card" content="summary_large_image" />
      <JsonLd data={orgLd} />
      <JsonLd data={siteLd} />

      <Header />

      {/* ===== HERO ===== */}
      <section
        className="relative isolate px-6 md:px-10 pt-16 md:pt-24 pb-20 md:pb-32"
        aria-labelledby="hero-heading"
      >
        <div
          className="absolute inset-0 -z-10 overflow-hidden"
          aria-hidden="true"
        >
          <div
            className="absolute top-[-20%] left-1/2 -translate-x-1/2 w-[800px] h-[600px] rounded-full opacity-[0.15] dark:opacity-[0.07]"
            style={{
              background:
                "radial-gradient(circle, rgba(168,85,247,0.8) 0%, rgba(236,72,153,0.4) 40%, transparent 70%)",
            }}
          />
        </div>

        <div className="max-w-6xl mx-auto grid lg:grid-cols-2 gap-16 lg:gap-20 items-center">
          <div>
            <h1
              id="hero-heading"
              className="text-3xl sm:text-5xl md:text-[3.5rem] font-bold tracking-tight leading-[1.1]"
            >
              An AI that actually
              <br />
              gets to know you.
              <br />
              <span className="bg-gradient-to-r from-[#A855F7] to-[#EC4899] bg-clip-text text-transparent">
                Then finds your match.
              </span>
            </h1>

            <p className="mt-6 text-lg text-muted-foreground leading-relaxed max-w-lg">
              Juno is an AI companion you talk to like a friend. Through real
              conversation it learns your values, how you connect, and what you
              actually need — not what you think you want. Then it matches you
              with someone genuinely compatible.
            </p>

            <div className="mt-8 flex flex-wrap items-center gap-3">
              <Button
                asChild
                size="lg"
                className="group text-base px-7 rounded-xl bg-[#A855F7] hover:bg-[#9333EA] text-white"
              >
                <a
                  href="https://discord.gg/ZTNRCrVc6j"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Start talking to Juno
                  <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-0.5" />
                </a>
              </Button>
              <span className="text-sm text-muted-foreground/60">
                Free on Discord — no app needed
              </span>
            </div>
          </div>

          <div className="hidden lg:block">
            <DiscordChat />
          </div>
        </div>
      </section>

      {/* Mobile chat preview */}
      <section className="lg:hidden px-6 pb-8 -mt-4">
        <DiscordChat />
      </section>

      {/* ===== THE GAP ===== */}
      <section className="py-20 md:py-28 px-6 md:px-10">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-xl md:text-3xl font-bold tracking-tight leading-snug">
            Dating apps match you without knowing you.{" "}
            <br className="hidden md:block" />
            AI companions know you without connecting you to anyone.
          </h2>

          <div className="mt-14 grid md:grid-cols-3 gap-px bg-border/40 rounded-2xl overflow-hidden">
            <div className="bg-background p-6">
              <p className="text-sm text-muted-foreground/60 mb-2">
                Dating apps
              </p>
              <p className="font-medium">Photos and bios</p>
              <p className="mt-2 text-sm text-muted-foreground">
                79% of Gen Z burned out on swiping. Predict nothing about
                compatibility. Losing subscribers every quarter.
              </p>
            </div>
            <div className="bg-background p-6">
              <p className="text-sm text-muted-foreground/60 mb-2">
                AI companions
              </p>
              <p className="font-medium">Deep talk, dead end</p>
              <p className="mt-2 text-sm text-muted-foreground">
                93 min/day average usage. Learn everything about you. Connect
                you to nobody.
              </p>
            </div>
            <div className="bg-background p-6 relative">
              <div className="absolute inset-0 bg-[#A855F7]/[0.04]" />
              <div className="relative">
                <p className="text-sm text-[#9333EA] dark:text-[#C084FC] mb-2">Juno</p>
                <p className="font-medium">Knows you, then matches you</p>
                <p className="mt-2 text-sm text-muted-foreground">
                  A companion with purpose. Conversation builds understanding.
                  Understanding powers real matches.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ===== HOW IT WORKS ===== */}
      <section className="py-20 md:py-28 px-6 md:px-10">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-2xl md:text-3xl font-bold tracking-tight">
            How it works
          </h2>
          <p className="mt-3 text-muted-foreground">
            No profiles. No quizzes. You just talk.
          </p>

          <div className="mt-12 space-y-10">
            {[
              {
                num: "01",
                title: "DM Juno on Discord",
                body: "No app, no profile, no sign-up wall. Join the server, message the bot, start talking. Juno introduces itself and covers a couple quick things — name, age, what you’re looking for. Takes about two minutes.",
              },
              {
                num: "02",
                title: "Just talk about your life",
                body: "Come back whenever. Juno picks up where you left off. It remembers what you said last week, notices patterns, forms theories about you, and has its own opinions. It feels like texting someone who’s actually paying attention.",
              },
              {
                num: "03",
                title: "Juno learns who you are — through conversation",
                body: "Through real conversation over weeks, Juno builds a deep understanding of your values, communication style, emotional patterns, and what you actually respond to vs. what you say you want. No surveys. Just talking.",
              },
              {
                num: "04",
                title: "Meet someone compatible",
                body: "When Juno knows two people well enough, it introduces them — with context. Not a profile card. More like a friend reaching out to say \"I think I found someone for you. Here’s why I think you’d work.\"",
              },
            ].map(({ num, title, body }) => (
              <div key={num} className="flex gap-5">
                <div className="shrink-0 text-sm font-medium text-muted-foreground/40 pt-1 tabular-nums">
                  {num}
                </div>
                <div>
                  <h3 className="text-lg font-semibold">{title}</h3>
                  <p className="mt-2 text-muted-foreground leading-relaxed">
                    {body}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== CTA ===== */}
      <section className="py-20 md:py-28 px-6 md:px-10">
        <div className="max-w-2xl mx-auto text-center">
          <h2 className="text-2xl md:text-3xl font-bold tracking-tight">
            Come talk to Juno
          </h2>
          <p className="mt-4 text-muted-foreground text-lg">
            It’s free. It’s on Discord. Just DM the bot and start
            talking. You’re early — and you’re helping shape what
            this becomes.
          </p>

          <div className="mt-8">
            <Button
              asChild
              size="lg"
              className="group text-base px-8 rounded-xl bg-[#A855F7] hover:bg-[#9333EA] text-white"
            >
              <a
                href="https://discord.gg/ZTNRCrVc6j"
                target="_blank"
                rel="noopener noreferrer"
              >
                <MessageSquare className="mr-2 h-5 w-5" />
                Start talking to Juno
                <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-0.5" />
              </a>
            </Button>
          </div>

          <p className="mt-6 text-sm text-muted-foreground/60">
            Not on Discord?{" "}
            <a
              href="mailto:projectjunoapp@gmail.com"
              className="underline underline-offset-4 hover:text-muted-foreground transition-colors"
            >
              projectjunoapp@gmail.com
            </a>
          </p>
        </div>
      </section>

      {/* ===== FAQ ===== */}
      <section className="py-16 md:py-20 px-6 md:px-10 border-t border-border/30">
        <div className="max-w-2xl mx-auto">
          <h2 className="text-xl font-semibold tracking-tight mb-6">
            Questions
          </h2>

          <Accordion type="single" collapsible className="w-full">
            <AccordionItem value="what">
              <AccordionTrigger>What exactly is Juno?</AccordionTrigger>
              <AccordionContent className="text-sm text-muted-foreground leading-relaxed">
                An AI companion on Discord that gets to know you through real
                conversation — your values, personality, communication
                style, what you actually need in a partner — and uses that
                understanding to match you with compatible people. Think of it
                as a matchmaker you actually talk to, not a form you fill out.
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="companion">
              <AccordionTrigger>
                What does "AI companion" mean?
              </AccordionTrigger>
              <AccordionContent className="text-sm text-muted-foreground leading-relaxed">
                Juno is someone you actually have conversations with —
                about your life, what you’re figuring out, what matters to
                you. It remembers everything, forms opinions about you, and gets
                to know you over weeks and months. The relationship is what
                makes the matching work.
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="how">
              <AccordionTrigger>How does matching work?</AccordionTrigger>
              <AccordionContent className="text-sm text-muted-foreground leading-relaxed">
                Through conversation, Juno maps your values, communication
                style, emotional patterns, and the gap between what you say you
                want and what you actually respond to. When it knows two people
                well enough, it introduces them with context — like a
                friend saying "I think I found someone for you."
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="ready">
              <AccordionTrigger>Can I get matched right now?</AccordionTrigger>
              <AccordionContent className="text-sm text-muted-foreground leading-relaxed">
                The companion side is live — you can talk to Juno today.
                The matching engine is coming next. Everything you share with
                Juno now powers your matches later. You’re getting in
                early.
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="data">
              <AccordionTrigger>What about my data?</AccordionTrigger>
              <AccordionContent className="text-sm text-muted-foreground leading-relaxed">
                Used for matching only — never sold, never shared. Each
                user’s data is completely isolated. Type{" "}
                <code className="text-xs bg-muted px-1.5 py-0.5 rounded">
                  /forgetme
                </code>{" "}
                anytime to wipe everything.
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="who">
              <AccordionTrigger>Who is this for?</AccordionTrigger>
              <AccordionContent className="text-sm text-muted-foreground leading-relaxed">
                Anyone 16+ can talk to Juno — it’s a companion you can
                have real conversations with. Matchmaking is available
                once you’re 18. If you’re younger, you can still get to
                know Juno and build your profile — you’ll be ready to
                match when the time comes.
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </div>
      </section>

      {/* ===== FOOTER ===== */}
      <footer className="py-8 px-6 md:px-10 border-t border-border/30">
        <div className="max-w-3xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4 text-sm text-muted-foreground/60">
          <p>&copy; {new Date().getFullYear()} Juno</p>
          <div className="flex gap-6">
            <Link
              to="/about"
              className="hover:text-muted-foreground transition-colors"
            >
              About
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
