"use client";

import React from "react";
import db from "./db";


export async function getPatientDataById(userId: string) {
     const data = await db.patient.findUnique({
       where: { clerkUserId: userId }
     });
     return { data };
   }