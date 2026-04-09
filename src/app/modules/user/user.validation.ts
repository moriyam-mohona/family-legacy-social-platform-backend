import { z } from "zod";
import { CitizenshipType, RelationshipStatus } from "@prisma/client";

const updateProfileSchema = z.object({
  body: z.object({
    name: z.string().optional(),
    gender: z.string().optional(),
    dob: z.string().datetime().or(z.date().transform((d) => d.toISOString())).optional(),
    phone: z.string().optional(),
    image: z.string().optional(),
    citizenship: z.nativeEnum(CitizenshipType).optional(),
    educationDetails: z.string().optional(),
    relationshipStatus: z.nativeEnum(RelationshipStatus).optional(),
    workStatus: z.string().optional(),
    fatherName: z.string().optional(),
    fatherMobile: z.string().optional(),
    fatherEmail: z.string().optional(),
    fatherDob: z.string().datetime().or(z.date().transform((d) => d.toISOString())).optional(),
    motherName: z.string().optional(),
    motherMobile: z.string().optional(),
    motherEmail: z.string().optional(),
    motherDob: z.string().datetime().or(z.date().transform((d) => d.toISOString())).optional(),
  }).strict(), // ensure no extra fields
});

export const UserValidation = {
  updateProfileSchema,
};
