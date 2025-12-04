"use client";
import { usePathname } from "next/navigation";
import React from "react";

export const NavBar = () => {
    function  formatPathName (): string {
        const pathname = usePathname()

        if (!pathname) return "Overview"
        
        const splitRoute = pathname.split("/")
const lastIndex = splitRoute.length -1 > 2 ? 2 :splitRoute.length - 1

const pathName = splitRoute[lastIndex];

const formattedPath = pathName.replace(/-/g, " ");

return formattedPath;
}
    const path = formatPathName();


};