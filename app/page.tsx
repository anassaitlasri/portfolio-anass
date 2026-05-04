import { BlogPosts } from "app/components/posts";
import Image from "next/image";

const BLAU  = "#004D98";
const GRANA = "#A50044";

function Arrow() {
  return (
    <svg width="10" height="10" viewBox="0 0 12 12" fill="none">
      <path d="M2.07 11.35L.963 10.24 9.2 1.99H2.84l.014-1.535H11.844V9.46H10.296l.014-6.364L2.07 11.35z" fill="currentColor"/>
    </svg>
  );
}

function SkillRow({
  number, title, body, tags, accent, imageSrc, imageAlt,
}: {
  number: string; title: string; body: string;
  tags: string[]; accent: string;
  imageSrc?: string; imageAlt?: string;
}) {
  return (
    <div
      className="group flex items-stretch gap-0 rounded-2xl border border-neutral-200 dark:border-neutral-800
                 overflow-hidden transition-all duration-300 ease-out cursor-default
                 hover:scale-[1.015] hover:shadow-xl hover:shadow-neutral-200/50
                 dark:hover:shadow-black/40 hover:border-neutral-300 dark:hover:border-neutral-700"
    >
      <div className="w-1 shrink-0" style={{ background: accent }} />
      <div className="flex-1 bg-neutral-50 dark:bg-neutral-900 p-6">
        <div className="flex items-start gap-4">
          <span className="mt-0.5 text-xs font-bold tabular-nums" style={{ color: accent + "80" }}>
            {number}
          </span>
          <div className="space-y-2">
            <p className="text-base font-semibold text-neutral-900 dark:text-neutral-100 tracking-tight">
              {title}
            </p>
            <p className="text-sm leading-relaxed text-neutral-500 dark:text-neutral-400">
              {body}
            </p>
            <div className="flex flex-wrap gap-1.5 pt-1">
              {tags.map((t) => (
                <span key={t} className="rounded-md px-2 py-0.5 text-[11px] font-medium"
                  style={{ background: accent + "15", color: accent }}>
                  {t}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
      {imageSrc && (
        <div className="relative w-32 shrink-0 overflow-hidden bg-neutral-100 dark:bg-neutral-800">
          <Image src={imageSrc} alt={imageAlt ?? title} fill
            className="object-cover transition-transform duration-500 group-hover:scale-105"
            sizes="128px"
          />
          <div className="absolute inset-0"
            style={{ background: `linear-gradient(to right, ${accent}30, transparent)` }}
          />
        </div>
      )}
    </div>
  );
}

function MetricCard({ value, label, color }: { value: string; label: string; color: string }) {
  return (
    <div className="rounded-xl border border-neutral-200 dark:border-neutral-800
                   bg-white dark:bg-neutral-900 p-5 text-center
                   transition-all duration-300 cursor-default
                   hover:scale-[1.05] hover:shadow-md hover:shadow-neutral-200/60 dark:hover:shadow-black/40">
      <p className="text-3xl font-bold tracking-tight" style={{ color }}>{value}</p>
      <p className="mt-1.5 text-[10px] uppercase tracking-widest text-neutral-400 dark:text-neutral-600">{label}</p>
    </div>
  );
}

function PassionCard({
  imageSrc, imageAlt, height = 200,
  overlayStyle, children,
}: {
  imageSrc: string; imageAlt: string; height?: number;
  overlayStyle: React.CSSProperties;
  children: React.ReactNode;
}) {
  return (
    <div
      className="relative w-full overflow-hidden rounded-2xl border border-neutral-200 dark:border-neutral-800
                 transition-all duration-500 hover:scale-[1.015] hover:shadow-xl
                 hover:shadow-neutral-300/50 dark:hover:shadow-black/50 cursor-default"
      style={{ height }}
    >
      <Image src={imageSrc} alt={imageAlt} fill
        className="object-cover" sizes="672px"
      />
      <div className="absolute inset-0" style={overlayStyle} />
      <div className="absolute inset-0 flex flex-col justify-center px-7">
        {children}
      </div>
    </div>
  );
}

export default function Page() {
  return (
    <section className="space-y-16">

      {/* ── HERO ── */}
      <div className="flex items-center justify-between gap-8">
        <div className="flex-1 space-y-5">
          <span className="inline-flex items-center gap-1.5 text-xs text-neutral-400 dark:text-neutral-500">
            <span className="relative flex h-1.5 w-1.5">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-60"/>
              <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-emerald-400"/>
            </span>
            Junior AI Engineer · Paris / Remote
          </span>
          <div className="space-y-2">
            <h1 className="text-3xl font-bold tracking-tight text-neutral-900 dark:text-neutral-100">
              Anass Ait Lasri
            </h1>
            <div className="h-[3px] w-14 rounded-full"
              style={{ background: `linear-gradient(90deg, ${BLAU}, ${GRANA})` }}
            />
          </div>
          <p className="text-sm leading-relaxed text-neutral-500 dark:text-neutral-400">
            Product-Driven AI Engineer — specializing in moving LLM prototypes into 
            <span className="font-semibold text-neutral-800 dark:text-neutral-100"> production-ready systems.</span>
          </p>
          <div className="flex items-center gap-3">
            <a href="mailto:anass.aitlasri@gmail.com"
              className="inline-flex items-center gap-2 rounded-lg px-4 py-2 text-xs font-semibold text-white
                         transition-all duration-200 hover:opacity-90 hover:scale-[1.03] active:scale-95"
              style={{ background: `linear-gradient(135deg, ${BLAU} 0%, ${GRANA} 100%)` }}
            >
              Get in touch <Arrow />
            </a>
            <a href="https://github.com/anassaitlasri" target="_blank" rel="noreferrer"
              className="text-xs font-medium text-neutral-400 transition-colors hover:text-neutral-700 dark:hover:text-neutral-200">
              GitHub ↗
            </a>
          </div>
        </div>

        <div className="shrink-0">
          <div className="h-24 w-24 rounded-full p-[3px] transition-transform duration-500 hover:scale-105"
            style={{ background: `conic-gradient(from 200deg, ${BLAU} 0deg, ${GRANA} 160deg, ${BLAU} 360deg)` }}>
            <div className="h-full w-full overflow-hidden rounded-full bg-white dark:bg-black">
              <Image src="/profile.jpg" alt="Anass Ait Lasri" width={96} height={96} priority
                className="h-full w-full object-cover"/>
            </div>
          </div>
        </div>
      </div>

      {/* ── PHILOSOPHY ── */}
      <div className="rounded-xl p-6"
        style={{ borderLeft: `3px solid ${BLAU}`, background: `${BLAU}08` }}>
        <p className="text-sm font-semibold text-neutral-800 dark:text-neutral-100 mb-2">
          The real challenge of AI isn't just building a model—it's making it scalable and efficient.
        </p>
        <p className="text-sm leading-relaxed text-neutral-500 dark:text-neutral-400">
          I bridge the gap between engineering and business. My focus is on shipping agentic systems that work in the real world, with a strict eye on token costs, latency, and measurable ROI.
        </p>
      </div>

      {/* ── RPI METRICS ── */}
      <div className="space-y-5">
        <div className="flex items-center justify-between">
          <p className="text-xs font-semibold uppercase tracking-widest text-neutral-400 dark:text-neutral-600">
            Shipped in production (Singapore)
          </p>
          <div className="relative h-8 w-24 transition-opacity duration-200 hover:opacity-80">
            <Image src="/rpi-logo.jpg" alt="RPI Group" fill
              className="object-contain object-right" sizes="96px"/>
          </div>
        </div>
        <div className="grid grid-cols-3 gap-3">
          <MetricCard value="−40%" label="Token cost"  color={BLAU}  />
          <MetricCard value="−35%" label="p95 Latency" color={GRANA} />
          <MetricCard value=">95%" label="Accuracy"    color={BLAU}  />
        </div>
        <p className="text-xs text-neutral-400 dark:text-neutral-600 leading-relaxed">
          RPI AI Pulse health assistant · LangGraph orchestration · async processing · Mistral OCR
        </p>
      </div>

      {/* ── FOCUS AREAS ── */}
      <div className="space-y-3">
        <p className="text-xs font-semibold uppercase tracking-widest text-neutral-400 dark:text-neutral-600">
          Focus areas
        </p>
        <div className="space-y-3">
          <SkillRow number="01" title="Agentic Systems & RAG"
            body="Engineering cyclical, multi-agent workflows with LangGraph. I focus on building reliable retrieval-augmented pipelines with strict observability using LangSmith."
            tags={["LangGraph", "LangSmith", "RAG", "FAISS"]}
            accent={BLAU}
          />
          <SkillRow number="02" title="LLMOps & Performance"
            body="Optimizing the transition from POC to production. I specialize in reducing operational overhead through prompt engineering, async processing, and LLM benchmarking."
            tags={["Python", "FastAPI", "Docker", "AWS"]}
            accent={GRANA}
          />
          <SkillRow number="03" title="Product Mindset"
            body="Translating business requirements into technical specs. I enjoy analyzing the bigger picture to ensure that every technical trade-off serves the final product goal."
            tags={["ROI Optimization", "Benchmarking", "User Feedback"]}
            accent={BLAU}
          />
        </div>
      </div>

      {/* ── PASSIONS ── */}
      <div className="space-y-4">
        <p className="text-xs font-semibold uppercase tracking-widest text-neutral-400 dark:text-neutral-600">
          Outside the terminal
        </p>

        <PassionCard
          imageSrc="/barcelona.jpg"
          imageAlt="FC Barcelona"
          height={180}
          overlayStyle={{
            background: `linear-gradient(135deg, rgba(0,77,152,0.85) 0%, rgba(165,0,68,0.78) 100%)`,
          }}
        >
          <p className="text-xl font-bold text-white tracking-tight">FC Barcelona & Tactics</p>
          <p className="mt-2 text-xs text-white/80 max-w-sm leading-relaxed">
            Huge fan of the "Juego de Posición". I'm fascinated by how tactical intelligence, spacing, and possession translate into winning strategies on the pitch.
          </p>
        </PassionCard>

        <PassionCard
          imageSrc="/japan.jpg"
          imageAlt="Japan"
          height={180}
          overlayStyle={{
            background: "linear-gradient(to top, rgba(0,0,0,0.85) 0%, rgba(0,0,0,0.2) 60%, transparent 100%)",
          }}
        >
          <div className="absolute bottom-0 left-0 right-0 p-6">
            <p className="text-lg font-bold text-white">Asia & Global Tech</p>
            <p className="mt-1 text-xs text-white/80 max-w-sm leading-relaxed">
              My experience in Singapore and Malaysia sparked a deep interest in Asian tech ecosystems. I love traveling and discovering how different parts of the world innovate.
            </p>
          </div>
        </PassionCard>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <PassionCard
            imageSrc="/maths.jpg" 
            imageAlt="Applied Mathematics"
            height={160}
            overlayStyle={{
              background: "linear-gradient(135deg, rgba(15,23,42,0.9) 0%, rgba(30,41,59,0.7) 100%)",
            }}
          >
            <p className="text-lg font-bold text-white tracking-tight">Applied Math & ML</p>
            <p className="mt-2 text-xs text-white/80 max-w-xs leading-relaxed">
              With an Engineering degree in Applied Mathematics, I love the logic and algorithms behind the magic of Machine Learning.
            </p>
          </PassionCard>

          <PassionCard
            imageSrc="/chess.jpg"
            imageAlt="Chess"
            height={160}
            overlayStyle={{
              background: "linear-gradient(135deg, rgba(20,20,20,0.9) 0%, rgba(50,50,50,0.7) 100%)",
            }}
          >
            <p className="text-lg font-bold text-white tracking-tight">Chess</p>
            <p className="mt-2 text-xs text-white/80 max-w-xs leading-relaxed">
              A strategic hobby that keeps me thinking steps ahead. It's about finding the best move under constraints.
            </p>
          </PassionCard>
        </div>
      </div>

      {/* ── DIVIDER ── */}
      <div className="h-px"
        style={{ background: `linear-gradient(to right, ${BLAU}70, ${GRANA}70, transparent)` }}
      />

      {/* ── PROJECTS ── */}
      <div className="space-y-4 pb-4">
        <p className="text-xs font-semibold uppercase tracking-widest text-neutral-400 dark:text-neutral-600">
          Technical Case Studies
        </p>
        <BlogPosts />
      </div>

    </section>
  );
}