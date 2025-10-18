import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Header from "@/components/Header";

/** Local, no-new-files helpers for consistent typography */
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
    { id: "motivation", label: "2. Motivation" },
    { id: "framework", label: "3. Conceptual Framework" },
    { id: "prototype", label: "4. Current Prototype & Direction" },
    { id: "representation", label: "5. Compatibility Representation & Vectorization" },
    { id: "priorities", label: "6. Development Priorities" },
    { id: "growth", label: "7. Growth & Ecosystem" },
    { id: "ethics", label: "8. Ethical Foundations" },
    { id: "future", label: "9. Future Development Path" },
    { id: "vision", label: "10. Vision" },
    { id: "author", label: "11. Author’s Note" },
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
              <H1>Project Juno — Beyond the Swipe</H1>
              <p className="mt-2 text-muted-foreground">
                Building dating systems that care about outcomes, not engagement.
              </p>
            </header>

            {/* Content wrapper with readable defaults; bullets enforced per-list */}
            <div className="max-w-none leading-relaxed text-sm md:text-base">
              {/* ===== 1. INTRODUCTION ===== */}
              <Section id="introduction" title="1. Introduction">
                <p className="my-2">
                  The dating landscape of the 2020s is dominated by platforms built to retain users, not connect them.
                  Modern systems reward addictive usage loops — endless swipes, dopamine cycles, and superficial metrics —
                  while providing little transparency into why matches occur or how compatibility is determined.
                </p>
                <p className="my-2">As a result:</p>
                <ul className="list-disc pl-6 space-y-1 my-2">
                  <li>Users experience decision fatigue and emotional burnout.</li>
                  <li>Matching algorithms optimize click-through rates, not successful relationships.</li>
                  <li>Trust and authenticity decline as the process feels increasingly gamified.</li>
                </ul>
                <p className="my-2">
                  <strong>Project Juno</strong> aims to correct this imbalance. It represents a shift from entertainment-focused dating
                  systems to <strong>outcome-focused matching</strong> — systems that model values, habits, and communication patterns
                  to improve the odds of real-world chemistry.
                </p>
                <BQ>“You can’t guarantee chemistry — but you can improve the odds of it happening.”</BQ>
              </Section>

              {/* ===== 2. MOTIVATION ===== */}
              <Section id="motivation" title="2. Motivation">
                <H3>2.1 The Problem with Engagement Metrics</H3>
                <p className="my-2">
                  Traditional dating apps rely on <em>time-on-app</em> and <em>swipe volume</em> as success proxies. These metrics naturally
                  create shallow behavioral loops, because engagement ≠ alignment.
                </p>
                <p className="my-2">
                  From a systems perspective, such models resemble infinite reinforcement loops with minimal negative feedback —
                  ideal for retention, harmful for relationship outcomes. They keep users trapped in activity rather than
                  guiding them toward resolution.
                </p>

                <H3>2.2 The Opportunity</H3>
                <p className="my-2">
                  Compatibility is measurable — not perfectly, but <em>usefully</em>. By combining structured data (values, lifestyle,
                  communication style) with learned behavioral correlations, it’s possible to construct compatibility vectors
                  that approximate real interpersonal alignment.
                </p>
                <p className="my-2">
                  Given enough feedback, such systems can iteratively self-correct, improving predictive accuracy over time.
                  The outcome isn’t an illusion of choice — it’s a smaller, more meaningful search space.
                </p>
              </Section>

              {/* ===== 3. CONCEPTUAL FRAMEWORK ===== */}
              <Section id="framework" title="3. Conceptual Framework">
                <H3>3.1 Compatibility vs. Attraction</H3>
                <p className="my-2">
                  Attraction is immediate — often visual, impulsive, and volatile. Compatibility is structural — it emerges
                  from shared values, communication rhythms, and lifestyle alignment.
                </p>
                <p className="my-2">
                  Juno prioritizes compatibility, treating attraction as <strong>emergent</strong>, not engineered.
                </p>

                <H3>3.2 The Compatibility Space</H3>
                <p className="my-2">Each user is represented as a position in a multidimensional trait space derived from:</p>
                <ul className="list-disc pl-6 space-y-1 my-2">
                  <li>Personality facets and contextual modifiers</li>
                  <li>Lifestyle and daily routines</li>
                  <li>Core values and deal-breakers</li>
                  <li>Communication tendencies</li>
                  <li>Relationship expectations</li>
                </ul>
                <p className="my-2">
                  Similarity between users is assessed across <strong>weighted dimensions</strong>, with weights that adapt over time through
                  outcome-based feedback. The goal is not sameness, but <strong>resonance</strong> — how two distinct lives move in parallel
                  without distortion.
                </p>
              </Section>

              {/* ===== 4. CURRENT PROTOTYPE ===== */}
              <Section id="prototype" title="4. Current Prototype & Direction">
                <p className="my-2">
                  Juno is early — a working prototype testing whether structured self-reflection can meaningfully predict
                  compatibility. The focus is clarity, not complexity. Components can evolve, but the principle stays
                  constant: model compatibility transparently, respectfully, and in human terms.
                </p>
              </Section>

              {/* ===== 5. REPRESENTATION ===== */}
              <Section id="representation" title="5. Compatibility Representation & Vectorization">
                <H3>5.1 Multilayer Representation</H3>

                {/* Table with inline, consistent styling */}
                <div className="overflow-x-auto my-2">
                  <table className="w-full border-collapse text-sm md:text-base">
                    <thead>
                      <tr className="text-left text-muted-foreground">
                        <th className="py-2 pr-4 font-semibold">Layer</th>
                        <th className="py-2 pr-0 font-semibold">Description</th>
                      </tr>
                    </thead>
                    <tbody>
                      {[
                        ["Disposition", "Temperamental baseline — how someone responds to stress and change."],
                        ["Values & Priorities", "Motivational anchors: autonomy, belonging, stability, novelty, purpose."],
                        ["Cognitive Style", "Structured vs. fluid; intuitive vs. analytical processing."],
                        ["Interpersonal Style", "Communication rhythm, empathy, and conflict approach."],
                        ["Emotional Cadence", "The tempo of emotion — how quickly someone moves between states."],
                        ["Narrative Identity", "The personal story that frames meaning and direction."],
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
                  Compatibility isn’t only proximity in this space — it’s also <strong>trajectory</strong>:
                  how two people change, and whether those directions complement each other.
                </p>

                <H3>5.2 Profile Vectorization</H3>
                <ul className="list-disc pl-6 space-y-1 my-2">
                  <li><strong>Continuous traits:</strong> normalized onto a shared scale for consistent comparison.</li>
                  <li><strong>Categorical traits:</strong> encoded as small, interpretable segments (not a single opaque score).</li>
                  <li><strong>Ranges &amp; constraints:</strong> deal-breakers define boundaries first; preferences remain explicit.</li>
                </ul>
                <p className="my-2">The goal is a common language for comparison while preserving human meaning.</p>

                <H3>5.3 Matching Through Weighted Alignment</H3>
                <div className="grid md:grid-cols-2 gap-x-8 gap-y-2 my-2">
                  <div>
                    <div className="font-medium">What gets weight</div>
                    <ul className="list-disc pl-6 space-y-1 my-1 text-muted-foreground">
                      <li>User-declared importance (values, lifestyle, emotional pace).</li>
                      <li>Principles &amp; tempo over surface-level trivia.</li>
                    </ul>
                  </div>
                  <div>
                    <div className="font-medium">What this avoids</div>
                    <ul className="list-disc pl-6 space-y-1 my-1 text-muted-foreground">
                      <li>Mirror-matching clones.</li>
                      <li>Overfitting to hobbies, aesthetics, or one-off answers.</li>
                    </ul>
                  </div>
                </div>
                <p className="my-2">Aim: matches that feel <strong>intuitively right</strong> — balanced, not forced.</p>

                <H3>5.4 How Weighting Evolves Over Time</H3>
                <ol className="list-decimal pl-6 space-y-1 my-2">
                  <li><strong>Start:</strong> use personal intent as the initial weighting (what you mark as critical).</li>
                  <li><strong>Learn:</strong> post-introduction reflections nudge weights <em>slowly</em>.</li>
                  <li><strong>Guard:</strong> never override preference; adapt within clear constraints.</li>
                </ol>

                <H3>5.5 Safeguards &amp; Principles</H3>
                <ul className="list-disc pl-6 space-y-1 my-2">
                  <li>No demographic weighting — fairness by design.</li>
                  <li>Deal-breakers enforced before any scoring.</li>
                  <li>Bounded, gradual learning to avoid drift.</li>
                  <li>Transparent objectives — users understand what the system optimizes.</li>
                </ul>
              </Section>

              {/* ===== 6. DEVELOPMENT PRIORITIES ===== */}
              <Section id="priorities" title="6. Development Priorities">
                <div className="overflow-x-auto my-2">
                  <table className="w-full border-collapse text-sm md:text-base">
                    <thead>
                      <tr className="text-left text-muted-foreground">
                        <th className="py-2 pr-4 font-semibold">Focus</th>
                        <th className="py-2 pr-4 font-semibold">Objective</th>
                        <th className="py-2 pr-0 font-semibold">Stage</th>
                      </tr>
                    </thead>
                    <tbody>
                      {[
                        ["Foundation", "Build reliable questionnaire & data capture", "Active"],
                        ["Clarity", "Create readable, narrative-style results", "In progress"],
                        ["Matching Prototype", "Surface complementary profiles via weighted alignment", "Planned"],
                        ["Feedback Loop", "Refine weighting via post-intro reflections", "Planned"],
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

              {/* ===== 7. GROWTH ===== */}
              <Section id="growth" title="7. Growth & Ecosystem">
                <p className="my-2">
                  Growth is organic — through belief, conversation, and credibility. A short <strong>“Dating Style Snapshot”</strong> offers an
                  approachable entry point; a private early community shapes the evolution. No ads or gimmicks — just shared intent.
                </p>
              </Section>

              {/* ===== 8. ETHICS ===== */}
              <Section id="ethics" title="8. Ethical Foundations">
                <ul className="list-disc pl-6 space-y-1 my-2">
                  <li><strong>Privacy &amp; Consent:</strong> Participation is opt-in; data ownership remains personal; deletion is always possible.</li>
                  <li><strong>Fairness &amp; Bias:</strong> Demographics never influence compatibility; alignment is based on values, communication, and lifestyle.</li>
                  <li><strong>Automation-First:</strong> Built to operate with minimal human mediation while staying auditable and explainable.</li>
                </ul>
              </Section>

              {/* ===== 9. FUTURE ===== */}
              <Section id="future" title="9. Future Development Path">
                <ul className="list-disc pl-6 space-y-1 my-2">
                  <li><strong>Dynamic Representations</strong> — evolving profiles that reflect growth over time.</li>
                  <li><strong>Feedback-Driven Learning</strong> — refining importance weights based on real outcomes.</li>
                  <li><strong>Temporal Compatibility</strong> — modeling how life stage and change affect alignment.</li>
                  <li><strong>Cross-Modal Signals</strong> — responsibly adding context (e.g., routine, activity tempo) to improve accuracy.</li>
                </ul>
              </Section>

              {/* ===== 10. VISION ===== */}
              <Section id="vision" title="10. Vision">
                <p className="my-2">
                  The long-term vision for Juno is simple:
                  to build a system capable of truly understanding people — how they think, live, and move through the world —
                  and using that understanding to connect them with others who complement their direction in life.
                </p>
                <p className="my-2">
                  Beyond dating, Juno represents a broader shift in how data is used — away from surveillance and advertising,
                  toward personal benefit. Data should help people make sense of themselves, their relationships, and where they belong.
                </p>
                <p className="my-2">
                  The end goal is not just compatible introductions, but <strong>meaningful alignment</strong> — where technology quietly helps people
                  find places and people that feel like home.
                </p>
              </Section>

              {/* ===== 11. AUTHOR ===== */}
              <Section id="author" title="11. Author’s Note">
                <p className="my-2">[Author’s Note coming soon]</p>
              </Section>

              <footer className="mt-10 text-sm text-muted-foreground">
                <Link to="/questionnaire" className="underline hover:no-underline">
                  Try the “Dating Style Snapshot”
                </Link>
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
