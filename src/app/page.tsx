import Link from "next/link";
import { Button } from "@/components/ui/button";
import { CheckCircle, UserPlus, ClipboardList } from "lucide-react";

export default function HomePage() {
  return (
    <div className="flex flex-col min-h-screen">
      <header className="border-b bg-white">
        <div className="container flex h-16 items-center justify-between px-4">
          <div className="flex items-center gap-4">
            <Link href="/" className="font-semibold text-lg">
              TodoApp
            </Link>
          </div>
          <div className="flex items-center gap-4">
            <Link href="/auth/signin">
              <Button variant="ghost">Sign In</Button>
            </Link>
            <Link href="/auth/signup">
              <Button>Sign Up</Button>
            </Link>
          </div>
        </div>
      </header>

      <main className="flex-1">
        <section className="py-20 px-4 bg-gradient-to-b from-white to-gray-100">
          <div className="container mx-auto max-w-5xl text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              Manage Your Tasks with Ease
            </h1>
            <p className="text-lg md:text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
              Stay organized, track your progress, and accomplish more with our
              intuitive task management application.
            </p>
            <Link href="/auth/signup">
              <Button size="lg" className="px-8">
                Get Started
              </Button>
            </Link>
          </div>
        </section>

        <section className="py-16 px-4 bg-white">
          <div className="container mx-auto max-w-5xl">
            <h2 className="text-3xl font-bold text-center mb-12">
              Key Features
            </h2>
            <div className="grid md:grid-cols-3 gap-8">
              <div className="flex flex-col items-center text-center p-6 border rounded-lg shadow-sm">
                <div className="w-12 h-12 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center mb-4">
                  <ClipboardList className="w-6 h-6" />
                </div>
                <h3 className="text-xl font-semibold mb-2">Task Management</h3>
                <p className="text-gray-600">
                  Create, organize, and manage your tasks efficiently. Keep
                  track of what needs to be done.
                </p>
              </div>
              <div className="flex flex-col items-center text-center p-6 border rounded-lg shadow-sm">
                <div className="w-12 h-12 bg-green-100 text-green-600 rounded-full flex items-center justify-center mb-4">
                  <CheckCircle className="w-6 h-6" />
                </div>
                <h3 className="text-xl font-semibold mb-2">
                  Progress Tracking
                </h3>
                <p className="text-gray-600">
                  Mark tasks as completed and review your accomplishments. See
                  your productivity grow over time.
                </p>
              </div>
              <div className="flex flex-col items-center text-center p-6 border rounded-lg shadow-sm">
                <div className="w-12 h-12 bg-purple-100 text-purple-600 rounded-full flex items-center justify-center mb-4">
                  <UserPlus className="w-6 h-6" />
                </div>
                <h3 className="text-xl font-semibold mb-2">User Profiles</h3>
                <p className="text-gray-600">
                  Personalize your experience with custom profiles and profile
                  pictures. Make the app your own.
                </p>
              </div>
            </div>
          </div>
        </section>

        <section className="py-16 px-4 bg-blue-50">
          <div className="container mx-auto max-w-3xl text-center">
            <h2 className="text-3xl font-bold mb-6">Ready to Get Organized?</h2>
            <p className="text-lg text-gray-600 mb-8">
              Join thousands of users who have improved their productivity with
              TodoApp.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/auth/signup">
                <Button size="lg" className="px-8 w-full sm:w-auto">
                  Sign Up Now
                </Button>
              </Link>
              <Link href="/auth/signin">
                <Button
                  variant="outline"
                  size="lg"
                  className="px-8 w-full sm:w-auto"
                >
                  Sign In
                </Button>
              </Link>
            </div>
          </div>
        </section>
      </main>

      <footer className="border-t py-8 bg-white">
        <div className="container mx-auto px-4 text-center text-gray-500">
          <p>© {new Date().getFullYear()} TodoApp. All rights reserved.</p>
          <p className="mt-2 text-sm">
            A full stack application built with Next.js, Tailwind CSS, and
            MongoDB.
          </p>
        </div>
      </footer>
    </div>
  );
}
