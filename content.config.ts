import { defineCollection, defineContentConfig, z } from "@nuxt/content";

export default defineContentConfig({
  collections: {
    tattoos: defineCollection({
      type: "data",
      source: "tattoos.json",
      schema: z.object({
        body: z.array(
          z.object({
            order: z.number(),
            src: z.string(),
          })
        ),
      }),
    }),
  },
});
