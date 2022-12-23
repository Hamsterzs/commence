import { UserFormModel } from "shared/model/UserModel";
import { router, publicProcedure, protectedProcedure } from "../trpc";

const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

export const authRouter = router({
  getSession: publicProcedure.query(({ ctx }) => {
    return ctx.session;
  }),
  getSecretMessage: protectedProcedure.query(() => {
    return "you can now see this secret message!";
  }),
  getSelf: protectedProcedure.query(async ({ ctx }) => {
    await delay(2500);
    return ctx.prisma.user.findUnique({
      where: { id: ctx.session.user.id },
    });
  }),
  updateSelf: protectedProcedure
    .input(UserFormModel)
    .mutation(async ({ ctx, input }) => {
      const user = await ctx.prisma.user.update({
        where: { id: ctx.session.user.id },
        data: input,
      });

      return user;
    }),
});
