import { NextResponse } from "next/server";
import { handleUpload } from "@vercel/blob/client";
import { hasBlob } from "@/lib/store";

export const runtime = "nodejs";

export async function POST(request) {
  if (!hasBlob()) {
    return NextResponse.json(
      { error: "Vercel Blob no está configurado en este entorno." },
      { status: 501 }
    );
  }

  const body = await request.json();

  try {
    const jsonResponse = await handleUpload({
      body,
      request,
      onBeforeGenerateToken: async () => ({
        allowedContentTypes: [
          "image/jpeg",
          "image/png",
          "image/webp",
          "image/gif",
          "image/heic",
          "image/heif",
        ],
        addRandomSuffix: true,
        maximumSizeInBytes: 20 * 1024 * 1024,
      }),
    });

    return NextResponse.json(jsonResponse);
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 400 });
  }
}
