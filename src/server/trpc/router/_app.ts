import { router } from "../trpc";
import { authRouter } from "./auth";
import { membersRouter } from "./example";

export const appRouter = router({
  members: membersRouter,
  auth: authRouter,
});

// export type definition of API
export type AppRouter = typeof appRouter;
