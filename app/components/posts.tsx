// app/components/posts.tsx
import { formatDate, getBlogPosts } from "app/blog/utils";
import Link from "next/link";

const BLAU  = "#004D98";
const GRANA = "#A50044";

export function BlogPosts() {
  const allBlogs = getBlogPosts().sort(
    (a, b) =>
      new Date(b.metadata.publishedAt).getTime() -
      new Date(a.metadata.publishedAt).getTime()
  );

  return (
    <div className="space-y-1">
      {allBlogs.map((post, i) => {
        // Alternate accent color per post for a subtle Barça rhythm
        const accent = i % 2 === 0 ? BLAU : GRANA;

        return (
          <Link
            key={post.slug}
            href={`/blog/${post.slug}`}
            className="group flex items-center gap-4 rounded-xl border border-transparent
                       px-3 py-3 -mx-3
                       transition-all duration-200
                       hover:border-neutral-200 dark:hover:border-neutral-800
                       hover:bg-neutral-50 dark:hover:bg-neutral-900"
          >
            {/* Animated left accent bar */}
            <span
              className="h-8 w-[3px] shrink-0 rounded-full opacity-0 transition-all duration-300
                         group-hover:opacity-100 scale-y-50 group-hover:scale-y-100"
              style={{ background: accent }}
            />

            {/* Date */}
            <p className="w-24 shrink-0 text-xs tabular-nums text-neutral-400 dark:text-neutral-600 transition-colors group-hover:text-neutral-500">
              {formatDate(post.metadata.publishedAt, false)}
            </p>

            {/* Title */}
            <p className="flex-1 text-sm font-medium text-neutral-700 dark:text-neutral-300
                           transition-colors duration-200
                           group-hover:text-neutral-900 dark:group-hover:text-neutral-100">
              {post.metadata.title}
            </p>

            {/* Arrow that slides in on hover */}
            <svg
              width="10"
              height="10"
              viewBox="0 0 12 12"
              fill="none"
              className="shrink-0 opacity-0 -translate-x-1 transition-all duration-200
                         group-hover:opacity-100 group-hover:translate-x-0"
              style={{ color: accent }}
            >
              <path
                d="M2.07 11.35L.963 10.24 9.2 1.99H2.84l.014-1.535H11.844V9.46H10.296l.014-6.364L2.07 11.35z"
                fill="currentColor"
              />
            </svg>
          </Link>
        );
      })}
    </div>
  );
}
