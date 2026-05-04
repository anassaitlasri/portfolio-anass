// app/components/nav.tsx
import Link from "next/link";

const BLAU  = "#004D98";
const GRANA = "#A50044";

const navItems = {
  "/":                                        { name: "home" },
  "/blog":                                    { name: "projects" },
  "https://www.linkedin.com/in/anass-ait-lasri": { name: "linkedin" },
};

export function Navbar() {
  return (
    <aside className="mb-12 -ml-1">
      <nav className="flex flex-row items-center gap-1" id="nav">
        {Object.entries(navItems).map(([path, { name }]) => {
          const isExternal = path.startsWith("http");
          return (
            <Link
              key={path}
              href={path}
              {...(isExternal ? { target: "_blank", rel: "noopener noreferrer" } : {})}
              className="group relative px-2 py-1 text-sm font-medium text-neutral-500
                         transition-colors duration-200
                         hover:text-neutral-900 dark:hover:text-neutral-100"
            >
              {name}
              {/* Barça gradient underline on hover */}
              <span
                className="absolute bottom-0 left-2 right-2 h-[2px] rounded-full
                           scale-x-0 transition-transform duration-300 origin-left
                           group-hover:scale-x-100"
                style={{ background: `linear-gradient(90deg, ${BLAU}, ${GRANA})` }}
              />
            </Link>
          );
        })}
      </nav>
    </aside>
  );
}
