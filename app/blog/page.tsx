// app/blog/page.tsx
import { BlogPosts } from "app/components/posts";

const BLAU  = "#004D98";
const GRANA = "#A50044";

export const metadata = {
  title: "Projects & Insights",
  description:
    "Exploring the intersection of Agentic AI, Product Strategy, and Applied Mathematics.",
};

export default function Page() {
  return (
    <section className="space-y-10">

      {/* Header */}
      <div className="space-y-3">
        <p className="text-xs font-semibold uppercase tracking-widest text-neutral-400 dark:text-neutral-600">
          Projects &amp; writing
        </p>
        <div className="space-y-1">
          <h1 className="text-2xl font-bold tracking-tight text-neutral-900 dark:text-neutral-100">
            Technical Case Studies
          </h1>
          <div
            className="h-[3px] w-10 rounded-full"
            style={{ background: `linear-gradient(90deg, ${BLAU}, ${GRANA})` }}
          />
        </div>
        <p className="text-sm leading-relaxed text-neutral-500 dark:text-neutral-400 max-w-sm">
          From deploying RAG systems in Singapore to building multi-agent auditors
          — deep dives at the crossroads of engineering and product.
        </p>
      </div>

      {/* Divider */}
      <div
        className="h-px"
        style={{
          background: `linear-gradient(to right, ${BLAU}50, ${GRANA}50, transparent)`,
        }}
      />

      {/* Posts */}
      <BlogPosts />

    </section>
  );
}
