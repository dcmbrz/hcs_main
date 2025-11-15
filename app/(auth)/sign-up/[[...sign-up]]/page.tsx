import { SignUp } from '@clerk/nextjs'

export default function Page() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50">
      <h1 className="text-3xl font-bold text-blue-700 mb-8">
        Ekwuety Health
      </h1>
      <SignUp 
        appearance={{
          elements: {
            rootBox: "mx-auto",
            card: "shadow-xl"
          }
        }}
        afterSignUpUrl="/dashboard"
      />
    </div>
  )
}
