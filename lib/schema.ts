import { z } from "zod";

export const PatientSchema = z.object({
  first_name: z.string().min(1, "First name is required"),
  last_name: z.string().min(1, "Last name is required"),
  date_of_birth: z.coerce.date(),
  email: z.string().email("Invalid email address"),
  phone: z.string().min(10, "Phone number must be at least 10 digits"),
  gender: z.enum(['MALE', 'FEMALE',], { message: "Gender is required" }),
  
  address: z.string().min(1, "Address is required"),
  marital_status: z.string().min(1, "Marital status is required"),
  
  emergency_contact_name: z.string().min(1, "Emergency contact name is required"),
  emergency_contact_number: z.string().min(10, "Emergency contact phone is required"), // Changed from emergency_contact_phone
  emergency_contact_relationship: z.string().min(1, "Relationship is required"),
  
  blood_type: z.string().optional(),
  allergies: z.string().optional(),
  existing_conditions: z.string().optional(),
  medical_history: z.string().optional(),
  
  insurance_provider: z.string().optional(),
  insurance_policy_number: z.string().optional(), // Changed from insurance_policy_number
  
  privacy_consent: z.boolean().default(false).refine((val) => val === true, {
    message: "You must consent to our privacy policy",
  }),
  service_consent: z.boolean().default(false).refine((val) => val === true, {
    message: "You must consent to our terms of service",
  }),
  medical_consent: z.boolean().default(false).refine((val) => val === true, {
    message: "You must consent to medical treatment",
  }),
  
  img: z.string().optional(),
});