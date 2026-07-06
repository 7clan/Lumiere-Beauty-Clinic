import type { FieldError } from "react-hook-form";

export function FormField({
  label,
  error,
  children
}: {
  label: string;
  error?: FieldError;
  children: React.ReactNode;
}) {
  return (
    <label className="block">
      <span className="label">{label}</span>
      <div className="mt-2">{children}</div>
      {error && <p className="error">{error.message}</p>}
    </label>
  );
}
