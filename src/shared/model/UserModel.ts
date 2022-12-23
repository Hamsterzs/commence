import { z } from "zod";
import type { User } from "@prisma/client";

const EMPTY_MESSAGE = "Can't be empty";

export const UserFormModel = z.object({
  name: z.string().min(1, { message: EMPTY_MESSAGE }),
  username: z
    .string()
    .min(3, { message: "Username must be at least 3 characters long" })
    .max(20, { message: "Username must be at most 20 characters long" })
    // no whitespace
    .refine((value) => !/\s/.test(value), {
      message: "Username cannot contain whitespace",
    })
    // no special characters (except -)
    .refine((value) => /^[a-zA-Z0-9-]*$/.test(value), {
      message: "Username can only contain letters, numbers and -",
    }),
  jobTitle: z.string().min(1, { message: EMPTY_MESSAGE }),
  description: z.string().min(1, { message: EMPTY_MESSAGE }),
  lastName: z.string().min(1, { message: EMPTY_MESSAGE }),
});

export const emptyFormValues: z.infer<typeof UserFormModel> = {
  name: "",
  lastName: "",
  username: "",
  jobTitle: "",
  description: "",
};

export const getInitailFormValues = (dbValues: User) => {
  const initialFormValues = emptyFormValues;

  let key: keyof User;

  for (key in initialFormValues) {
    // @ts-expect-error: I am to dumb to figure out how to fix this
    if (dbValues[key]) initialFormValues[key] = dbValues[key];
  }

  return initialFormValues;
};
