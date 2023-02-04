import { procedure, router } from "@/server/trpc";
import { z } from "zod";

const appRouter = router({
  test: procedure
    .input(
      z.object({
        text: z.string(),
      })
    )
    .query(({ input }) => {
      return {
        greeting: `Hello ${input.text}`,
      };
    }),
});

type AppRouter = typeof appRouter;

export { appRouter };
export type { AppRouter };
