import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { signupSchema, type SignupForm } from "../lib/validation";
import { useAuth } from "../state/AuthContext";
import { Button } from "../ui/Button";
import { FormField } from "../ui/FormField";
import { AuthShell } from "./LoginPage";

export function SignupPage() {
  const { signup } = useAuth();
  const navigate = useNavigate();
  const [serverError, setServerError] = useState("");
  const { register, handleSubmit, formState } = useForm<SignupForm>({ resolver: zodResolver(signupSchema) });

  const onSubmit = handleSubmit(async (values) => {
    setServerError("");
    try {
      await signup(values);
      navigate("/account", { replace: true });
    } catch {
      setServerError("We could not create this account. The email may already be registered.");
    }
  });

  return (
    <AuthShell title="Create your account" subtitle="Securely manage appointments, profile details, and treatment history.">
      <form onSubmit={onSubmit} className="grid gap-5">
        <FormField label="Full name" error={formState.errors.fullName}>
          <input className="field" autoComplete="name" {...register("fullName")} />
        </FormField>
        <FormField label="Email" error={formState.errors.email}>
          <input className="field" type="email" autoComplete="email" {...register("email")} />
        </FormField>
        <FormField label="Phone" error={formState.errors.phone}>
          <input className="field" autoComplete="tel" {...register("phone")} />
        </FormField>
        <FormField label="Password" error={formState.errors.password}>
          <input className="field" type="password" autoComplete="new-password" {...register("password")} />
        </FormField>
        {serverError && <p className="error">{serverError}</p>}
        <Button type="submit" disabled={formState.isSubmitting}>Create Account</Button>
        <p className="text-sm text-ink/70">
          Already registered? <Link className="font-semibold text-rosewood" to="/login">Log in</Link>
        </p>
      </form>
    </AuthShell>
  );
}
