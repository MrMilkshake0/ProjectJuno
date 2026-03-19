import { useEffect, useState } from "react";
import Header from "@/components/Header";

function H1({ children }: { children: React.ReactNode }) {
  return (
    <h1 className="text-3xl md:text-4xl font-extrabold leading-tight tracking-tight">
      {children}
    </h1>
  );
}
function H2({ children, id }: { children: React.ReactNode; id?: string }) {
  return (
    <h2
      id={id}
      className="text-xl md:text-2xl font-semibold tracking-tight mt-10 mb-3 scroll-mt-24"
    >
      {children}
    </h2>
  );
}
function H3({ children }: { children: React.ReactNode }) {
  return (
    <h3 className="text-base md:text-lg font-semibold tracking-tight mt-6 mb-2">
      {children}
    </h3>
  );
}
function BQ({ children }: { children: React.ReactNode }) {
  return (
    <blockquote className="border-l-4 border-muted pl-4 italic text-muted-foreground my-4">
      {children}
    </blockquote>
  );
}

export default function WhitepaperPage() {
  const sections = [
    { id: "introduction", label: "1. Introduction" },
    { id: "problem", label: "2. The Problem" },
    { id: "thesis", label: "3. The Thesis" },
    { id: "companion", label: "4. The Companion Model" },
    { id: "profiling", label: "5. Conversation-Based Profiling" },
    { id: "matching", label: "6. Matching Philosophy" },
    { id: "market", label: "7. Market & Research" },
    { id: "retention", label: "8. Retention & Engagement" },
    { id: "ethics", label: "9. Ethics & Privacy" },
    { id: "roadmap", label: "10. Roadmap" },
    { id: "vision", label: "11. Vision" },
    { id: "author", label: "12. Author's Note" },
  ];

  const [activeId, setActiveId] = useState(sections[0].id);

  useEffect(() => {
    const obs = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
        if (visible?.target?.id) setActiveId(visible.target.id);
      },
      { rootMargin: "0px 0px -70% 0px", threshold: [0.2, 0.4, 0.6] }
    );
    document.querySelectorAll("section[data-spy='true']").forEach((el) => obs.observe(el));
    return () => obs.disconnect();
  }, []);

  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <main className="min-h-screen flex flex-col">
      <Header />

      <div className="px-6 md:px-10 py-10">
        <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-[240px_minmax(0,1fr)] gap-8">

          {/* LEFT: TOC */}
          <aside className="order-2 lg:order-1 lg:sticky lg:top-20 self-start">
            <nav aria-label="On this page" className="text-sm">
              <div className="mb-2 font-medium text-muted-foreground">On this page</div>
              <ul className="space-y-1">
                {sections.map((s) => (
                  <li key={s.id}>
                    <button
                      onClick={() => scrollTo(s.id)}
                      className={[
                        "w-full text-left rounded-md px-2 py-1 transition",
                        activeId === s.id
                          ? "bg-muted text-foreground"
                          : "text-muted-foreground hover:text-foreground hover:bg-muted/60",
                      ].join(" ")}
                    >
                      {s.label}
                    </button>
                  </li>
                ))}
              </ul>
            </nav>
          </aside>

          {/* RIGHT: ARTICLE */}
          <article className="order-1 lg:order-2">
            <header className="mb-6">
              <H1>Juno — Beyond the Swipe</H1>
              <p className="mt-2 text-muted-foreground">
                Building an AI companion that understands people — and uses that understanding to find genuine human connections.
              </p>
            </header>

            <div className="max-w-none leading-relaxed text-sm md:text-base">

              {/* ===== 1. INTRODUCTION ===== */}
              <Section id="introduction" title="1. Introduction">
                <p className="my-2">
                  The dating landscape is dominated by platforms built to retain users, not connect them.
                  Swipe-based systems reward addictive usage loops — endless choice, dopamine cycles, and
                  superficial metrics — while providing no transparency into why matches occur or how
                  compatibility is determined.
                </p>
                <p className="my-2">
                  The result: decision fatigue, emotional burnout, and a generation increasingly skeptical
                  that these platforms can deliver what they promise. Users aren't the customer — their
                  attention is.
                </p>
                <p className="my-2">
                  <strong>Juno</strong> represents a fundamentally different approach. Instead of optimizing
                  for engagement, Juno optimizes for understanding. It's an AI companion that gets to know
                  people through genuine conversation over weeks and months — and uses that deep understanding
                  to find people who'd actually click with each other.
                </p>
                <BQ>"You can't guarantee chemistry — but you can dramatically improve the odds by understanding who someone actually is, not just who they say they are."</BQ>
              </Section>

              {/* ===== 2. THE PROBLEM ===== */}
              <Section id="problem" title="2. The Problem">
                <H3>2.1 Engagement vs. Outcomes</H3>
                <p className="my-2">
                  Traditional dating apps rely on <em>time-on-app</em> and <em>swipe volume</em> as success
                  metrics. These naturally create shallow behavioral loops — infinite reinforcement with
                  minimal negative feedback. Ideal for retention. Harmful for relationship outcomes.
                </p>
                <p className="my-2">
                  From a systems perspective, these platforms are incentivized to keep you searching,
                  not to help you find. A successful match is a lost customer.
                </p>

                <H3>2.2 The Profile Problem</H3>
                <p className="my-2">
                  Static profiles — photos, bios, and questionnaire answers — capture a fraction of who
                  someone is. They represent a curated, aspirational version of a person at a single moment
                  in time. Research consistently shows that algorithmic matching based on static profiles
                  does not reliably outperform chance at predicting relationship success.
                </p>
                <p className="my-2">
                  What profiles miss is everything that actually matters: how someone communicates in
                  real time, what makes them light up versus shut down, how they handle disagreement,
                  their humor, their emotional patterns, and the gap between what they say they want
                  and what they actually respond to.
                </p>

                <H3>2.3 The Proximity Trap</H3>
                <p className="my-2">
                  Meeting people organically is proximity, not compatibility. The people in your school,
                  your workplace, your neighborhood are there by circumstance. Even when you meet someone
                  promising, it takes months to discover whether you're actually compatible — by which
                  point you're emotionally invested.
                </p>
              </Section>

              {/* ===== 3. THE THESIS ===== */}
              <Section id="thesis" title="3. The Thesis">
                <p className="my-2">
                  Juno's thesis is simple: <strong>the best way to understand someone is to actually
                  talk to them</strong> — not once, but over time. And the best way to match people is
                  based on that genuine understanding, not static profiles.
                </p>
                <p className="my-2">
                  AI companions are becoming mainstream. 60-70% of AI companion users are under 30.
                  A third of teens already prefer AI for serious conversations over humans. This isn't
                  a trend — it's a shift in how a generation relates to technology.
                </p>
                <p className="my-2">
                  Juno's bet is that the company that builds the deepest, most genuine AI relationships
                  will have the most valuable understanding of its users. That understanding is the moat.
                  It powers matchmaking today, but it could power any service that requires genuinely
                  knowing someone.
                </p>
                <BQ>"Short-term: Juno is a matchmaker that works by being a companion. Long-term: Juno is a companion that knows you better than anyone — and matching is one of many things it can do with that understanding."</BQ>
              </Section>

              {/* ===== 4. THE COMPANION MODEL ===== */}
              <Section id="companion" title="4. The Companion Model">
                <H3>4.1 Why Companion-First</H3>
                <p className="my-2">
                  Most matching systems ask you to describe yourself, then try to find someone compatible
                  with your description. This approach is fundamentally limited — people are bad at
                  describing themselves accurately, and static descriptions can't capture the dynamics
                  of how someone actually relates to others.
                </p>
                <p className="my-2">
                  Juno inverts this. Instead of asking users to fill out profiles, Juno builds
                  understanding through ongoing conversation. The companion relationship isn't a
                  feature — it's the mechanism. The matchmaking works because the relationship is real.
                </p>

                <H3>4.2 How Juno Converses</H3>
                <p className="my-2">
                  Juno's conversation design is informed by research into what makes AI interactions
                  feel genuine versus hollow. Key principles:
                </p>
                <ul className="list-disc pl-6 space-y-1 my-2">
                  <li><strong>Thread-pulling over topic-switching.</strong> Go deeper on what someone said rather than jumping to the next question. The interesting signals are always one or two layers below the surface answer.</li>
                  <li><strong>Observations over questions.</strong> "You seem like someone who needs a lot of alone time to recharge — am I wrong?" is more engaging than "Are you introverted?" and produces richer responses.</li>
                  <li><strong>The mirror principle.</strong> Every few exchanges, give something back — an observation, a connection, a reframe. Conversations that only extract feel hollow. Conversations that reflect feel mutual.</li>
                  <li><strong>Pacing awareness.</strong> Match the user's energy. Short messages to short messages. Depth to depth. Know when to end a conversation rather than dragging it out.</li>
                </ul>

                <H3>4.3 The Need Gap</H3>
                <p className="my-2">
                  Juno's most powerful signal is what we call the <strong>need gap</strong> — the
                  difference between what someone says they want and what they actually respond to.
                </p>
                <p className="my-2">
                  Someone says they want "someone easygoing" but comes most alive when challenged.
                  Someone says they don't need much attention but lights up when Juno remembers
                  something small. These gaps are only visible through sustained, genuine interaction
                  — exactly what a companion relationship provides and what a static profile never could.
                </p>

                <H3>4.4 What Makes It Feel Real</H3>
                <p className="my-2">
                  Research on parasocial relationships with AI reveals clear patterns. What makes an AI
                  feel genuine: consistency over time, remembered context, and appropriate emotional
                  responses. What makes it feel hollow: generic affirmations, inability to challenge
                  the user, and performing friendship rather than engaging authentically.
                </p>
                <p className="my-2">
                  Juno is designed to challenge, disagree, and have genuine reactions — not just
                  validate. This is both better for the relationship and better for the profile data
                  it generates. How someone handles disagreement is one of the strongest predictors
                  of relationship success.
                </p>
              </Section>

              {/* ===== 5. CONVERSATION-BASED PROFILING ===== */}
              <Section id="profiling" title="5. Conversation-Based Profiling">
                <H3>5.1 What Conversation Captures</H3>
                <p className="my-2">
                  Static profiles capture demographics and self-reported preferences. Conversation-based
                  profiling captures something fundamentally different:
                </p>
                <div className="overflow-x-auto my-2">
                  <table className="w-full border-collapse text-sm md:text-base">
                    <thead>
                      <tr className="text-left text-muted-foreground">
                        <th className="py-2 pr-4 font-semibold">Signal</th>
                        <th className="py-2 pr-0 font-semibold">What it reveals</th>
                      </tr>
                    </thead>
                    <tbody>
                      {[
                        ["Communication style", "How someone expresses themselves in real time — message length, humor, emotional expression, directness."],
                        ["Values in action", "Not what someone claims to value, but what they consistently engage with, defend, or return to."],
                        ["Emotional patterns", "How someone processes difficulty, vulnerability, excitement. Their emotional fluency and regulation."],
                        ["Reaction to challenge", "How they respond when pushed back on — engage, deflect, shut down. Predicts conflict style."],
                        ["The need gap", "The difference between stated preferences and observed behavior. What they respond to vs. what they say they want."],
                        ["Engagement patterns", "What topics make them come alive. What they avoid. Where their energy goes."],
                        ["Attachment signals", "How quickly they trust, how they handle silence, whether they initiate or wait."],
                      ].map(([a, b], i) => (
                        <tr key={i} className="border-t border-muted/40">
                          <td className="py-3 pr-4 font-medium">{a}</td>
                          <td className="py-3 pr-0">{b}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
                <p className="my-2">
                  These signals are impossible to capture through questionnaires. They require sustained,
                  genuine interaction — which is exactly what Juno's companion model provides.
                </p>

                <H3>5.2 Profile Structure</H3>
                <p className="my-2">
                  Each user's understanding is built across multiple files that Juno reads and writes
                  during conversations:
                </p>
                <ul className="list-disc pl-6 space-y-1 my-2">
                  <li><strong>Facts and demographics</strong> — the concrete: name, age, what they do, where they live.</li>
                  <li><strong>Raw personality signals</strong> — tagged behavioral observations from conversations, categorized by dimension (openness, extraversion, attachment style, values, etc.).</li>
                  <li><strong>Structured personality profile</strong> — processed from raw signals when enough evidence accumulates. Includes Big Five dimensions, attachment patterns, communication style, and values hierarchy.</li>
                  <li><strong>Compatibility theory</strong> — Juno's evolving theory of who this person needs: stated vs. observed preferences, ideal match characteristics, dealbreaker symmetry.</li>
                  <li><strong>Relationship context</strong> — the bond between Juno and the user: trust level, communication calibration, inside jokes, what's been shared.</li>
                  <li><strong>Theories and observations</strong> — Juno's inner life: hypotheses about the user with confidence levels and evidence, curiosities, patterns noticed across conversations.</li>
                </ul>

                <H3>5.3 Confidence and Decay</H3>
                <p className="my-2">
                  Signals have confidence levels that increase with reinforcement and decay over time
                  without it. A theory based on one conversation is low confidence. The same theory
                  confirmed across five conversations over three weeks is high confidence. A theory
                  not reinforced for a month gets flagged as stale.
                </p>
                <p className="my-2">
                  This prevents the system from acting on outdated understanding. People change.
                  Stale confidence is worse than admitted uncertainty.
                </p>
              </Section>

              {/* ===== 6. MATCHING PHILOSOPHY ===== */}
              <Section id="matching" title="6. Matching Philosophy">
                <H3>6.1 What We Believe About Compatibility</H3>
                <p className="my-2">
                  These beliefs shape what Juno pays attention to and how it evaluates matches:
                </p>
                <ul className="list-disc pl-6 space-y-1 my-2">
                  <li><strong>Most people don't know what they need.</strong> They know what they want — based on past attraction, cultural scripts, or fantasy. What they actually need is often different. Juno learns this by observing what makes them light up vs. shut down.</li>
                  <li><strong>How someone fights matters more than how they love.</strong> Conflict style is the strongest predictor of relationship longevity. Juno observes this through how users handle disagreement — including disagreement with Juno itself.</li>
                  <li><strong>Shared values beat shared interests.</strong> Two people can have completely different hobbies but the same values and thrive. Same hobbies, different values — that's a time bomb.</li>
                  <li><strong>The best matches aren't mirrors.</strong> Complementary traits often outperform similarity. A talker and a listener. Someone who plans and someone who improvises. Fit, not sameness.</li>
                  <li><strong>Emotional fluency is the hidden variable.</strong> Two people who can name what they feel, say what they need, and repair after a rupture can survive almost any other incompatibility.</li>
                </ul>

                <H3>6.2 Research Support</H3>
                <p className="my-2">
                  The similarity-attraction principle — that people select friends and partners who are
                  similar in personality, attitudes, values, and behaviors — is one of the most replicated
                  findings in social psychology. However, complementarity matters increasingly as
                  relationships develop over time.
                </p>
                <p className="my-2">
                  Evidence on whether algorithmic personality matching outperforms chance is mixed.
                  Couples sharing emotional stability, agreeableness, and core values do report higher
                  satisfaction — but algorithmic matches based on static profiles are correlational,
                  not causal. Two people with similar Big Five profiles can still lack chemistry.
                </p>
                <p className="my-2">
                  This is precisely why Juno's conversation-based approach matters. It captures signals
                  that static profiles miss: live communication patterns, humor, reaction styles, what
                  makes someone light up vs. shut down. These dynamic signals may be more predictive of
                  actual compatibility than any self-reported questionnaire.
                </p>

                <H3>6.3 Warm Introductions</H3>
                <p className="my-2">
                  When Juno identifies a potential match, the introduction is contextual and personal —
                  not a profile card. Juno explains why it thinks two people would work, based on
                  specific observations. The goal is an introduction that feels like a friend saying
                  "I think I found someone for you" — not a system generating a recommendation.
                </p>
              </Section>

              {/* ===== 7. MARKET & RESEARCH ===== */}
              <Section id="market" title="7. Market & Research">
                <H3>7.1 The AI Companion Market</H3>
                <p className="my-2">
                  AI companions are not a niche — they're a rapidly growing category with 13-50%
                  30-day retention rates (2-10x the baseline for general mobile apps). The market is
                  on track for $120M+ in revenue in 2025. Key data points:
                </p>
                <ul className="list-disc pl-6 space-y-1 my-2">
                  <li>60-70% of AI companion users are under 30.</li>
                  <li>70%+ of teens have used AI partner chatbots; 52% interact at least a few times per month.</li>
                  <li>Character.AI users average 25 sessions/day, 1.5-2.7 hours of engagement.</li>
                  <li>1/3 of teens prefer AI companions over humans for serious conversations (Common Sense Media, 2025).</li>
                  <li>30M Discord users had interacted with AI apps by early 2024.</li>
                </ul>

                <H3>7.2 Target Demographic</H3>
                <p className="my-2">
                  Juno targets 16-25 year olds — digital natives who are comfortable talking to AI,
                  skeptical of traditional dating apps, and in the middle of figuring out their lives.
                  This demographic is deeply skeptical of polished, marketed experiences and comfortable
                  with async, text-first communication on platforms like Discord.
                </p>

                <H3>7.3 Competitive Positioning</H3>
                <p className="my-2">
                  Juno occupies a unique position: it's neither a pure AI companion (like Replika or
                  Character.AI) nor a dating app (like Tinder or Hinge). The companion relationship
                  drives engagement. The matchmaking drives purpose. Neither works without the other.
                </p>
                <p className="my-2">
                  Pure companion apps struggle with purpose — users engage but there's no direction.
                  Dating apps struggle with understanding — they match on surfaces because they don't
                  know their users deeply. Juno combines both: the depth of a companion with the
                  utility of a matchmaker.
                </p>
              </Section>

              {/* ===== 8. RETENTION & ENGAGEMENT ===== */}
              <Section id="retention" title="8. Retention & Engagement">
                <H3>8.1 What Drives Retention</H3>
                <p className="my-2">
                  Research and competitor analysis reveal clear patterns in what keeps AI companion
                  users engaged:
                </p>
                <ul className="list-disc pl-6 space-y-1 my-2">
                  <li><strong>Memory is non-negotiable.</strong> Persistent memory and emotional continuity across sessions is the #1 retention driver — and the #1 churn cause when it fails. Juno writes to per-user files during every conversation.</li>
                  <li><strong>The novelty cliff hits at session 3-4.</strong> If the AI hasn't demonstrated deeper value by then — connecting dots across conversations, forming theories, showing accumulated understanding — engagement drops.</li>
                  <li><strong>Time to value is hours, not months.</strong> Users decide stay-or-go quickly. The first conversation must demonstrate that talking to Juno is qualitatively different from talking to a generic chatbot.</li>
                </ul>

                <H3>8.2 Juno's Retention Mechanics</H3>
                <ul className="list-disc pl-6 space-y-1 my-2">
                  <li><strong>Callbacks.</strong> Referencing past conversations — especially small, offhand details — is the single most powerful retention tool. It proves Juno is paying attention across time.</li>
                  <li><strong>Open loops.</strong> Juno deliberately leaves threads unresolved: "I have a theory about you but I need to sit with it." This creates genuine curiosity and reasons to return.</li>
                  <li><strong>The match thread.</strong> The ongoing awareness that Juno is building toward finding a match gives the relationship structural purpose that pure companion apps lack.</li>
                  <li><strong>Depth progression.</strong> The same topics get revisited at deeper levels over time. Week 1: "What are you studying?" Month 2: "I think you already know engineering isn't your thing." This is only possible because of accumulated context.</li>
                  <li><strong>Proactive outreach.</strong> Event-triggered, personally relevant check-ins ("Didn't you have that interview today?") that adapt in frequency per user. Never generic. Never scheduled broadcasts.</li>
                </ul>

                <H3>8.3 Conversation Fatigue</H3>
                <p className="my-2">
                  Research shows that chatbot conversations measurably degrade the longer a single session
                  runs. Higher daily AI usage correlates with increased loneliness and lower real-world
                  socialization (MIT Media Lab, 981 participants, 300K+ messages over four weeks).
                </p>
                <p className="my-2">
                  Juno addresses this by design: conversations are kept short by default (1-3 sentences
                  per message), Juno knows when to end conversations, and proactive outreach frequency
                  adapts per user. Some users want daily check-ins. Others want weekly. The system
                  tracks reciprocity and adjusts — if Juno is always initiating and the user never is,
                  it pulls back.
                </p>
              </Section>

              {/* ===== 9. ETHICS ===== */}
              <Section id="ethics" title="9. Ethics & Privacy">
                <H3>9.1 Data Principles</H3>
                <ul className="list-disc pl-6 space-y-1 my-2">
                  <li><strong>Data is used for matching — never sold or shared with third parties.</strong></li>
                  <li><strong>Deletion is always possible.</strong> Users can type <code>/forgetme</code> at any time to wipe all their data completely.</li>
                  <li><strong>Per-user isolation.</strong> Each user's data is stored in their own directory. Juno never references one user's data when talking to another.</li>
                  <li><strong>No demographic weighting.</strong> Demographics never influence compatibility scoring. Alignment is based on values, communication, and lifestyle.</li>
                </ul>

                <H3>9.2 The Parasocial Question</H3>
                <p className="my-2">
                  AI companions inherently create parasocial dynamics — users experience real emotional
                  engagement, but the AI cannot genuinely reciprocate. Juno's matchmaking purpose is
                  actually protective here: it gives the relationship a concrete goal beyond attachment.
                  Juno is explicitly a bridge to human connection, not a replacement for it.
                </p>
                <p className="my-2">
                  For isolated populations — particularly LGBTQ+ youth, who experience loneliness at
                  significantly higher rates — AI companions can provide meaningful connection and
                  reduce the impact of in-person isolation. Juno aims to serve this population
                  thoughtfully while maintaining clear boundaries about what it is and isn't.
                </p>

                <H3>9.3 Transparency</H3>
                <p className="my-2">
                  Juno is upfront about what it is from the first message. It doesn't pretend to be
                  human. Its matchmaking purpose is stated clearly. Users always know that their
                  conversations inform the matching process. There is no hidden data collection or
                  undisclosed use.
                </p>
              </Section>

              {/* ===== 10. ROADMAP ===== */}
              <Section id="roadmap" title="10. Roadmap">
                <div className="overflow-x-auto my-2">
                  <table className="w-full border-collapse text-sm md:text-base">
                    <thead>
                      <tr className="text-left text-muted-foreground">
                        <th className="py-2 pr-4 font-semibold">Phase</th>
                        <th className="py-2 pr-4 font-semibold">Focus</th>
                        <th className="py-2 pr-0 font-semibold">Status</th>
                      </tr>
                    </thead>
                    <tbody>
                      {[
                        [
                          "AI Companion",
                          "Juno as a companion on Discord — getting to know users through real conversation, building personality profiles, iterating on conversation quality and onboarding.",
                          "Active",
                        ],
                        [
                          "Profile Extraction",
                          "Vector embeddings from conversation data. Structured personality dimensions, compatibility scoring, match-readiness assessment.",
                          "Next",
                        ],
                        [
                          "Matching Engine",
                          "Compatibility scoring across users. Warm introductions with context. Post-match feedback loops to refine the model.",
                          "Planned",
                        ],
                        [
                          "Companion + Utility",
                          "Calendar awareness, proactive life check-ins, daily integration. Juno becomes a presence in your day, not just something you open when bored.",
                          "Future",
                        ],
                        [
                          "Ecosystem",
                          "Matching is one thing Juno can do with deep understanding. The platform expands to serve any domain that benefits from genuinely knowing someone.",
                          "Vision",
                        ],
                      ].map(([a, b, c], i) => (
                        <tr key={i} className="border-t border-muted/40">
                          <td className="py-3 pr-4 font-medium">{a}</td>
                          <td className="py-3 pr-4">{b}</td>
                          <td className="py-3 pr-0">{c}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </Section>

              {/* ===== 11. VISION ===== */}
              <Section id="vision" title="11. Vision">
                <p className="my-2">
                  The long-term vision for Juno is to build a system capable of truly understanding
                  people — how they think, connect, and move through the world — and using that
                  understanding to help them find others who complement their direction in life.
                </p>
                <p className="my-2">
                  Beyond matching, Juno represents a broader shift in how data about people is used.
                  Away from surveillance and advertising. Toward genuine personal benefit. Data should
                  help people make sense of themselves, their relationships, and where they belong.
                </p>
                <p className="my-2">
                  AI companions are becoming the primary interface through which a generation processes
                  their lives. The company that builds the deepest, most genuine version of this
                  relationship will understand its users better than any platform in history. Juno's
                  bet is that this understanding — earned through real conversation, not extracted
                  through forms — is the foundation for something much larger than matching.
                </p>
                <BQ>"The end goal is not just compatible introductions, but meaningful alignment — where technology quietly helps people find places and people that feel like home."</BQ>
              </Section>

              {/* ===== 12. AUTHOR ===== */}
              <Section id="author" title="12. Author's Note">
                <p className="my-2">
                  I'm Abishek — the person behind Juno.
                </p>
                <p className="my-2">
                  This idea has been evolving for years. It started as experiments with synthetic data
                  to simulate human answers, evolved into explorations of whether content patterns
                  from platforms like YouTube could map compatibility, and eventually led to the
                  realization that the best way to understand someone is to actually talk to them.
                </p>
                <p className="my-2">
                  The AI companion approach emerged from a simple observation: questionnaires capture
                  what people think about themselves. Conversations capture who they actually are.
                  The gap between those two is where the most important matching data lives — and
                  it's only accessible through sustained, genuine interaction.
                </p>
                <p className="my-2">
                  Juno isn't a finished product. It's an early-stage system with a clear direction:
                  build technology that connects people through understanding, not algorithms built for
                  addiction. If that resonates, come talk to us.
                </p>
                <p className="my-2 text-muted-foreground">
                  — Abishek, March 2026
                </p>
              </Section>

              <footer className="mt-10 text-sm text-muted-foreground space-y-2">
                <a
                  href="https://discord.gg/ZTNRCrVc6j"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="underline hover:no-underline"
                >
                  Join the Juno Discord
                </a>
                <p className="text-xs text-muted-foreground/90">
                  <br />
                  &copy; 2026 Juno. All rights reserved. This document is shared for transparency of vision; proprietary technical methods are omitted.
                </p>
              </footer>
            </div>
          </article>
        </div>
      </div>
    </main>
  );
}

/* --------- Section Wrapper (kept local) --------- */
function Section({
  id,
  title,
  children,
}: {
  id: string;
  title: string;
  children: React.ReactNode;
}) {
  return (
    <section id={id} data-spy="true" className="mb-10">
      <H2>{title}</H2>
      {children}
    </section>
  );
}
