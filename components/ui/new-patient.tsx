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
import { z } from "zod";
import { CustomInput } from "./custom-input";
import { GENDER, MARITAL_STATUS, RELATIONSHIP } from "@/lib";


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
    const form = useForm<z.infer<typeof PatientSchema>>({
        resolver: zodResolver(PatientSchema),
        defaultValues: {userData,},
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
            <Form {...form}>
            {/* Form fields go here */}
            <form onSubmit={()=> {}} className="space-y-8 mt-5 w-full">
                <h3 className="text-lg font-semibold">Personal Information</h3>
                <>
                    {/* ImagePicker/> */}

                    <div className="flex flex-col lg:flex-row gap-y-6 items-center gap-2 md:gap-x-4">
                        <CustomInput
                            type="input"
                            control={form.control}
                            name="first_name"
                            label="First Name"
                            placeholder="Enter your first name"
                            />
                        <CustomInput
                            type="input"
                            control={form.control}
                            name="last_name"
                            label="Last Name"
                            placeholder="Enter your last name"
                            />
                    </div>
                        <CustomInput
                            type="input"
                            control={form.control}
                            name="email"
                            label="Email Address"
                            placeholder="JohnDoe@email.com"
                            />
                    <div className="flex flex-col lg:flex-row gap-y-6 items-center gap-2 md:gap-x-4">
                        <CustomInput
                            type="input"
                            control={form.control}
                            name="gender"
                            label="Gender"
                            placeholder="select gender"
                            selectList={GENDER}
                        />
                        <CustomInput
                            type="input"
                            control={form.control}
                            name="date_of_birth"
                            label="Date of Birth"
                            placeholder="Select your date of birth"
                            inputType="date"
                        />
                    </div>
                    <div className="flex flex-col lg:flex-row gap-y-6 items-center gap-2 md:gap-x-4">
                        <CustomInput
                            type="input"
                            control={form.control}
                            name="phone number"
                            label="Phone Number"
                            placeholder="Contact number"
                        />
                        <CustomInput
                            type="input"
                            control={form.control}
                            name="marital_status"
                            label="Marital Status"
                            placeholder="Select your marital status"
                            selectList={MARITAL_STATUS!}
                        />
                        <CustomInput
                            type="input"
                            control={form.control}
                            name="address"
                            label="Address"
                            placeholder="1234 Street, Apt 567, NYC"
                        />
                    <div className="space-y-8">
                        <h3 className="text-lg font-semibold">Family Information</h3>
                        <CustomInput
                            type="input"
                            control={form.control}
                            name="emergency_contact_name"
                            label="Emergency Contact Name"
                            placeholder="Full name of emergency contact"
                        />
                        <CustomInput
                            type="input"
                            control={form.control}
                            name="emergency_contact_relationship"
                            label="Relationship to Emergency Contact"
                            placeholder="e.g., Mother, Father, Sibling"
                            selectList={RELATIONSHIP}
                        />
                        <CustomInput
                            type="input"
                            control={form.control}
                            name="emergency_contact_phone"
                            label="123-456-7890"
                            placeholder="Phone number of emergency contact"
                        />
                    </div>
                </>
            </form>
            </Form>
        </CardContent>
    </Card>
    );
}