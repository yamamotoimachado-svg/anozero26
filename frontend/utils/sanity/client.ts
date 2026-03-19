// ./src/utils/sanity/client.ts
import { createClient } from "next-sanity";

const projectId =
  process.env.NEXT_PUBLIC_SANITY_PROJECT_ID ||
  process.env.SANITY_STUDIO_PROJECT_ID ||
  process.env.SANITY_PROJECT_ID;

const dataset =
  process.env.NEXT_PUBLIC_SANITY_DATASET ||
  process.env.SANITY_STUDIO_DATASET ||
  process.env.SANITY_DATASET ||
  "production";

// TODO: move apiVersion to env when appropriate
const apiVersion = "1";

if (!projectId) {
  throw new Error(
    "Missing Sanity configuration: set NEXT_PUBLIC_SANITY_PROJECT_ID (or SANITY_STUDIO_PROJECT_ID / SANITY_PROJECT_ID) in your environment"
  );
}

export const client = createClient({
  projectId,
  dataset,
  apiVersion, // https://www.sanity.io/docs/api-versioning
  useCdn: true // if you're using ISR or only static generation at build time then you can set this to `false` to guarantee no stale content
});