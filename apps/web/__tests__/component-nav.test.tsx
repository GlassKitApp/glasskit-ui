import { describe, it, expect } from "vitest";
import { COMPONENT_NAV } from "@/lib/component-nav";
import { COMPONENT_DOCS } from "@/lib/component-docs";

describe("component-nav (slim sidebar index)", () => {
  it("stays in sync with COMPONENT_DOCS — same slugs, order, name and category", () => {
    expect(COMPONENT_NAV.map((n) => n.slug)).toEqual(
      COMPONENT_DOCS.map((d) => d.slug),
    );
    for (const d of COMPONENT_DOCS) {
      const n = COMPONENT_NAV.find((x) => x.slug === d.slug);
      expect(n, `missing nav entry for ${d.slug}`).toBeTruthy();
      expect(n!.name).toBe(d.name);
      expect(n!.category).toBe(d.category);
    }
  });
});
