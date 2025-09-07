import Link from "next/link";

export default function Navbar() {
  return (
    <header className="sticky top-0 z-50 glass border-b border-slate-200/50 backdrop-blur-md">
      <div className="container py-4 flex items-center justify-between">
        <Link
          href="/"
          className="font-bold text-2xl bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent hover:from-blue-700 hover:to-indigo-700 transition-all duration-200"
        >
          Job Portal PRO
        </Link>
        <nav className="flex items-center gap-8">
          <Link href="/jobs" className="nav-link">
            Jobs
          </Link>
          <Link href="/dashboard" className="nav-link">
            Dashboard
          </Link>
          <Link href="/login" className="nav-link">
            Login
          </Link>
          <Link href="/register" className="btn btn-primary">
            <span className="mr-2">🚀</span>
            Sign up
          </Link>
        </nav>
      </div>
    </header>
  );
}
