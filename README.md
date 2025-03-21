# Todo List Application

This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

A full-stack Todo List application featuring user authentication, task management, and profile picture uploads.

## Features

- **User Authentication**
  - Secure email/password authentication with NextAuth.js
  - Password hashing with bcrypt
  - Protected routes and session management

- **Task Management**
  - Create, read, update, and delete tasks
  - Mark tasks as completed
  - Separate views for current and completed tasks
  - Track creation and completion dates

- **Profile Management**
  - Upload and update profile pictures
  - Real-time profile image updates

## Tech Stack

- **Frontend**
  - Next.js 15 (App Router)
  - React 18
  - TypeScript
  - Tailwind CSS
  - Shadcn UI Components
  - Lucide React Icons

- **Backend**
  - Next.js API Routes
  - NextAuth.js for authentication
  - MongoDB with Mongoose

## Getting Started

### Prerequisites

- Node.js 18.17.0 or later
- MongoDB database (local or Atlas)
- npm or yarn

### Installation

1. Clone the repository
   ```bash
   git clone https://github.com/yourusername/todo-app.git
   cd todo-app
   ```

2. Install dependencies
   ```bash
   npm install
   ```

3. Create a `.env.local` file in the root directory with the following variables:
   ```
   # MongoDB connection string
   MONGODB_URI=your_mongodb_connection_string
   
   # NextAuth secret (generate a random string)
   NEXTAUTH_SECRET=your_secure_secret_key
   NEXTAUTH_URL=http://localhost:3000
   ```

4. Run the development server

   ```bash
   npm run dev
   # or
   yarn dev
   # or
   pnpm dev
   # or
   bun dev
   ```

5. Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Models

### User
```typescript
{
  name: string,
  email: string,
  password: string,
  image?: string,
  createdAt: Date,
  updatedAt: Date
}
```

### Task
```typescript
{
  title: string,
  description?: string,
  createdAt: Date,
  completedAt?: Date,
  userId: ObjectId
}
```

## API Routes

- **Authentication**
  - `POST /api/auth/signup`: Create a new user account
  - `POST /api/auth/[...nextauth]`: Handle NextAuth requests

- **Tasks**
  - `GET /api/tasks`: Get all tasks for authenticated user
  - `POST /api/tasks`: Create a new task
  - `DELETE /api/tasks/:id`: Delete a task
  - `PATCH /api/tasks/:id/complete`: Mark a task as completed

- **Users**
  - `POST /api/users/:userId/profile-image`: Upload a profile image

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.

## License

This project is licensed under the MIT License.