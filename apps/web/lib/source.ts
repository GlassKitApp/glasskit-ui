import { docs } from "@/.source/server";
import { loader } from "fumadocs-core/source";

/** Fumadocs content loader — the MDX docs under content/docs, served at /docs. */
export const source = loader({
  baseUrl: "/docs",
  source: docs.toFumadocsSource(),
});
