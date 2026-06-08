"use client";

import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { COMPONENT_NAV } from "@/lib/component-nav";

const CATEGORY_ORDER = [
  "Shell",
  "Display",
  "Status",
  "Action",
  "Navigation",
  "Spatial",
  "Comms",
  "Media",
  "AI",
  "Capture",
  "Input",
];

const GROUPS = CATEGORY_ORDER.map((cat) => ({
  cat,
  items: COMPONENT_NAV.filter((c) => c.category === cat),
})).filter((g) => g.items.length > 0);

/** Persistent docs navigation: Getting started + components grouped by category. */
export function DocsSidebar() {
  const path = usePathname();

  return (
    <aside className="hidden w-56 shrink-0 border-r border-line-2 lg:block">
      <nav className="sticky top-14 max-h-[calc(100dvh-3.5rem)] overflow-y-auto px-5 py-10">
        <SideLink href="/docs" active={path === "/docs"}>
          Getting started
        </SideLink>
        <SideLink href="/docs/components" active={path === "/docs/components"}>
          Components
        </SideLink>

        {GROUPS.map((g) => (
          <div key={g.cat} className="mt-7">
            <p className="mono-label">{g.cat}</p>
            <ul className="mt-2.5 space-y-0.5">
              {g.items.map((c) => {
                const href = `/docs/components/${c.slug}`;
                return (
                  <li key={c.slug}>
                    <SideLink href={href} active={path === href}>
                      {c.name}
                    </SideLink>
                  </li>
                );
              })}
            </ul>
          </div>
        ))}
      </nav>
    </aside>
  );
}

function SideLink({
  href,
  active,
  children,
}: {
  href: string;
  active: boolean;
  children: React.ReactNode;
}) {
  return (
    <a
      href={href}
      aria-current={active ? "page" : undefined}
      className={cn(
        "block py-1 text-[14px] transition-colors",
        active ? "font-medium text-accent-ink" : "text-ink-2 hover:text-ink",
      )}
    >
      {children}
    </a>
  );
}
