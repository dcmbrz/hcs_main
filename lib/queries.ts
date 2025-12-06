import React from "react";
import db from "./db";


export async function getPatientDataById(userId: string) {
       console.log("=== DEBUG INFO ===");
       console.log("DATABASE_URL exists:", !!process.env.DATABASE_URL);
       console.log("DATABASE_URL preview:", process.env.DATABASE_URL?.substring(0, 30));
       console.log("User ID:", userId);
       
       const data = await db.patient.findUnique({
         where: { clerkUserId: userId }
       });
       return { data };
   }