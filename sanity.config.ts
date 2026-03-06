"use client";

import { visionTool } from "@sanity/vision";
import { defineConfig } from "sanity";
import { structureTool } from "sanity/structure";

import { apiVersion, dataset, projectId } from "./sanity/env";
import { schema } from "./sanity/schemaTypes";
import { structure } from "./sanity/structure";

// Configuration for the embedded Sanity Studio (route: \app\studio\[[...tool]]\page.tsx)
export default defineConfig({
  basePath: "/studio",
  projectId,
  dataset,
  schema, // All document schemas mapped here
  plugins: [
    structureTool({ structure }), // Left-hand navigation
    visionTool({ defaultApiVersion: apiVersion }), // Query tester
  ],
});
