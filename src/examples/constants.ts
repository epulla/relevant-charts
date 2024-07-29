import { Example } from "./types";

// id is the key of the example
export const LOCAL_EXAMPLES: Record<string, Example> = {
  "1": {
    id: "1",
    author: "System",
    name: "Simple data",
    createdAt: "2024-07-20T17:16:47.586Z",
    data: "samples/1/data.json", // from src/examples folder
    cover: "samples/1/cover.webp", // from public folder
  },
};
