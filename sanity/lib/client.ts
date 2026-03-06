import { createClient } from "next-sanity";

import { apiVersion, dataset, projectId } from "../env";

// Sanity API client configured for data fetching
export const client = createClient({
  projectId,
  dataset,
  apiVersion,
  useCdn: true, // Use geographically distributed edge cache
});
