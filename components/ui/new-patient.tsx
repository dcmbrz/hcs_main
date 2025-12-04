"use client";

import React, { useState } from "react";
import { Patient } from "@prisma/client";
import { useUser } from "@clerk/nextjs";
import { useRouter } from "next/router";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./card";
import { Form } from "./form";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Phone } from "lucide-react";
import { PatientSchema } from "@/lib/schema";


interface DataProps {
    data?: Patient;
    type: "create" | "update"; // determine if creating new patient or updating existing
}

export const NewPatient = ({ data, type }: DataProps) => {
    const user = useUser();
    const [loading, setLoading] = useState(false);
    const [imageURL, setImageURL] = useState<any>();    //<string>(data?.profileImage || "");
    const router = useRouter();

    const userData = {
        first_name: data?.first_name || "",
        last_name: data?.last_name || "",
        date_of_birth: data?.date_of_birth || "",
        clerkUserId: user.user?.id,
        email: user.user?.emailAddresses[0]?.emailAddress || "",
        Phone_number: data?.Phone_number || "",
    };
    const form = useForm.infer<typeof PatientSchema>({
        resolver: zodResolver(PatientSchema),
        defaultValues: userData,
    });
    return (
    <Card className="max-w-6xl w-full p-4">
        <CardHeader>
            <CardTitle>Patient Registration</CardTitle>
            <CardDescription>
                Please provide all the information below to help us understand your health needs 
                better and provide you with personalized care.
            </CardDescription>
        </CardHeader>
        {/* Form component goes here */}
        <CardContent>
            <Form>

            </Form>
        </CardContent>
    </Card>
    );
}