import { UserButton } from "@clerk/nextjs";
import { getRole } from "@/utils/roles";
import { Bell } from "lucide-react";

export default async function PatientPage() {
  const role = await getRole();

  return (
    <div className="flex flex-col">
      <div className="flex justify-between items-center">
        <h1 className="text-4xl font-bold text-gray-900">Patient Dashboard</h1>
        <div className="flex items-center gap-4">
          {/* Bell notification */}
          <div className="relative">
            <Bell className="w-6 h-6 text-gray-500 cursor-pointer hover:text-gray-900"/>
            <p className="absolute -top-3 right-1 size-4 bg-red-600 text-white rounded-full text-[10px] text-center">
            </p>
          </div> 
          <UserButton />
        </div>
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
