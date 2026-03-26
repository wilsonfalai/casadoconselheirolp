import { NextResponse } from "next/server";
import { insertLead } from "@/lib/leads-db";

export const runtime = "nodejs";

function isValidEmail(email: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

export async function POST(request: Request) {
  const body = await request.json();

  const name = String(body.name ?? "").trim();
  const email = String(body.email ?? "").trim();
  const whatsapp = String(body.whatsapp ?? "").replace(/\D/g, "");
  const profession = String(body.profession ?? "").trim();
  const salaryRange = String(body.salaryRange ?? "").trim();

  if (!name || !email || !whatsapp || !profession || !salaryRange) {
    return NextResponse.json(
      { error: "Todos os campos são obrigatórios." },
      { status: 400 },
    );
  }

  if (!isValidEmail(email)) {
    return NextResponse.json(
      { error: "E-mail inválido." },
      { status: 400 },
    );
  }

  if (whatsapp.length < 10 || whatsapp.length > 11) {
    return NextResponse.json(
      { error: "WhatsApp inválido." },
      { status: 400 },
    );
  }

  const result = insertLead({
    name,
    email,
    whatsapp,
    profession,
    salaryRange,
  });

  return NextResponse.json({ ok: true, id: result.lastInsertRowid });
}
