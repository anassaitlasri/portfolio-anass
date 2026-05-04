// app/components/footer.tsx

const BLAU  = "#004D98";
const GRANA = "#A50044";

// ── SVG Brand Icons ───────────────────────────────────────────────────────────

function IconGitHub() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
      <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z"/>
    </svg>
  );
}

function IconLinkedIn() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
    </svg>
  );
}

function IconMedium() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
      <path d="M13.54 12a6.8 6.8 0 01-6.77 6.82A6.8 6.8 0 010 12a6.8 6.8 0 016.77-6.82A6.8 6.8 0 0113.54 12zM20.96 12c0 3.54-1.51 6.42-3.38 6.42-1.87 0-3.39-2.88-3.39-6.42s1.52-6.42 3.39-6.42 3.38 2.88 3.38 6.42M24 12c0 3.17-.53 5.75-1.19 5.75-.66 0-1.19-2.58-1.19-5.75s.53-5.75 1.19-5.75C23.47 6.25 24 8.83 24 12z"/>
    </svg>
  );
}

function IconX() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.741l7.73-8.835L1.254 2.25H8.08l4.259 5.631 5.905-5.631zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
    </svg>
  );
}

// ── Social link component ─────────────────────────────────────────────────────
function SocialLink({
  href,
  label,
  icon,
}: {
  href: string;
  label: string;
  icon: React.ReactNode;
}) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={label}
      className="group flex items-center justify-center h-9 w-9 rounded-xl
                 border border-neutral-200 dark:border-neutral-800
                 text-neutral-400 dark:text-neutral-500
                 transition-all duration-200
                 hover:border-neutral-300 dark:hover:border-neutral-600
                 hover:text-neutral-800 dark:hover:text-neutral-100
                 hover:scale-110 hover:shadow-md hover:shadow-neutral-200/60
                 dark:hover:shadow-black/30"
    >
      {icon}
    </a>
  );
}

// ── Footer ────────────────────────────────────────────────────────────────────
export default function Footer() {
  return (
    <footer className="mt-16 mb-8 space-y-6">
      {/* Barça gradient divider */}
      <div
        className="h-px"
        style={{
          background: `linear-gradient(to right, ${BLAU}70, ${GRANA}70, transparent)`,
        }}
      />

      <div className="flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">
        {/* Social icons */}
        <div className="flex items-center gap-2">
          <SocialLink
            href="https://github.com/anassaitlasri"
            label="GitHub"
            icon={<IconGitHub />}
          />
          <SocialLink
            href="https://linkedin.com/in/anass-ait-lasri"
            label="LinkedIn"
            icon={<IconLinkedIn />}
          />
          <SocialLink
            href="https://medium.com/@anass.aitlasri"
            label="Medium"
            icon={<IconMedium />}
          />
          <SocialLink
            href="https://x.com/anass_atlsr"
            label="X / Twitter"
            icon={<IconX />}
          />
        </div>

        {/* Copyright */}
        <p className="text-xs text-neutral-400 dark:text-neutral-600">
          © {new Date().getFullYear()} Anass AIT LASRI
        </p>
      </div>

      {/* Tagline */}
      <p className="text-xs italic text-neutral-400 dark:text-neutral-600">
        "Més Que Un AI Engineer" — Mathematics, AI, and a passion for FC Barcelona.
      </p>
    </footer>
  );
}
