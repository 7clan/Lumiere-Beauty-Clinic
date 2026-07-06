import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { api } from "../lib/api";
import { resetSchema, type ResetForm } from "../lib/validation";
import { Button } from "../ui/Button";
import { FormField } from "../ui/FormField";
import { AuthShell } from "./LoginPage";

export function ResetPasswordPage() {
  const [sent, setSent] = useState(false);
  const { register, handleSubmit, formState } = useForm<ResetForm>({ resolver: zodResolver(resetSchema) });

  const onSubmit = handleSubmit(async (values) => {
    await api.post("/auth/reset-password", values);
    setSent(true);
  });

  return (
    <AuthShell title="Reset password" subtitle="Request a secure reset link for your account.">
      {sent ? (
        <div className="rounded-lg bg-pearl p-5 text-sm font-semibold text-ink">If an account exists for that email, a reset link has been sent.</div>
      ) : (
        <form onSubmit={onSubmit} className="grid gap-5">
          <FormField label="Email" error={formState.errors.email}>
            <input className="field" type="email" autoComplete="email" {...register("email")} />
          </FormField>
          <Button type="submit" disabled={formState.isSubmitting}>Send Reset Link</Button>
        </form>
      )}
    </AuthShell>
  );
}
