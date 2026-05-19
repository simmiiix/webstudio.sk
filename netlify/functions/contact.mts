import type { Config } from "@netlify/functions";
import { db } from "../../db/index.js";
import { contactMessages } from "../../db/schema.js";

export default async (req: Request) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { status: 204 });
  }

  if (req.method !== "POST") {
    return Response.json({ error: "Method not allowed" }, { status: 405 });
  }

  try {
    const body = await req.json();
    const input = body?.json;

    if (!input?.name || !input?.email || !input?.message) {
      return Response.json(
        { result: { data: { json: { success: false, message: "Chýbajú povinné polia" } } } },
        { status: 400 }
      );
    }

    if (input.message.length < 10) {
      return Response.json(
        { result: { data: { json: { success: false, message: "Správa musí mať aspoň 10 znakov" } } } },
        { status: 400 }
      );
    }

    await db.insert(contactMessages).values({
      name: input.name,
      email: input.email,
      phone: input.phone || null,
      message: input.message,
    });

    return Response.json({
      result: { data: { json: { success: true, message: "Správa bola odoslaná!" } } },
    });
  } catch (error) {
    console.error("Contact form error:", error);
    return Response.json(
      { result: { data: { json: { success: false, message: "Chyba pri odoslaní správy" } } } },
      { status: 500 }
    );
  }
};

export const config: Config = {
  path: "/api/trpc/contact.submit",
};
