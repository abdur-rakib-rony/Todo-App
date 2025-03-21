import { ReactNode } from "react";
import { redirect } from "next/navigation";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/auth";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { LogOut, CheckSquare, ListTodo } from "lucide-react";
import Link from "next/link";
import ProfileUploadButton from "../components/profile-upload-button";

export default async function DashboardLayout({
  children,
}: {
  children: ReactNode;
}) {
  const session: any = await getServerSession(authOptions);

  console.log('session.user', session.user)

  if (!session?.user) {
    redirect("/auth/signin");
  }

  const initials = session.user.name
    ? session.user.name
        .split(" ")
        .map((n: any) => n[0])
        .join("")
        .toUpperCase()
    : "U";

  return (
    <div className="flex min-h-screen flex-col">
      <header className="border-b bg-white">
        <div className="container flex h-16 items-center justify-between px-4">
          <div className="flex items-center gap-4">
            <Link href="/dashboard" className="font-semibold text-lg">
              TodoApp
            </Link>
          </div>
          <div className="flex items-center gap-4">
            <nav className="hidden md:flex gap-4">
              <Link
                href="/dashboard"
                className="flex items-center gap-1 hover:text-blue-600 transition"
              >
                <ListTodo className="w-4 h-4" /> Current Tasks
              </Link>
              <Link
                href="/dashboard/completed"
                className="flex items-center gap-1 hover:text-blue-600 transition"
              >
                <CheckSquare className="w-4 h-4" /> Completed Tasks
              </Link>
            </nav>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="rounded-full" size="icon">
                  <Avatar className="h-8 w-8">
                    <AvatarImage
                      key={session.user.image || "placeholder"}
                      src={
                        session.user.image
                          ? `${session.user.image}?t=${Date.now()}`
                          : ""
                      }
                      alt={session.user.name || "User"}
                      className="avatar-image"
                    />
                    <AvatarFallback>{initials}</AvatarFallback>
                  </Avatar>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem asChild>
                  <ProfileUploadButton userId={session.user.id} />
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link
                    href="/api/auth/signout"
                    className="w-full flex items-center"
                  >
                    <LogOut className="mr-2 h-4 w-4" />
                    <span>Log out</span>
                  </Link>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </header>
      <main className="flex-1 container mx-auto p-4">{children}</main>
      <footer className="border-t py-4 text-center text-sm text-gray-500">
        <div className="container">
          <p>© {new Date().getFullYear()} TodoApp. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}
