import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router";
import { useSignupMutation } from "~/hooks/query/useAuth";
import { useFormErrors } from "~/hooks/useFormErrors";
import { signupSchema, type TSignupFormData } from "~/lib/zod-schema/auth";
import { Input } from "../input-field";

function SignupForm() {
  const navigate = useNavigate();

  const { handleApiFormError, apiGeneralError, clearApiErrors, getFieldError } =
    useFormErrors();

  const { isPending, mutate: signup } = useSignupMutation({
    onError: (error) => handleApiFormError(error),
    onSuccess: () => navigate("/login", { replace: true }),
  });

  const {
    register,
    handleSubmit,
    formState: { isSubmitting, errors },
  } = useForm<TSignupFormData>({
    resolver: zodResolver(signupSchema),
  });

  const onSubmit = async (data: TSignupFormData) => {
    clearApiErrors();
    signup(data);
  };
  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      <div className="space-y-4">
        <Input
          label="Name"
          {...register("name")}
          type="text"
          placeholder="Enter your Name here."
          error={getFieldError("name", errors)}
          disabled={isPending}
        />

        <Input
          label="Email"
          {...register("email")}
          type="email"
          placeholder="Enter your email here."
          error={getFieldError("email", errors)}
          disabled={isPending}
        />

        <Input
          label="Password"
          {...register("password")}
          placeholder="Enter password here."
          type="password"
          error={getFieldError("password", errors)}
          disabled={isPending}
        />
      </div>
      {apiGeneralError && (
        <div className="bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded">
          {apiGeneralError}
        </div>
      )}

      <button
        type="submit"
        disabled={isPending || isSubmitting}
        className="w-full flex justify-center py-2 px-4 border border-gray-100 rounded-md shadow-sm text-sm font-medium cursor-pointer focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-accent disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {isPending || isSubmitting ? "Signup..." : "Signup"}
      </button>
    </form>
  );
}

export default SignupForm