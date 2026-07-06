import { Menu, Sparkles, X } from "lucide-react";
import { useState } from "react";
import { Link, NavLink, Outlet } from "react-router-dom";
import { useAuth } from "../state/AuthContext";
import { Button } from "./Button";

const navItems = [
  { to: "/", label: "Home" },
  { to: "/about", label: "About" },
  { to: "/services", label: "Services" },
  { to: "/contact", label: "Contact" }
];

export function Layout() {
  const [open, setOpen] = useState(false);
  const { user, logout } = useAuth();

  const links = (
    <>
      {navItems.map((item) => (
        <NavLink
          key={item.to}
          to={item.to}
          onClick={() => setOpen(false)}
          className={({ isActive }) =>
            `rounded-full px-3 py-2 text-sm font-semibold transition ${isActive ? "bg-rosewood/10 text-rosewood" : "text-ink hover:bg-white/70"}`
          }
        >
          {item.label}
        </NavLink>
      ))}
      {user?.role === "ADMIN" && (
        <NavLink to="/admin" onClick={() => setOpen(false)} className="rounded-full px-3 py-2 text-sm font-semibold text-ink hover:bg-white/70">
          Admin
        </NavLink>
      )}
    </>
  );

  return (
    <div className="min-h-screen text-ink">
      <header className="sticky top-0 z-50 border-b border-white/70 bg-ivory/88 shadow-sm backdrop-blur-xl">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4 sm:px-6 lg:px-8">
          <Link to="/" className="flex items-center gap-3">
            <span className="grid h-10 w-10 place-items-center rounded-full bg-rosewood text-white">
              <Sparkles size={18} />
            </span>
            <span>
              <span className="block font-display text-2xl font-bold leading-none">Lumiere</span>
              <span className="block text-xs font-semibold uppercase tracking-[0.22em] text-taupe">Beauty Clinic</span>
            </span>
          </Link>
          <nav className="hidden items-center gap-1 md:flex">{links}</nav>
          <div className="hidden items-center gap-3 md:flex">
            {user ? (
              <>
                <Button to="/book" className="py-2.5">Book</Button>
                <Button to="/account" variant="secondary" className="py-2.5">Account</Button>
                <Button variant="ghost" onClick={logout} className="py-2.5">Log out</Button>
              </>
            ) : (
              <>
                <Button to="/login" variant="ghost" className="py-2.5">Log in</Button>
                <Button to="/signup" className="py-2.5">Create Account</Button>
              </>
            )}
          </div>
          <button className="focus-ring rounded-full p-2 md:hidden" onClick={() => setOpen((value) => !value)} aria-label="Toggle menu">
            {open ? <X /> : <Menu />}
          </button>
        </div>
        {open && (
          <div className="border-t border-white/70 bg-ivory px-4 py-4 md:hidden">
            <nav className="flex flex-col gap-2">{links}</nav>
            <div className="mt-4 grid gap-2">
              {user ? (
                <>
                  <Button to="/book" onClick={() => setOpen(false)}>Book Appointment</Button>
                  <Button to="/account" variant="secondary" onClick={() => setOpen(false)}>Account</Button>
                  <Button variant="ghost" onClick={logout}>Log out</Button>
                </>
              ) : (
                <>
                  <Button to="/login" variant="secondary" onClick={() => setOpen(false)}>Log in</Button>
                  <Button to="/signup" onClick={() => setOpen(false)}>Create Account</Button>
                </>
              )}
            </div>
          </div>
        )}
      </header>
      <main>
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}

function Footer() {
  return (
    <footer className="bg-ink text-white">
      <div className="mx-auto grid max-w-7xl gap-8 px-4 py-12 sm:px-6 md:grid-cols-4 lg:px-8">
        <div className="md:col-span-2">
          <p className="font-display text-3xl font-semibold">Lumiere Beauty Clinic</p>
          <p className="mt-3 max-w-md text-sm leading-6 text-white/75">Premium skincare, advanced aesthetics, and personalized beauty care in a calm clinical setting.</p>
        </div>
        <div>
          <p className="font-semibold">Visit</p>
          <p className="mt-3 text-sm text-white/75">18 Rose Avenue<br />Beverly Hills, CA</p>
        </div>
        <div>
          <p className="font-semibold">Contact</p>
          <p className="mt-3 text-sm text-white/75">+1 (310) 555-0188<br />hello@lumiereclinic.com</p>
        </div>
      </div>
    </footer>
  );
}
