import { z } from "zod";

export const SearchValidateSchema = z.object({
  query: z.string().min(3, { message: "Minimum three characters required!" }),
});
