"use server"

import { PatientSchema } from "@/lib/schema";
import { clerkClient } from "@clerk/nextjs/server";
import { pid } from "process";
import { success } from "zod";

export async function createPatient(data: any) {
    try{
        const validData = PatientSchema.safeParse(data);

        if (!validData.success) {
            return {
                success: false,
                error: true,
                msg: "Please fill all required fields correctly.",
            };
    }

    const patientData = validData.data;
    let patient_id = pid;

    if (pid === "new-patient") {
const client = await clerkClient();

const user = await client.users.createUser({
            emailAddress: [patientData.email],
            password: patientData.Phone_number,
            firstName: patientData.first_name,
            lastName: patientData.last_name,
            publicMetadata: { role: "patient" },
        });

        patient_id = user?.id;
    } else {
        await client.users.updateUser(pid, {
            publicMetadata: { role: "patient" },
        });
    }

    await db.patient.create({
        data: {
            ...patientData,
            Id: patient_id,
        },
    });

    return {
        success: true,
        error: false,
        msg: "Patient created successfully.",
    };

} catch (error: any) {
    console.error(error);
    return {
        success: false,
        error: true,
        msg: "An error occurred while creating the patient:"+ error?.message,
    }
}
}