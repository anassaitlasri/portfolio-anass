// app/blog/[slug]/page.tsx
import { formatDate, getBlogPosts } from 'app/blog/utils'
import { CustomMDX } from 'app/components/mdx'
import { baseUrl } from 'app/sitemap'
import { notFound } from 'next/navigation'

const BLAU  = "#004D98"
const GRANA = "#A50044"

// ── Next.js 15: params is now a Promise ──────────────────────────────────────

export async function generateStaticParams() {
  const posts = getBlogPosts()
  return posts.map((post) => ({ slug: post.slug }))
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  const post = getBlogPosts().find((post) => post.slug === slug)
  if (!post) return

  const { title, publishedAt: publishedTime, summary: description, image } = post.metadata
  const ogImage = image ? image : `${baseUrl}/og?title=${encodeURIComponent(title)}`

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      type: 'article',
      publishedTime,
      url: `${baseUrl}/blog/${post.slug}`,
      images: [{ url: ogImage }],
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: [ogImage],
    },
  }
}

// ── Page component ────────────────────────────────────────────────────────────

export default async function Blog({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  const post = getBlogPosts().find((post) => post.slug === slug)

  if (!post) notFound()

  return (
    <section className="space-y-8">

      {/* ── JSON-LD structured data ── */}
      <script
        type="application/ld+json"
        suppressHydrationWarning
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'BlogPosting',
            headline: post.metadata.title,
            datePublished: post.metadata.publishedAt,
            dateModified: post.metadata.publishedAt,
            description: post.metadata.summary,
            image: post.metadata.image
              ? `${baseUrl}${post.metadata.image}`
              : `/og?title=${encodeURIComponent(post.metadata.title)}`,
            url: `${baseUrl}/blog/${post.slug}`,
            author: {
              '@type': 'Person',
              name: 'Anass Ait Lasri',
            },
          }),
        }}
      />

      {/* ── Article header ── */}
      <header className="space-y-4">
        {/* Label */}
        <p className="text-xs font-semibold uppercase tracking-widest text-neutral-400 dark:text-neutral-600">
          Case study
        </p>

        {/* Title */}
        <h1 className="text-2xl font-bold tracking-tight text-neutral-900 dark:text-neutral-100 leading-snug">
          {post.metadata.title}
        </h1>

        {/* Barça accent bar */}
        <div
          className="h-[3px] w-12 rounded-full"
          style={{ background: `linear-gradient(90deg, ${BLAU}, ${GRANA})` }}
        />

        {/* Summary */}
        {post.metadata.summary && (
          <p className="text-sm leading-relaxed text-neutral-500 dark:text-neutral-400 max-w-xl">
            {post.metadata.summary}
          </p>
        )}

        {/* Meta row: date + read time estimate */}
        <div className="flex items-center gap-3 pt-1">
          <time className="text-xs text-neutral-400 dark:text-neutral-600 tabular-nums">
            {formatDate(post.metadata.publishedAt)}
          </time>
          <span className="text-neutral-200 dark:text-neutral-800">·</span>
          <span className="text-xs text-neutral-400 dark:text-neutral-600">
            {Math.ceil(post.content.split(/\s+/).length / 200)} min read
          </span>
        </div>
      </header>

      {/* ── Divider ── */}
      <div
        className="h-px"
        style={{
          background: `linear-gradient(to right, ${BLAU}60, ${GRANA}60, transparent)`,
        }}
      />

      {/* ── Article body ── */}
      <article className="prose prose-neutral dark:prose-invert
                          prose-headings:font-semibold prose-headings:tracking-tight
                          prose-h2:text-lg prose-h2:mt-10 prose-h2:mb-3
                          prose-h3:text-base prose-h3:mt-8 prose-h3:mb-2
                          prose-p:text-sm prose-p:leading-relaxed prose-p:text-neutral-600 dark:prose-p:text-neutral-400
                          prose-strong:text-neutral-800 dark:prose-strong:text-neutral-200 prose-strong:font-semibold
                          prose-a:text-blue-600 dark:prose-a:text-blue-400 prose-a:no-underline hover:prose-a:underline
                          prose-code:text-sm prose-code:bg-neutral-100 dark:prose-code:bg-neutral-800
                          prose-code:px-1.5 prose-code:py-0.5 prose-code:rounded-md prose-code:font-mono
                          prose-pre:bg-neutral-50 dark:prose-pre:bg-neutral-900
                          prose-pre:border prose-pre:border-neutral-200 dark:prose-pre:border-neutral-800
                          prose-pre:rounded-xl
                          prose-blockquote:border-l-[#004D98] prose-blockquote:text-neutral-500
                          prose-hr:border-neutral-200 dark:prose-hr:border-neutral-800
                          max-w-none">
        <CustomMDX source={post.content} />
      </article>

      {/* ── Footer: back link ── */}
      <div
        className="h-px mt-4"
        style={{
          background: `linear-gradient(to right, ${BLAU}60, ${GRANA}60, transparent)`,
        }}
      />

      <div className="pt-2 pb-6">
        <a
          href="/blog"
          className="group inline-flex items-center gap-2 text-xs font-medium text-neutral-400
                     transition-colors duration-200 hover:text-neutral-800 dark:hover:text-neutral-100"
        >
          <svg width="10" height="10" viewBox="0 0 12 12" fill="none"
            className="rotate-180 transition-transform duration-200 group-hover:-translate-x-0.5">
            <path d="M2.07 11.35L.963 10.24 9.2 1.99H2.84l.014-1.535H11.844V9.46H10.296l.014-6.364L2.07 11.35z"
              fill="currentColor"/>
          </svg>
          Back to projects
        </a>
      </div>

    </section>
  )
}
