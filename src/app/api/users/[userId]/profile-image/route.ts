import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth/next";
import { writeFile, mkdir } from "fs/promises";
import { existsSync } from "fs";
import path from "path";
import dbConnect from "@/lib/db-connect";
import { User } from "@/models/User";
import { authOptions } from "@/lib/auth";

export async function POST(
  req: NextRequest,
  { params }: { params: Promise<{ userId: string }> }
) {
  try {
    const resolvedParams = await params;
    const userId = resolvedParams.userId;

    const session: any = await getServerSession(authOptions);

    if (!session?.user || session.user.id !== userId) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    console.log("session.user", session.user);

    await dbConnect();

    const formData = await req.formData();
    const file = formData.get("file") as File;

    if (!file) {
      return NextResponse.json(
        { message: "No file provided" },
        { status: 400 }
      );
    }

    const validTypes = ["image/jpeg", "image/png", "image/gif", "image/webp"];
    if (!validTypes.includes(file.type)) {
      return NextResponse.json(
        {
          message:
            "Invalid file type. Only JPEG, PNG, GIF, and WebP are allowed.",
        },
        { status: 400 }
      );
    }

    const uploadDir = path.join(process.cwd(), "public", "uploads");
    if (!existsSync(uploadDir)) {
      await mkdir(uploadDir, { recursive: true });
    }

    const timestamp = Date.now();
    const fileExtension = file.name.split(".").pop();
    const filename = `${userId}-${timestamp}.${fileExtension}`;
    const filepath = path.join(uploadDir, filename);

    const arrayBuffer = await file.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);
    await writeFile(filepath, buffer);

    const imageUrl = `/uploads/${filename}`;

    await User.findByIdAndUpdate(
      userId,
      { image: imageUrl },
      { new: true, runValidators: true }
    );

    return NextResponse.json({
      message: "Profile image uploaded successfully",
      imageUrl,
    });
  } catch (error) {
    console.error("Error uploading profile image:", error);
    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 }
    );
  }
}
