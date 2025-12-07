import { Sidebar } from "@/components/ui/sidebar";
import React from "react";
import { NavBar } from "@/components/ui/NavBar";

const ProtectedLayout = ({ children }: { children: React.ReactNode }) => {
    return (
        <div className="w-full min-h-screen flex bg-gray-200">
            
            {/* Sidebar */}
            <div className="w-[14%] md:w-[8%] lg:w-[16%] xl:w-[14%]">
                <Sidebar />
            </div>

            {/* Main content */}
            <div className="flex-1 bg-[#F7F8FA] flex flex-col">
                <NavBar />

                {/* This should scroll ONLY at the page level */}
                <div className="flex-1 w-full p-4 overflow-y-auto">
                    {children}
                </div>
            </div>
        </div>
    );
};

export default ProtectedLayout;
