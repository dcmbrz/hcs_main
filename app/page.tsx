import { UserButton } from "@clerk/nextjs";
import { auth } from "@clerk/nextjs/server";
import Image from "next/image";
import Link from "next/link";

export default async function Home() {
  const { userId } = await auth();

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-6">
      <div className="flex-1 flex flex-col items-center justify-center max-w-4xl">
        <div className="mb-8 text-center">
          <h1 className="text-4xl md:text-5xl font-bold">
            Welcome to <br />
            <span className="text-blue-700 text-5xl md:text-6xl"> 
              Ekwuety Health 
            </span>
          </h1>
          
          <p className="mt-6 text-lg md:text-xl text-gray-600 max-w-2xl">
            Your comprehensive platform for managing, tracking, 
            and empowering patients.
          </p>
        </div>

        <div className="flex flex-col sm:flex-row gap-4 mt-8">
          {userId ? (
            <>
            <Link 
              href="/dashboard"
              className="px-8 py-3 bg-blue-700 text-white rounded-lg font-semibold hover:bg-blue-800 transition"
            >
              Go to Dashboard
            </Link>
            <UserButton/>
            </>
          ) : (
            
            <>
              <Link 
                href="/sign-up"
                className="px-8 py-3 bg-blue-700 text-white rounded-lg font-semibold hover:bg-blue-800 transition"
              >
                Get Started
              </Link>

              <Link 
                href="/sign-in"
                className="px-8 py-3 border-2 border-blue-700 text-blue-700 rounded-lg font-semibold underline hover:bg-blue-50 transition"
              >
                Log In
              </Link>
            </>
          )}
        </div>
      </div>
    </div>
  );
}