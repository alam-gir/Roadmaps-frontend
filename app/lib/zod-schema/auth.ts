import { z } from "zod";

export const loginSchema = z.object({
  email: z.string().min(1, "Email is required!").email("Enter a valid email."),
  password: z.string().min(1, "Password is required!"),
});

export const signupSchema = z.object({
  name: z
    .string()
    .min(1, "Name is required!")
    .min(3, "Name is required at least 3 characters!")
    .max(50, "Name must be less then 50 characters!"),
  email: z.string().min(1, "Email is required!").email("Enter a valid email."),
  password: z
    .string()
    .min(1, "Password is required!")
    .min(6, "Passwor must be logner then 5 characters.")
    .max(16, "Password must be less then 16 characters.")
    .regex(
      /^(?=.*[A-Za-z])(?=.*\d)/,
      "Password must contain at least one letter and one number"
    ),
});

export type TLoginFormData = z.infer<typeof loginSchema>;
export type TSignupFormData = z.infer<typeof signupSchema>;
