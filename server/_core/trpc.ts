import { initTRPC } from "@trpc/server";
import type { Request, Response } from "express";

export interface TrpcContext {
  user?: {
    id: number;
    openId: string;
    name?: string | null;
    email?: string | null;
    role: "user" | "admin";
  } | null;
  req: Request;
  res: Response;
}

const t = initTRPC.context<TrpcContext>().create();

export const router = t.router;
export const publicProcedure = t.procedure;
export const protectedProcedure = t.procedure.use(({ ctx, next }) => {
  if (!ctx.user) {
    throw new Error("Not authenticated");
  }
  return next({
    ctx: {
      user: ctx.user,
    },
  });
});
