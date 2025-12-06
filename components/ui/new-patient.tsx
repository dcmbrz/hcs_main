"use client";

import React, { useState } from "react";
import { Patient } from "@prisma/client";
import { useUser } from "@clerk/nextjs";
import { useRouter } from "next/navigation";
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
        defaultValues: { userData },
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
            
            <CardContent>
                <Form {...form}>
                    <form onSubmit={() => {}} className="space-y-8 mt-5 w-full">
                        {/* Personal Information Section */}
                        <div className="space-y-6">
                            <h3 className="text-lg font-semibold">Personal Information</h3>
                            
                            {/* ImagePicker would go here */}

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
                                    name="Phone_number"
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
                            </div>

                            <CustomInput
                                type="input"
                                control={form.control}
                                name="address"
                                label="Address"
                                placeholder="1234 Street, Apt 567, NYC"
                            />
                        </div>

                        {/* Family Information Section */}
                        <div className="space-y-6">
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
                                label="Emergency Contact Phone"
                                placeholder="123-456-7890"
                            />
                        </div>

                        {/* Medical Information Section */}
                        <div className="space-y-6">
                            <h3 className="text-lg font-semibold">Medical Information</h3>
                            
                            <CustomInput
                                type="input"
                                control={form.control}
                                name="blood_type"
                                label="Blood Type"
                                placeholder="A+, A-, B+, B-, AB+, AB-, O+, O-"
                            />
                            <CustomInput
                                type="input"
                                control={form.control}
                                name="allergies"
                                label="Allergies"
                                placeholder="List any allergies you have"
                            />
                            <CustomInput
                                type="input"
                                control={form.control}
                                name="existing_conditions"
                                label="Existing Medical Conditions"
                                placeholder="List any existing medical conditions"
                            />
                            <CustomInput
                                type="input"
                                control={form.control}
                                name="medical_history"
                                label="Medical History"
                                placeholder="Provide a brief medical history"
                            />
                            
                            <div className="flex flex-col lg:flex-row gap-y-6 items-center gap-2 md:gap-x-4">
                                <CustomInput
                                    type="input"
                                    control={form.control}
                                    name="insurance_provider"
                                    label="Insurance Provider"
                                    placeholder="Name of your insurance provider"
                                />
                                <CustomInput
                                    type="input"
                                    control={form.control}
                                    name="insurance_policy_number"
                                    label="Insurance Policy Number"
                                    placeholder="Your insurance policy number"
                                />
                            </div>
                        </div>

                        {/* Consents Section */}
                        {type !== "update" && (
                            <div className="space-y-6">
                                <h3 className="text-lg font-semibold">Consents</h3>
                                
                                <CustomInput
                                    name="privacy_consent"
                                    control={form.control}
                                    label="Privacy Policy Consent"
                                    placeholder="I consent to the collection, storage, and use of my personal and health information as outlined in the Privacy Policy. I understand how my information will be used, who it may be shared with, and my rights regarding access, correction, and deletion of my data."
                                    type="checkbox"
                                />
                                <CustomInput
                                    name="service_consent"
                                    control={form.control}
                                    label="Terms of Service Consent"
                                    placeholder="I agree to abide by the terms and conditions set forth in the Terms of Service, including my responsibilities as a user of this healthcare service, and the limitations of liability for the service provider. I understand that continued use of this service is contingent upon my acceptance of these terms."
                                    type="checkbox"
                                />
                                <CustomInput
                                    name="medical_consent"
                                    control={form.control}
                                    label="Medical Treatment Consent"
                                    placeholder="I give my consent to receive medical treatment and procedures as deemed necessary by the healthcare professionals. I acknowledge that I have been informed of the nature, risk, benefits, and alternatives of the proposed treatments. I understand that I have the right to ask questions and withdraw my consent at any time."
                                    type="checkbox"
                                />
                            </div>
                        )}
                    </form>
                </Form>
            </CardContent>
        </Card>
    );
}