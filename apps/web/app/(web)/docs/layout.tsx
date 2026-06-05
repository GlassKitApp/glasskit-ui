import { SiteHeader } from "@/components/site-header";
import { DocsSidebar } from "@/components/docs-sidebar";

/** Docs shell: shared header + a persistent sidebar; pages render their content. */
export default function DocsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <SiteHeader />
      <div className="blueprint min-h-[calc(100dvh-3.5rem)] border-t border-line-2">
        <div className="mx-auto flex max-w-6xl">
          <DocsSidebar />
          <main className="min-w-0 flex-1 px-6 py-14 lg:px-12 lg:py-16">
            {children}
          </main>
        </div>
      </div>
    </>
  );
}
