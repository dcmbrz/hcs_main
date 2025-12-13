// fetches information about the patient 

import db from "@/lib/db";
import { success } from "zod";

export async function getPatientById(id:string) {
    try {
        const patient = await db.patient.findUnique({
            where: { id },
        });
        
        if (!patient) {
            return {
                success: false,
                message: "Patient not found",
                status: 200,
                data: null,
            };
        }
        return {
            success: true,
            data: patient,
            message: "Patient fetched successfully",
            status: 200,
        };
    } catch (error) {
        console.log("Error fetching patient:", error);
        return {
            success: false,
            message: "Internal server error",
            status: 500,
            data: null,
        };
    }
        }