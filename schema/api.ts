import { z } from "zod";

const APISchema = z
  .object({
    name: z.string(),
    age: z.number(),
  })
  .strict();

type APIResponse = z.infer<typeof APISchema>;

export { APISchema };
export type { APIResponse };
