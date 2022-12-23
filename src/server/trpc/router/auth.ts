import { TRPCError } from "@trpc/server";
import { UserFormModel } from "shared/model/UserModel";
import { ZodError } from "zod";
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
    return ctx.prisma.user.findUnique({
      where: { id: ctx.session.user.id },
    });
  }),
  updateSelf: protectedProcedure
    .input(UserFormModel)
    .mutation(async ({ ctx, input }) => {
      const userNameExists = await ctx.prisma.user.findUnique({
        where: { username: input.username },
      });

      if (userNameExists)
        throw new TRPCError({
          code: "BAD_REQUEST",
          message: "Username already taken",
          cause: new ZodError([
            {
              path: ["username"],
              code: "invalid_type",
              message: "Username already taken",
              expected: "string",
              received: "string",
            },
          ]),
        });

      return ctx.prisma.user.update({
        where: { id: ctx.session.user.id },
        data: input,
      });
    }),
});
