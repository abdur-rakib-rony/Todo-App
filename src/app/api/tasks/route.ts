import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth/next";
import { z } from "zod";
import dbConnect from "@/lib/db-connect";
import { Task } from "@/models/Task";
import { authOptions } from "@/lib/auth";

const taskSchema = z.object({
  title: z.string().min(1, "Title is required").max(100, "Title is too long"),
  description: z.string().max(500, "Description is too long").optional(),
});

export async function POST(req: NextRequest) {
  try {
    const session: any = await getServerSession(authOptions);
    
    if (!session || !session.user) {
      return NextResponse.json(
        { message: "Unauthorized" },
        { status: 401 }
      );
    }
    
    const body = await req.json();
    const validation = taskSchema.safeParse(body);
    
    if (!validation.success) {
      return NextResponse.json(
        { message: "Invalid input data", errors: validation.error.errors },
        { status: 400 }
      );
    }
    
    const { title, description } = validation.data;
    
    await dbConnect();
    
    const task = await Task.create({
      title,
      description,
      userId: session.user.id,
    });
    
    return NextResponse.json(
      { message: "Task created successfully", task },
      { status: 201 }
    );
  } catch (error) {
    console.error("Error creating task:", error);
    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 }
    );
  }
}

export async function GET(req: NextRequest) {
  try {
    const session: any = await getServerSession(authOptions);
    
    if (!session || !session.user) {
      return NextResponse.json(
        { message: "Unauthorized" },
        { status: 401 }
      );
    }
    
    await dbConnect();
    
    const { searchParams } = new URL(req.url);
    const completed = searchParams.get("completed");
    
    const where: any = {
      userId: session.user.id,
    };
    
    if (completed === "true") {
      where.completedAt = { $ne: null };
    } else if (completed === "false") {
      where.completedAt = null;
    }
    
    const tasks = await Task.find(where).sort(
      completed === "true" 
        ? { completedAt: -1 } 
        : { createdAt: -1 }
    );
    
    return NextResponse.json({ tasks });
  } catch (error) {
    console.error("Error fetching tasks:", error);
    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 }
    );
  }
}