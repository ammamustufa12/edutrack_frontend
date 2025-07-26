import { z } from "zod";

export const createUserSchema = z.object({
 firstName: z
  .string()
  .min(1, "First name is required")
  .min(2, "First name must be at least 2 characters"),
 lastName: z
  .string()
  .min(1, "Last name is required")
  .min(2, "Last name must be at least 2 characters"),
 email: z
  .string()
  .min(1, "Email is required")
  .email("Please enter a valid email address"),
 phone: z
    .string()
    .min(1, "Phone number is required")
    .regex(/^[0-9]{10,15}$/, "Phone number must be between 10-15 digits"),
  role: z.enum(["Super Admin", "Admin", "Viewer"], {
  required_error: "Please select a role",
 }),
//  password: z
//   .string()
//   .min(8, "Password must be at least 8 characters")
//   .regex(/^(?=.*[0-9])/, "Password must contain at least 1 number")
//   .regex(/^(?=.*[a-zA-Z])/, "Password must contain at least 1 letter"),
});

export type CreateUserFormData = z.infer<typeof createUserSchema>;


// validation.ts (same file as createUserSchema)

export const editUserSchema = z.object({
  firstName: z
    .string()
    .min(1, "First name is required")
    .min(2, "First name must be at least 2 characters"),
  lastName: z
    .string()
    .min(1, "Last name is required")
    .min(2, "Last name must be at least 2 characters"),
  email: z
    .string()
    .min(1, "Email is required")
    .email("Please enter a valid email address"),
  phone: z
    .string()
    .min(1, "Phone number is required")
    .regex(/^[0-9]{10,15}$/, "Phone number must be between 10-15 digits"),
  role: z.enum(["Super Admin", "Admin", "Viewer"], {
    required_error: "Please select a role",
  }),
});

export type EditUserFormData = z.infer<typeof editUserSchema>;


// validation.ts

export const resetPasswordSchema = z.object({
  password: z
    .string()
    .min(8, "Password must be at least 8 characters")
    .regex(/^(?=.*[0-9])/, "Password must contain at least 1 number")
    .regex(/^(?=.*[a-zA-Z])/, "Password must contain at least 1 letter"),
});

export type ResetPasswordFormData = z.infer<typeof resetPasswordSchema>;


