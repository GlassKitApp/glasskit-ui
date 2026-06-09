import { GlassViewport } from "@glasskit/glasses-ui";
import { Tab, Tabs } from "fumadocs-ui/components/tabs";
import { TypeTable } from "fumadocs-ui/components/type-table";
import { DynamicCodeBlock } from "fumadocs-ui/components/dynamic-codeblock";
import { LensStage } from "@/components/lens/lens-stage";
import { DevicePreview } from "@/components/device-preview";
import { getComponentDoc } from "@/lib/component-docs";
import { getComponentFiles } from "@/lib/registry-files";
import { qrSvg } from "@/lib/qr";
import { mrbdDeepLink } from "@/lib/meta-deeplink";
import { SITE } from "@/lib/config";

/**
 * <ComponentDoc slug="…" /> — the body of a component page inside Fumadocs MDX:
 * the live 600×600 preview (with the Meta-logo install popover), an Installation
 * tab set (CLI / manual), the usage snippet, and a props TypeTable. The data
 * comes from `component-docs.tsx`; the chrome is native Fumadocs.
 */
export async function ComponentDoc({ slug }: { slug: string }) {
  const doc = getComponentDoc(slug);
  if (!doc) return null;

  const files = getComponentFiles(slug);
  const previewUrl = `${SITE}/preview/${slug}`;
  const deepLink = mrbdDeepLink(`GlassKit ${doc.name}`, previewUrl);
  const qr = await qrSvg(deepLink);

  const propTypes = Object.fromEntries(
    doc.props.map((p) => [
      p.name,
      { type: p.type, default: p.default, description: p.desc },
    ]),
  );

  return (
    <>
      <div className="not-prose my-6 flex justify-center">
        <LensStage
          device={
            <DevicePreview
              qr={qr}
              deepLink={deepLink}
              url={previewUrl}
              appName={doc.name}
            />
          }
        >
          <GlassViewport>{doc.preview}</GlassViewport>
        </LensStage>
      </div>

      <h2>Installation</h2>
      <Tabs items={["CLI", "Manual"]}>
        <Tab value="CLI">
          <DynamicCodeBlock lang="bash" code={`glasskit add ${slug}`} />
        </Tab>
        <Tab value="Manual">
          <p>
            Install the SDK (it provides <code>GlassViewport</code>,{" "}
            <code>useDpad</code> and the stylesheet), then copy these files into
            your project:
          </p>
          <DynamicCodeBlock
            lang="bash"
            code={`npm install @glasskit/glasses-ui`}
          />
          {files.map((f) => (
            <DynamicCodeBlock
              key={f.target}
              lang="tsx"
              code={`// ${f.target}\n${f.content}`}
            />
          ))}
        </Tab>
      </Tabs>

      <h2>Usage</h2>
      <DynamicCodeBlock lang="tsx" code={doc.usage} />

      <h2>Props</h2>
      <TypeTable type={propTypes} />
    </>
  );
}
