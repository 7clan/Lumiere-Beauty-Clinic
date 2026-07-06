import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { loginSchema, type LoginForm } from "../lib/validation";
import { useAuth } from "../state/AuthContext";
import { Button } from "../ui/Button";
import { FormField } from "../ui/FormField";

export function LoginPage() {
  const { login } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [serverError, setServerError] = useState("");
  const from = (location.state as { from?: string } | null)?.from ?? "/account";
  const { register, handleSubmit, formState } = useForm<LoginForm>({ resolver: zodResolver(loginSchema) });

  const onSubmit = handleSubmit(async (values) => {
    setServerError("");
    try {
      await login(values);
      navigate(from, { replace: true });
    } catch {
      setServerError("Invalid email or password.");
    }
  });

  return (
    <AuthShell title="Welcome back" subtitle="Access your appointment history and upcoming treatment requests.">
      <form onSubmit={onSubmit} className="grid gap-5">
        <FormField label="Email" error={formState.errors.email}>
          <input className="field" type="email" autoComplete="email" {...register("email")} />
        </FormField>
        <FormField label="Password" error={formState.errors.password}>
          <input className="field" type="password" autoComplete="current-password" {...register("password")} />
        </FormField>
        {serverError && <p className="error">{serverError}</p>}
        <Button type="submit" disabled={formState.isSubmitting}>Log in</Button>
        <div className="flex flex-wrap justify-between gap-3 text-sm">
          <Link className="font-semibold text-rosewood" to="/reset-password">Reset password</Link>
          <Link className="font-semibold text-rosewood" to="/signup">Create account</Link>
        </div>
      </form>
    </AuthShell>
  );
}

export function AuthShell({ title, subtitle, children }: { title: string; subtitle: string; children: React.ReactNode }) {
  return (
    <section className="bg-pearl px-4 py-16 sm:px-6 lg:px-8">
      <div className="mx-auto grid max-w-6xl overflow-hidden rounded-lg bg-white shadow-soft lg:grid-cols-2">
        <img src="https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?auto=format&fit=crop&w=1100&q=85" alt="" className="hidden h-full min-h-[620px] w-full object-cover lg:block" />
        <div className="p-6 sm:p-10 lg:p-14">
          <h1 className="font-display text-5xl font-semibold">{title}</h1>
          <p className="mt-3 text-ink/70">{subtitle}</p>
          <div className="mt-8">{children}</div>
        </div>
      </div>
    </section>
  );
}
