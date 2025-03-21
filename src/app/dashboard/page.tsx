import { Suspense } from "react";
import dbConnect from "@/lib/db-connect";
import { Task } from "@/models/Task";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/auth";
import TaskForm from "../components/task-form";
import TaskCard from "../components/task-card";
import { Card, CardContent } from "@/components/ui/card";
import { Loader2 } from "lucide-react";

async function TaskList() {
  const session: any = await getServerSession(authOptions);

  if (!session?.user) {
    return <div>Unauthorized</div>;
  }

  await dbConnect();

  const tasks = await Task.find({
    userId: session.user.id,
    completedAt: null,
  }).sort({ createdAt: -1 });

  if (tasks.length === 0) {
    return (
      <Card>
        <CardContent className="p-6 text-center text-gray-500">
          <p>You don't have any current tasks.</p>
          <p>Add a new task to get started!</p>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {tasks.map((task) => (
        <TaskCard
          key={task._id}
          task={{
            id: task._id.toString(),
            title: task.title,
            description: task.description,
            createdAt: task.createdAt,
            completedAt: task.completedAt,
          }}
        />
      ))}
    </div>
  );
}

export default function DashboardPage() {
  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold">Current Tasks</h1>
      <div className="grid gap-6 md:grid-cols-3">
        <div className="md:col-span-1">
          <TaskForm />
        </div>
        <div className="md:col-span-2">
          <Suspense
            fallback={
              <div className="flex justify-center p-12">
                <Loader2 className="h-8 w-8 animate-spin text-gray-400" />
              </div>
            }
          >
            <TaskList />
          </Suspense>
        </div>
      </div>
    </div>
  );
}
