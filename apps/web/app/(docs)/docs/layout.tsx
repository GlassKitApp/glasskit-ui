import { DocsLayout } from "fumadocs-ui/layouts/docs";
import { source } from "@/lib/source";

export default function DocsAppLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <DocsLayout
      tree={source.pageTree}
      nav={{
        title: (
          <span className="font-display text-[17px] tracking-[-0.02em]">
            GlassKit UI
          </span>
        ),
        url: "/",
      }}
      githubUrl="https://github.com/GlassKitApp/glasskit-ui"
    >
      {children}
    </DocsLayout>
  );
}
