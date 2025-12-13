import { NewPatient } from "@/components/ui/new-patient";
import { getPatientById } from "@/utils/services/patient";
import { auth } from "@clerk/nextjs/server";
import React from "react";



const Registration = async() => {
    const {userId} = await auth()

    const {data} = await getPatientById(userId!)
    console.log("Patient Data:", data);


    return (
    <div className="py-6 px-3 flex justify-center">
            <NewPatient data={data ?? undefined} type={!data ? "create" : "update"} />
        </div>
    );
};

export default Registration;
