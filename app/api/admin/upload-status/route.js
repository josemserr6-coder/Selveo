import { NextResponse } from "next/server";
import { hasBlob } from "@/lib/store";

export const runtime = "nodejs";

export async function GET() {
  return NextResponse.json({ blobEnabled: hasBlob() });
}
