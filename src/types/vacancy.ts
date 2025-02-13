import { z } from "zod";

export const vacancyFormData = z.object({
  title: z.string().min(2, { message: "Title must be at least 2 characters." }),
  description: z
    .string()
    .min(10, { message: "Description must be at least 10 characters." }),
  jobHighlight: z
    .string()
    .min(5, { message: "Job highlight must be at least 5 characters." }),
  department: z
    .string()
    .min(2, { message: "Department must be at least 2 characters." }),
  employmentType: z.enum(["Full Time", "Part Time", "Internship", "Contract"]),
  location: z
    .string()
    .min(2, { message: "Location must be at least 2 characters." }),
  salaryRange: z
    .object({
      min: z.number().min(0),
      max: z.number().min(0),
    })
    .optional(),
  requiredSkills: z.array(z.string()),
  experience: z
    .array(
      z.object({
        name: z.string(),
        value: z.string(),
      })
    )
    .optional(),
  role: z.string().min(2, { message: "Role must be at least 2 characters." }),
  responsibilities: z.array(z.string()),
  educationRequirements: z.array(z.string()),
  languagePreferences: z.array(z.string()),
  vacanciesCount: z.string(),
  perksAndBenefits: z.array(z.string()).optional(),
  applicationDeadline: z.date().optional(),
  status: z.enum(["Open", "Closed", "On-Hold"]),
  shiftDetails: z
    .object({
      type: z.enum(["Day", "Night", "Rotational"]),
      startTime: z.string().optional(),
      endTime: z.string().optional(),
    })
    .optional(),
  travelRequirements: z.boolean().optional(),
  additionalNotes: z.string().optional(),
});

export type VacancyFormData = z.infer<typeof vacancyFormData>;

// export type EmploymentType = z.infer<typeof vacancyFormData.shape.employmentType>
export type Status = z.infer<typeof vacancyFormData.shape.status>;
// export type JobType = z.infer<typeof vacancyFormData.shape.jobType>
// export type ShiftType = z.infer<typeof vacancyFormData.shape.shiftDetails>
export type Benefits = z.infer<typeof vacancyFormData.shape.perksAndBenefits>;
export type LanguagePreferences = z.infer<
  typeof vacancyFormData.shape.languagePreferences
>;
export type EducationalRequirement = z.infer<
  typeof vacancyFormData.shape.educationRequirements
>;
export type Responsibilities = z.infer<
  typeof vacancyFormData.shape.responsibilities
>;
export type Experiences = z.infer<typeof vacancyFormData.shape.experience>;
export type Skills = z.infer<typeof vacancyFormData.shape.requiredSkills>;
