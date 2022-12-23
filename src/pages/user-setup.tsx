import React from "react";
import useUpdateNavbar from "hooks/useUpdateNavbar";
import { ROUTES } from "store/navBar";
import useForm from "hooks/useForm";
import {
  UserFormModel,
  getInitailFormValues,
  emptyFormValues,
} from "shared/model/UserModel";
import { trpc } from "utils/trpc";
import { toast } from "react-toastify";

const User = () => {
  useUpdateNavbar(ROUTES.MEMBER);
  const { data: user, isLoading: userLoading } =
    trpc.auth.getSelf.useQuery(undefined);
  const utils = trpc.useContext();

  const initialFormValues = user ? getInitailFormValues(user) : emptyFormValues;

  const {
    form,
    changeSingleField,
    errors,
    validateSingleField,
    validateForm,
    setExternalErrors,
  } = useForm(UserFormModel, initialFormValues);

  const updateSelf = trpc.auth.updateSelf.useMutation({
    onSuccess: (data) => {
      utils.auth.getSelf.setData(undefined, data);
      toast.success("User updated");
    },
    onError: (error) => {
      toast.error("Error updating user");
      if (error.data?.zodError) {
        const zodError = error.data.zodError;
        const fieldErrors = zodError.fieldErrors;

        setExternalErrors(fieldErrors);
      }
    },
  });

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const validForm = validateForm();

    if (!validForm) return toast.error("Form is not valid");

    updateSelf.mutate(form);
  };

  if (userLoading) return <div>Loading...</div>;

  if (!user) return <div>Not logged in</div>;

  if (user)
    return (
      <div className="relative mt-navHeight flex h-availableHeight items-center justify-center overflow-auto bg-gray-100">
        <form
          className="flex h-[3000px] w-11/12 max-w-5xl flex-col items-center justify-center gap-2 rounded-md py-7 text-lg md:max-w-3xl"
          onSubmit={handleSubmit}
        >
          <h1 className="font-title text-4xl">User</h1>
          <InputElement
            label="Username:"
            onChange={(e) => changeSingleField("username", e.target.value)}
            value={form.username}
            onBlur={() => validateSingleField("username", form.username)}
            errors={errors.username}
          />
          <InputElement
            label="First name:"
            onChange={(e) => changeSingleField("name", e.target.value)}
            value={form.name}
            onBlur={() => validateSingleField("name", form.name)}
            errors={errors.name}
          />
          <InputElement
            label="Last name:"
            onChange={(e) => changeSingleField("lastName", e.target.value)}
            value={form.lastName}
            onBlur={() => validateSingleField("lastName", form.lastName)}
            errors={errors.lastName}
          />
          <InputElement
            label="Job title:"
            onChange={(e) => changeSingleField("jobTitle", e.target.value)}
            value={form.jobTitle}
            onBlur={() => validateSingleField("jobTitle", form.jobTitle)}
            errors={errors.jobTitle}
          />
          <InputElement
            label="Description:"
            onChange={(e) => changeSingleField("description", e.target.value)}
            value={form.description}
            onBlur={() => validateSingleField("description", form.description)}
            errors={errors.description}
          />
          <button className="my-4 w-4/5 rounded-full bg-blue-500 py-3 font-title font-bold tracking-wider text-white shadow-xl active:opacity-70 md:w-2/5">
            Save
          </button>
        </form>
      </div>
    );
};

type InputElementProps = {
  label: string;
  value: string | number;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onBlur?: (e: React.FocusEvent<HTMLInputElement>) => void;
  errors: string[];
};

const InputElement = ({
  label,
  value,
  onChange,
  onBlur,
  errors,
}: InputElementProps) => {
  return (
    <div className="flex w-4/5 flex-col py-4 md:w-2/5">
      <h1 className="text-lg">{label}</h1>
      <div className="text-sm text-red-500">{errors[0]}</div>
      <input
        value={value}
        onChange={onChange}
        onBlur={onBlur}
        className={`text-md h-10 rounded-2xl border-2 border-blue-200 bg-white py-6 px-5 pr-16 shadow-lg focus:outline-none ${
          !!errors.length ? "border-red-500" : ""
        }`}
      />
    </div>
  );
};

export default User;
