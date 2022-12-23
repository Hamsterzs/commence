import { useState, useCallback, useMemo } from "react";
import type { z } from "zod";
import debounce from "lodash/debounce";

export const useForm = <TValidator extends Zod.AnyZodObject>(
  validator: TValidator,
  initialValue: z.infer<TValidator>
) => {
  type TErrors = { [P in keyof typeof initialValue]: string[] };
  type TForm = typeof initialValue;

  const createErrorsObj = useCallback((): TErrors => {
    const initialErrors: TErrors = { ...initialValue };

    (Object.keys(initialValue) as (keyof TForm)[]).forEach((key) => {
      initialErrors[key] = [];
    });

    return initialErrors;
  }, [initialValue]);

  const [form, setForm] = useState(initialValue);
  const [errors, setErrors] = useState<TErrors>(createErrorsObj);

  const validateSingleField = useCallback(
    (key: keyof TForm, value: string) => {
      console.log("========= validating ==========");
      const data = validator
        .pick({ [key]: true as const })
        .safeParse({ [key]: value });

      setErrors({ ...errors, [key]: [] });

      type flattenErrors = z.inferFlattenedErrors<typeof validator>;

      if (!data.success) {
        const newErrors: flattenErrors = data.error.flatten();

        // @ts-expect-error: I don't know how to fix this
        const fieldErrors = newErrors.fieldErrors[key];

        setErrors({ ...errors, [key]: fieldErrors });
      }
    },
    [errors, validator]
  );

  const debouncedValidate = useMemo(
    () => debounce(validateSingleField, 500),
    [validateSingleField]
  );

  const changeSingleField = (key: keyof TForm, value: string) => {
    setForm((oldForm) => ({ ...oldForm, [key]: value }));

    debouncedValidate(key, value);
  };

  const validateForm = () => {
    const data = validator.safeParse(form);

    if (!data.success) {
      setErrors(createErrorsObj);

      data.error.issues.forEach((error) => {
        if (
          error.path[0] &&
          typeof error.path[0] === "string" &&
          error.path[0] in errors
        )
          setErrors((oldErrors) => {
            const key = error.path[0] as keyof TErrors;

            const errorsArray: string[] = oldErrors[key] || [];

            return {
              ...oldErrors,
              [key]: [...errorsArray, error.message],
            };
          });
      });

      return false;
    }

    setErrors(createErrorsObj);
    return true;
  };

  return {
    form,
    validateForm,
    errors,
    validateSingleField,
    changeSingleField,
  };
};

export default useForm;
