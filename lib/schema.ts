import { z } from "zod";

export const PatientSchema = z.object({
  first_name: z
  .string()
  .min(1, "First name is required"),
  last_name: z
  .string()
  .min(1, "Last name is required"),
  date_of_birth: z
  .coerce
  .date()
  .min(1, "Date of birth is required"),
  clerkUserId: z
  .string()
  .min(1, "Clerk User ID is required"),
  email: z
  .string()
  .email("Invalid email address"),
  Phone_number: z
  .string()
  .min(10, "Phone number must be at least 10 digits"),
  gender: z
  .enum(["male", "female", "other"], {message: "Gender is required"}),

  address: z
  .string()
  .optional(),
  city: z
  .string()
  .optional(),
  state: z
  .string()
  .optional(),
  zip_code: z
  .string()
  .optional(),
  country: z
  .string()
  .optional(),

  marital_status: z
  .enum(["single", "married", "divorced", "widowed"]),
  emergency_contact_name: z
  .string(),
  emergency_contact_phone: z
  .string(),
  relation: z
  .enum(["mother", "father", "sibling", "spouse", "friend", "other"]),

  blood_type: z
  .enum(["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"])
  .optional(),
  allergies: z
  .string()
  .optional(),
  existing_conditions: z
  .string()
  .optional(),
  medications: z
  .string()
  .optional(),
  medical_history: z
  .string()
  .optional(),
  insurance_provider: z
  .string()
  .optional(),
  insurance_policy_number: z
  .string()
  .optional(),
  privacy_consent: z
  .boolean()
  .default(false)
  .refine((val) => val === true, {
    message: "You must consent to our privacy policy",
  }),
  service_consent: z
  .boolean()
  .default(false)
  .refine((val) => val === true, {
    message: "You must consent to our terms of service",
  }),
  medical_consent: z
  .boolean()
  .default(false)
  .refine((val) => val === true, {
    message: "You must consent to medical treatment",
  }),
  image: z
    .string()
    .optional(),

});
