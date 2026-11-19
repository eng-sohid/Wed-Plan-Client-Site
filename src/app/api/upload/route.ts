import { NextResponse } from "next/server";

// ImgBB upload. API key server e thake, browser e jay na
export async function POST(req: Request) {
  try {
    const key = process.env.IMGBB_API_KEY;
    if (!key) {
      return NextResponse.json(
        { message: "Image upload is not configured" },
        { status: 500 },
      );
    }

    const form = await req.formData();
    const file = form.get("image");

    if (!(file instanceof File) || !file.type.startsWith("image/")) {
      return NextResponse.json(
        { message: "Please select a valid image" },
        { status: 400 },
      );
    }

    if (file.size > 5 * 1024 * 1024) {
      return NextResponse.json(
        { message: "Image must be under 5MB" },
        { status: 400 },
      );
    }

    const body = new FormData();
    body.append("image", file);

    const res = await fetch(`https://api.imgbb.com/1/upload?key=${key}`, {
      method: "POST",
      body,
    });
    const data = await res.json();

    if (!res.ok || !data.success) {
      return NextResponse.json(
        { message: "Image upload failed" },
        { status: 502 },
      );
    }

    return NextResponse.json({ url: data.data.url });
  } catch {
    return NextResponse.json(
      { message: "Image upload failed" },
      { status: 500 },
    );
  }
}
