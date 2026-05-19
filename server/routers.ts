import { z } from "zod";
import { publicProcedure, router } from "./_core/trpc";
import { createContactMessage, getContactMessages } from "./db";

export const appRouter = router({
  auth: router({
    me: publicProcedure.query((opts) => opts.ctx.user),
  }),

  contact: router({
    submit: publicProcedure
      .input(
        z.object({
          name: z.string().min(1, "Meno je povinné"),
          email: z.string().email("Neplatný e-mail"),
          phone: z.string().optional(),
          message: z.string().min(10, "Správa musí mať aspoň 10 znakov"),
        })
      )
      .mutation(async ({ input }) => {
        try {
          await createContactMessage({
            name: input.name,
            email: input.email,
            phone: input.phone || null,
            message: input.message,
          });
          return { success: true, message: "Správa bola odoslaná!" };
        } catch (error) {
          console.error("Failed to submit contact form:", error);
          return { success: false, message: "Chyba pri odoslaní správy" };
        }
      }),

    list: publicProcedure.query(async () => {
      return await getContactMessages();
    }),
  }),
});

export type AppRouter = typeof appRouter;
