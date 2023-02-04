import * as trpcNext from "@trpc/server/adapters/next";
import { appRouter } from "@/server/routers/_app";

const trpcHandler = trpcNext.createNextApiHandler({
  router: appRouter,
});

export default trpcHandler;
