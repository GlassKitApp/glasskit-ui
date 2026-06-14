import { GlassViewport } from "@glasskit-ui/react";
import { Tab, Tabs } from "fumadocs-ui/components/tabs";
import { DynamicCodeBlock } from "fumadocs-ui/components/dynamic-codeblock";
import { LensStage } from "@/components/lens/lens-stage";
import { DevicePreview } from "@/components/device-preview";
import { DpadProvider } from "@/components/lens/dpad-provider";
import { getExample } from "@/lib/examples";
import { getComponentFiles } from "@/lib/registry-files";
import { qrSvg } from "@/lib/qr";
import { mrbdDeepLink } from "@/lib/meta-deeplink";
import { SITE } from "@/lib/config";

/**
 * <ExampleDoc slug="…" /> — an example app embedded in MDX: the live,
 * multi-screen lens (drive it with the keyboard) plus the same "run on
 * glasses" QR plumbing the component pages use, pointed at /examples/<slug>.
 */
export async function ExampleDoc({ slug }: { slug: string }) {
  const ex = getExample(slug);
  if (!ex) return null;

  const url = `${SITE}/examples/${slug}`;
  const deepLink = mrbdDeepLink(`GlassKit ${ex.name}`, url);
  const qr = await qrSvg(deepLink);
  const files = getComponentFiles(slug);

  return (
    <>
      <h2>{ex.name}</h2>
      <p>{ex.summary}</p>
      <div className="not-prose my-6 flex justify-center">
        <LensStage
          device={
            <DevicePreview
              qr={qr}
              deepLink={deepLink}
              url={url}
              appName={ex.name}
            />
          }
        >
          <DpadProvider>
            <GlassViewport>{ex.node}</GlassViewport>
          </DpadProvider>
        </LensStage>
      </div>
      <ul>
        {ex.shows.map((s) => (
          <li key={s}>{s}</li>
        ))}
      </ul>

      <h2>Installation</h2>
      <Tabs items={["CLI", "Manual"]}>
        <Tab value="CLI">
          <DynamicCodeBlock
            lang="bash"
            code={`npx @glasskit-ui/cli add ${slug}`}
          />
        </Tab>
        <Tab value="Manual">
          <p>Install the SDK, then copy these files into your project:</p>
          <DynamicCodeBlock
            lang="bash"
            code={`npm install @glasskit-ui/react`}
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
      <DynamicCodeBlock lang="tsx" code={ex.usage} />
    </>
  );
}
