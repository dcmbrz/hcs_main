import { createRouteMatcher } from "@clerk/nextjs/server";

export const routeMatchers = {
  admin: createRouteMatcher([
    "/admin(.*)",
    "/patient(.*)",
    "/record/users",
    "/record/doctors(.*)",
    "/record/patients",
    "/record/doctors",
    "/record/staffs",
    "/record/patients",
  ]),
  
  patient: createRouteMatcher([
    "/patient(.*)", 
    "/patient/registrations"
  ]),
  
  doctor: createRouteMatcher([
    "/doctor(.*)",
    "/record/doctors(.*)",
    "/record/patients",
    "/patient(.*)",
    "/record/staffs",
    "/record/patients",
  ]),

  nurse: createRouteMatcher([
    "/nurse(.*)",
    "/record/patients",
    "/record/residents",
    "/care-tasks(.*)",
  ]),
};

// Alternative: Role-based access control (easier to manage)
export const routeAccess: Record<string, string[]> = {
  // Admin routes
  "/admin(.*)": ["admin"],
  "/record/users": ["admin"],
  
  // Doctor routes
  "/doctor(.*)": ["doctor", "admin"],
  "/record/doctors(.*)": ["doctor", "admin"],
  
  // Patient routes
  "/patient(.*)": ["patient", "doctor", "nurse", "admin"],
  "/patient/registrations": ["patient"],
  
  // Records
  "/record/patients": ["doctor", "nurse", "admin"],
  "/record/staffs": ["admin", "doctor"],
  
  // Nurse routes
  "/nurse(.*)": ["nurse", "admin"],
  "/care-tasks(.*)": ["nurse", "admin"],
  "/record/residents": ["nurse", "admin"],
};