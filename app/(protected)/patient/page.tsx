import { UserButton } from "@clerk/nextjs";
import { getRole } from "@/utils/roles";

export default async function PatientPage() {
  const role = await getRole();

  return (
    <div className="flex flex-col gap-6">
      <div className="flex justify-between items-center">
        <h1 className="text-4xl font-bold text-gray-900">Patient Dashboard</h1>
        <UserButton />
      </div>
      
      <div className="bg-white rounded-lg shadow p-6">
        <p className="text-lg text-gray-600">
          Welcome to your patient dashboard, <span className="font-semibold capitalize">{role}</span>!
        </p>
        <p className="mt-4 text-gray-600">
          This is your personalized health management interface.
        </p>
      </div>
    </div>
  );
}
