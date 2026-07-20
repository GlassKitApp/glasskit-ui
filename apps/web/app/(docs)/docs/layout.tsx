import { DocsLayout } from "fumadocs-ui/layouts/docs";
import { source } from "@/lib/source";
import { StudioCta } from "@/components/studio-cta";

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
      sidebar={{ banner: <StudioCta /> }}
      githubUrl="https://github.com/GlassKitApp/glasskit-ui"
    >
      {children}
    </DocsLayout>
  );
}
