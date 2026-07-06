import { Link } from "react-router-dom";

type ButtonProps = {
  children: React.ReactNode;
  variant?: "primary" | "secondary" | "ghost";
  to?: string;
  type?: "button" | "submit";
  onClick?: () => void;
  disabled?: boolean;
  className?: string;
};

const styles = {
  primary: "bg-ink text-white hover:bg-rosewood shadow-soft",
  secondary: "border border-champagne/60 bg-white/80 text-ink hover:bg-champagne/10",
  ghost: "text-ink hover:bg-rosewood/10"
};

export function Button({ children, variant = "primary", to, type = "button", onClick, disabled, className = "" }: ButtonProps) {
  const classNames = `focus-ring inline-flex items-center justify-center rounded-full px-5 py-3 text-sm font-semibold transition disabled:cursor-not-allowed disabled:opacity-60 ${styles[variant]} ${className}`;
  if (to) {
    return (
      <Link to={to} onClick={onClick} className={classNames}>
        {children}
      </Link>
    );
  }
  return (
    <button type={type} onClick={onClick} disabled={disabled} className={classNames}>
      {children}
    </button>
  );
}
