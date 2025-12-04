"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import ASCIILogo from "./ASCIILogo";

export default function Navbar() {
  const pathname = usePathname();

  const links = [
    { href: "/", label: "[01] HOME" },
    { href: "/magazines", label: "[02] ARCHIVES" },
    { href: "/socials", label: "[03] SOCIALS" },
    { href: "/about", label: "[04] ABOUT" },
  ];

  return (
    <header className="navbar-header">
      {/* Logo */}
      <div className="navbar-logo">
        <Link href="/" aria-label="Home">
          <ASCIILogo className="w-20 sm:w-28 md:w-48 lg:w-64 h-auto text-[var(--neon-green)] hover:drop-shadow-[0_0_15px_var(--neon-green)] transition-all duration-300" />
        </Link>
      </div>

      {/* Navigation Links */}
      <nav className="navbar-nav">
        {links.map((link) => (
          <Link
            key={link.href}
            href={link.href}
            className={`navbar-link ${pathname === link.href ? "navbar-link-active" : ""}`}
          >
            {link.label}
          </Link>
        ))}
      </nav>
    </header>
  );
}
