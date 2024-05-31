import * as z from "zod";

export const SignInSchema = z.object({
  password: z.string().min(6),
  email: z.string().email({ message: "Use a valid email" }),
});

export const SignUpSchema = z
  .object({
    username: z.string().min(2, {
      message: "Username must be at least 2 characters.",
    }),
    password: z
      .string()
      .min(6, { message: "Password must be atleast 6 characters" }),
    confirm: z.string(),
    email: z.string().email({ message: "Use a valid email" }),
  })
  .refine((data) => data.password === data.confirm, {
    message: "Passwords don't match",
    path: ["confirm"],
  });
