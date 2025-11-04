import { NextResponse } from "next/server";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const url = searchParams.get("url");

  if (!url) {
    return NextResponse.json(
      { ok: false, error: "Missing URL" },
      { status: 400 }
    );
  }

  try {
    const res = await fetch(url, {
      method: "GET",
      headers: {
        "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64)",
        Referer: "http://localhost:3000", // tránh bị chặn hotlink
      },
    });

    if (!res.ok) {
      return NextResponse.json({ ok: false, status: res.status });
    }

    return NextResponse.json({ ok: true, status: res.status });
  } catch (error) {
    return NextResponse.json({ ok: false, error: (error as Error).message });
  }
}
