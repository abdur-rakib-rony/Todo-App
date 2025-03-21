import { Suspense } from "react";
import { getServerSession } from "next-auth/next";
import dbConnect from "@/lib/db-connect";
import { Task } from "@/models/Task";
import { authOptions } from "@/lib/auth";
import TaskCard from "../../components/task-card";
import { Card, CardContent } from "@/components/ui/card";
import { Loader2 } from "lucide-react";

async function CompletedTaskList() {
  const session: any = await getServerSession(authOptions);

  if (!session?.user) {
    return <div>Unauthorized</div>;
  }

  await dbConnect();

  const tasks = await Task.find({
    userId: session.user.id,
    completedAt: { $ne: null },
  }).sort({ completedAt: -1 });

  if (tasks.length === 0) {
    return (
      <Card>
        <CardContent className="p-6 text-center text-gray-500">
          <p>You don't have any completed tasks yet.</p>
          <p>Complete a task to see it here!</p>
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
          isCompleted
        />
      ))}
    </div>
  );
}

export default function CompletedTasksPage() {
  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold">Completed Tasks</h1>
      <Suspense
        fallback={
          <div className="flex justify-center p-12">
            <Loader2 className="h-8 w-8 animate-spin text-gray-400" />
          </div>
        }
      >
        <CompletedTaskList />
      </Suspense>
    </div>
  );
}
