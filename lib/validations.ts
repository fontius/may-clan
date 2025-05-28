import { z } from "zod";

export const validationSchema = z.object({
  email: z.string().email("Invalid email address"),
  message: z.string().min(10, "Message must be at least 10 characters"),
});
