import { NewPatient } from "@/components/ui/new-patient";
import { getPatientDataById } from "@/lib/queries";
import { auth } from "@clerk/nextjs/server";
import React from "react";



const Registration = async() => {
    const {userId} = await auth()
    const {data} = await getPatientDataById(userId!)

    return (
    <div className="py-6 px-3 flex justify-center">
            <NewPatient data={data ?? undefined} type={!data ? "create" : "update"} />
        </div>
    );
};

export default Registration;
