import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { authOptions } from "@/src/lib/auth/authOptions";
import { SignInButton } from "@/src/Components/auth/SignInButton";

export default async function SignInPage() {
  const session = await getServerSession(authOptions);

  if (session) {
    redirect("/");
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2">
      <div className="p-8 bg-white rounded-lg shadow-md">
        <h1 className="mb-4 text-2xl font-bold text-center">Welcome to Flowmazon</h1>
        <p className="mb-4 text-center text-gray-600">Please sign in to continue</p>
        <SignInButton />
      </div>
    </div>
  );
} 