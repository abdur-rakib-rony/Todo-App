import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth/next";
import dbConnect from "@/lib/db-connect";
import { Task } from "@/models/Task";
import { authOptions } from "@/lib/auth";

export async function DELETE(
  req: NextRequest,
  { params }: { params: { taskId: string } }
) {
  try {
    const session: any = await getServerSession(authOptions);

    if (!session?.user) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    await dbConnect();

    const task = await Task.findOne({
      _id: params.taskId,
      userId: session.user.id,
    });

    if (!task) {
      return NextResponse.json(
        { message: "Task not found or not authorized" },
        { status: 404 }
      );
    }

    await Task.deleteOne({ _id: params.taskId });

    return NextResponse.json({ message: "Task deleted successfully" });
  } catch (error) {
    console.error("Error deleting task:", error);
    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 }
    );
  }
}
