"use server"

import { PatientSchema } from "@/lib/schema";
import { clerkClient } from "@clerk/nextjs/server";
import db from "@/lib/db";

export async function createPatient(data: any, userId: string | undefined) {
    try {
        const validData = PatientSchema.safeParse(data);

        if (!validData.success) {
            return {
                success: false,
                msg: "Please fill all required fields correctly.",
            };
        }

        if (!userId) {
            return {
                success: false,
                msg: "User ID is required.",
            };
        }

        const patientData = validData.data;

        // Update the user's metadata to mark them as a patient
        const client = await clerkClient();
        await client.users.updateUser(userId, {
            publicMetadata: { role: "patient" },
        });

               // Create the patient record in the database
        await db.patient.create({
            data: {
                first_name: patientData.first_name,
                last_name: patientData.last_name,
                email: patientData.email,
                phone: patientData.phone, 
                date_of_birth: patientData.date_of_birth,
                gender: patientData.gender,
                marital_status: patientData.marital_status,
                address: patientData.address,
                emergency_contact_name: patientData.emergency_contact_name,
                emergency_contact_relationship: patientData.emergency_contact_relationship,
                emergency_contact_number: patientData.emergency_contact_number, 
                blood_type: patientData.blood_type || null,
                allergies: patientData.allergies || null,
                existing_conditions: patientData.existing_conditions || null,
                medical_history: patientData.medical_history || null,
                insurance_provider: patientData.insurance_provider || null,
                insurance_policy_number: patientData.insurance_policy_number || null,
                medical_consent: patientData.medical_consent,
                privacy_consent: patientData.privacy_consent,
                service_consent: patientData.service_consent,
                img: patientData.img || null,
                clerkUserId: userId,
            },
        });

        return {
            success: true,
            msg: "Patient registered successfully!",
        };

    } catch (error: any) {
        console.error("Error creating patient:", error);
        return {
            success: false,
            msg: "An error occurred while creating the patient: " + error?.message,
        };
    }
}