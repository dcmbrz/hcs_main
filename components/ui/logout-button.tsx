"use client"; 

import React from "react";
import { Button } from "./button";
import { LogOut } from "lucide-react";
import { useClerk } from "@clerk/nextjs";
import { redirect } from "next/dist/server/api-utils";


export const LogoutButton = () => {
    const { signOut } = useClerk();
    return (
        <Button
            variant = {"ghost"}
            className = "w-fit bottom-0 gap-2 px-0 md:px-4"
            onClick = {() => signOut({ redirectUrl: "/sign-in" })}
            >
            <LogOut />
            <span className="hidden lg:block">Logout</span>
            </Button>
    )
}