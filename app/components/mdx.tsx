// app/components/mdx.tsx
import { MDXRemote } from 'next-mdx-remote/rsc'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'
import { highlight } from 'sugar-high'

const BLAU  = "#004D98";
const GRANA = "#A50044";

// ── Standard MDX components ───────────────────────────────────────────────────

function Table({ data }: { data: { headers: string[]; rows: string[][] } }) {
  return (
    <div className="my-6 overflow-x-auto rounded-xl border border-neutral-200 dark:border-neutral-800">
      <table className="w-full text-sm">
        <thead>
          <tr className="border-b border-neutral-200 dark:border-neutral-800 bg-neutral-50 dark:bg-neutral-900">
            {data.headers.map((header, i) => (
              <th key={i} className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider text-neutral-500 dark:text-neutral-400">
                {header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {data.rows.map((row, i) => (
            <tr key={i} className="border-b border-neutral-100 dark:border-neutral-800/50 last:border-0 hover:bg-neutral-50 dark:hover:bg-neutral-900/50 transition-colors">
              {row.map((cell, j) => (
                <td key={j} className="px-4 py-3 text-neutral-700 dark:text-neutral-300">
                  {cell}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

function CustomLink(props: React.AnchorHTMLAttributes<HTMLAnchorElement>) {
  const href = props.href ?? ''
  if (href.startsWith('/')) {
    return <Link href={href} {...props}>{props.children}</Link>
  }
  if (href.startsWith('#')) {
    return <a {...props} />
  }
  return <a target="_blank" rel="noopener noreferrer" {...props} />
}

function RoundedImage(props: React.ComponentProps<typeof Image>) {
  return <Image alt={props.alt ?? ''} className="rounded-xl my-6" {...props} />
}

function Code({ children, ...props }: any) {
  // Sécurité 1 : Si c'est vide ou indéfini, on rend une balise simple
  if (!children) {
    return <code {...props} />
  }
  // Sécurité 2 : Si ce n'est pas du texte pur, on ne le passe pas dans sugar-high
  if (typeof children !== 'string') {
    return <code {...props}>{children}</code>
  }
  
  // Si tout va bien, on applique la coloration syntaxique
  const codeHTML = highlight(children)
  return <code dangerouslySetInnerHTML={{ __html: codeHTML }} {...props} />
}
function slugify(str: string) {
  return str.toString().toLowerCase().trim()
    .replace(/\s+/g, '-')
    .replace(/&/g, '-and-')
    .replace(/[^\w\-]+/g, '')
    .replace(/\-\-+/g, '-')
}

function createHeading(level: number) {
  const Heading = ({ children }: { children: string }) => {
    const slug = slugify(children)
    return React.createElement(
      `h${level}`,
      { id: slug },
      [React.createElement('a', { href: `#${slug}`, key: `link-${slug}`, className: 'anchor' })],
      children
    )
  }
  Heading.displayName = `Heading${level}`
  return Heading
}

// ── Custom premium components ─────────────────────────────────────────────────

/**
 * HeroImage — full-width image at the top of an article.
 * fit="cover" (default) for photos, fit="contain" for diagrams.
 * Usage: <HeroImage src="/blog/my-image.jpg" alt="..." />
 */
function HeroImage({ src, alt, fit = 'cover' }: { src: string; alt: string; fit?: 'cover' | 'contain' }) {
  return (
    <div
      className="relative w-full overflow-hidden rounded-2xl mb-10 border border-neutral-200 dark:border-neutral-800 bg-neutral-50 dark:bg-neutral-900"
      style={{ height: '280px' }}
    >
      <Image
        src={src}
        alt={alt}
        fill
        priority
        className={fit === 'cover' ? 'object-cover' : 'object-contain p-4'}
        sizes="672px"
      />
      {fit === 'cover' && (
        <div
          className="absolute inset-0 rounded-2xl"
          style={{ background: 'linear-gradient(to top, rgba(0,0,0,0.35) 0%, transparent 60%)' }}
        />
      )}
    </div>
  )
}

/**
 * ImageBlock — inline image with optional caption.
 * fit="contain" (default) for diagrams/charts — shows the full image without cropping.
 * fit="cover" for photos.
 * Usage: <ImageBlock src="/blog/img.jpg" alt="..." caption="..." />
 * Usage: <ImageBlock src="/blog/photo.jpg" alt="..." fit="cover" />
 */
function ImageBlock({
  src, alt, caption, fit = 'contain', height = '280',
}: {
  src: string; alt: string; caption?: string; fit?: 'cover' | 'contain'; height?: string
}) {
  return (
    <figure className="my-8">
      <div
        className="relative w-full overflow-hidden rounded-xl border border-neutral-200 dark:border-neutral-800 bg-neutral-50 dark:bg-neutral-900"
        style={{ height: `${height}px` }}
      >
        <Image
          src={src}
          alt={alt}
          fill
          className={fit === 'cover' ? 'object-cover' : 'object-contain p-4'}
          sizes="672px"
        />
      </div>
      {caption && (
        <figcaption className="mt-2 text-center text-xs text-neutral-400 dark:text-neutral-600 italic">
          {caption}
        </figcaption>
      )}
    </figure>
  )
}

/**
 * MetricsRow — horizontal metrics strip.
 * MDX-safe: use individual v1/l1/v2/l2/v3/l3 props instead of an array.
 *
 * Usage in MDX:
 * <MetricsRow
 *   v1="−40%" l1="Token cost"
 *   v2="−35%" l2="p95 Latency"
 *   v3=">95%" l3="Accuracy"
 * />
 */
function MetricsRow({
  v1, l1, v2, l2, v3, l3,
  metrics,
}: {
  v1?: string; l1?: string
  v2?: string; l2?: string
  v3?: string; l3?: string
  metrics?: { value: string; label: string }[]
}) {
  const colors = [BLAU, GRANA, BLAU, GRANA]

  // Support both individual props (MDX-safe) and array prop (programmatic use)
  const items: { value: string; label: string }[] =
    Array.isArray(metrics) && metrics.length > 0
      ? metrics
      : [
          v1 && l1 ? { value: v1, label: l1 } : null,
          v2 && l2 ? { value: v2, label: l2 } : null,
          v3 && l3 ? { value: v3, label: l3 } : null,
        ].filter(Boolean) as { value: string; label: string }[]

  if (items.length === 0) return null

  return (
    <div
      className="my-8 grid gap-3"
      style={{ gridTemplateColumns: `repeat(${items.length}, 1fr)` }}
    >
      {items.map(({ value, label }, i) => (
        <div
          key={label}
          className="rounded-xl border border-neutral-200 dark:border-neutral-800
                     bg-white dark:bg-neutral-900 p-5 text-center"
        >
          <p className="text-2xl font-bold tracking-tight" style={{ color: colors[i % colors.length] }}>
            {value}
          </p>
          <p className="mt-1.5 text-[10px] uppercase tracking-widest text-neutral-400 dark:text-neutral-600">
            {label}
          </p>
        </div>
      ))}
    </div>
  )
}

/**
 * ArchitectureDiagram — placeholder for when you add a real diagram image.
 * Replace imageSrc with your actual diagram file.
 */
function ArchitectureDiagram() {
  return (
    <div className="my-8 relative w-full overflow-hidden rounded-xl border border-neutral-200 dark:border-neutral-800"
      style={{ minHeight: '200px' }}>
      <Image
        src="/blog/auditor-architecture.jpg"
        alt="LangGraph agent architecture diagram"
        fill
        className="object-cover"
        sizes="672px"
      />
      <div className="absolute bottom-0 left-0 right-0 p-4"
        style={{ background: 'linear-gradient(to top, rgba(0,0,0,0.7), transparent)' }}>
        <p className="text-xs text-white/70 italic">
          StateGraph with 5 specialized agents — Planner → Executor → Sandbox → Reflector → Reporter
        </p>
      </div>
    </div>
  )
}

/**
 * Callout — highlighted note box.
 * Usage: <Callout>Important insight here.</Callout>
 */
function Callout({ children, accent = BLAU }: { children: React.ReactNode; accent?: string }) {
  return (
    <div className="my-6 rounded-xl p-5"
      style={{ borderLeft: `3px solid ${accent}`, background: `${accent}08` }}>
      <div className="text-sm leading-relaxed text-neutral-700 dark:text-neutral-300 [&>p]:m-0">
        {children}
      </div>
    </div>
  )
}

/**
 * Math — block-level formula displayed in a styled box.
 * Usage: <Math formula="IQR = Q₃ − Q₁" />
 */
function Math({ formula }: { formula: string }) {
  return (
    <div className="my-6 flex justify-center">
      <div
        className="rounded-xl border border-neutral-200 dark:border-neutral-800
                   bg-neutral-50 dark:bg-neutral-900 px-8 py-4"
      >
        <p
          className="font-mono text-base tracking-wide text-neutral-700 dark:text-neutral-300"
          style={{ fontFamily: "'Georgia', 'Times New Roman', serif", fontStyle: "italic" }}
        >
          {formula}
        </p>
      </div>
    </div>
  )
}

/**
 * MathInline — inline formula styled consistently.
 * Usage: <MathInline f="Q₁ − 1.5 × IQR" />
 */
function MathInline({ f }: { f: string }) {
  return (
    <code
      className="mx-0.5 rounded px-1.5 py-0.5 text-sm"
      style={{
        fontFamily: "'Georgia', 'Times New Roman', serif",
        fontStyle: "italic",
        background: `${BLAU}10`,
        color: BLAU,
        border: `1px solid ${BLAU}25`,
      }}
    >
      {f}
    </code>
  )
}

// ── Component map ─────────────────────────────────────────────────────────────

const components = {
  h1: createHeading(1),
  h2: createHeading(2),
  h3: createHeading(3),
  h4: createHeading(4),
  h5: createHeading(5),
  h6: createHeading(6),
  Image: RoundedImage,
  a: CustomLink,
  code: Code,
  Table,
  // Custom components available in every MDX file
  HeroImage,
  ImageBlock,
  MetricsRow,
  ArchitectureDiagram,
  Callout,
  Math,
  MathInline,
}

export function CustomMDX(props: React.ComponentProps<typeof MDXRemote>) {
  return (
    <MDXRemote
      {...props}
      components={{ ...components, ...(props.components || {}) }}
    />
  )
}
