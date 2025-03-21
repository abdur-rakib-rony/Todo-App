"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { format } from "date-fns";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { toast } from "sonner";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { CheckCircle, Trash2, Edit, Loader2 } from "lucide-react";

interface Task {
  id: string;
  title: string;
  description?: string | null;
  createdAt: Date;
  completedAt: Date | null;
}

interface TaskCardProps {
  task: Task;
  isCompleted?: boolean;
}

export default function TaskCard({ task, isCompleted = false }: TaskCardProps) {
  const router = useRouter();
  const [isDeleting, setIsDeleting] = useState(false);
  const [isCompleting, setIsCompleting] = useState(false);

  const handleDelete = async () => {
    setIsDeleting(true);

    try {
      const response = await fetch(`/api/tasks/${task.id}`, {
        method: "DELETE",
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.message || "Failed to delete task");
      }

      toast("The task has been deleted successfully");

      router.refresh();
    } catch (error) {
      toast(error instanceof Error ? error.message : "Something went wrong");
    } finally {
      setIsDeleting(false);
    }
  };

  const handleComplete = async () => {
    setIsCompleting(true);

    try {
      const response = await fetch(`/api/tasks/${task.id}/complete`, {
        method: "PATCH",
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.message || "Failed to complete task");
      }

      toast("The task has been marked as completed");

      router.refresh();
    } catch (error) {
      toast(error instanceof Error ? error.message : "Something went wrong");
    } finally {
      setIsCompleting(false);
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg">{task.title}</CardTitle>
      </CardHeader>
      <CardContent>
        {task.description && (
          <p className="text-gray-700">{task.description}</p>
        )}
        <div className="mt-4 text-sm text-gray-500">
          <p>Created on: {format(new Date(task.createdAt), "PPP")}</p>
          {task.completedAt && (
            <p>Completed on: {format(new Date(task.completedAt), "PPP")}</p>
          )}
        </div>
      </CardContent>
      <CardFooter className="flex justify-between">
        {!isCompleted ? (
          <Button
            variant="outline"
            size="sm"
            onClick={handleComplete}
            disabled={isCompleting}
          >
            {isCompleting ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                <span>Completing...</span>
              </>
            ) : (
              <>
                <CheckCircle className="mr-2 h-4 w-4" />
                <span>Mark as Completed</span>
              </>
            )}
          </Button>
        ) : (
          <div className="text-green-600 flex items-center">
            <CheckCircle className="mr-2 h-4 w-4" />
            <span>Completed</span>
          </div>
        )}

        <AlertDialog>
          <AlertDialogTrigger asChild>
            <Button variant="ghost" size="sm" className="text-red-600">
              <Trash2 className="h-4 w-4" />
            </Button>
          </AlertDialogTrigger>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Are you sure?</AlertDialogTitle>
              <AlertDialogDescription>
                This action cannot be undone. This will permanently delete the
                task.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel>Cancel</AlertDialogCancel>
              <AlertDialogAction
                onClick={handleDelete}
                className="bg-red-600 text-white hover:bg-red-700"
                disabled={isDeleting}
              >
                {isDeleting ? "Deleting..." : "Delete"}
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </CardFooter>
    </Card>
  );
}
