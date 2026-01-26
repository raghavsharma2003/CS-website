"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { ArrowRight, Menu, X, ExternalLink } from "lucide-react";
import { cn } from "@/src/lib/utils";
import { CBAM_COLLECT_URL } from "../lib/constants";
import Image from "next/image";

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // Handle background opacity on scroll
  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 0);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav
      className={cn(
        "fixed top-0 left-0 right-0 w-full z-50 transition-all duration-300 bg-white shadow-sm border-b border-slate-200/60",
        isScrolled ? "bg-white/95 backdrop-blur-md shadow-md" : "bg-white"
      )}
    >
      <div className="container mx-auto px-4 md:px-6 h-16 md:h-20 flex items-center justify-between">
        {/* Brand */}
        <Link
          href="/"
          className="flex items-center gap-2 group"
        >
          {/* The Logo */}
          <Image
            src="/logo1.png"
            alt="CarbonSettle"
            width={32}
            height={32}
            className="w-8 h-8 md:w-10 md:h-10 object-contain group-hover:opacity-90 transition-opacity"
          />

          {/* The Text */}
          <span className="text-base md:text-xl font-mono font-black tracking-tighter leading-none text-slate-900">
            CARBON
            <span className="text-blue-700 group-hover:text-blue-600 transition-colors">
              SETTLE
            </span>
          </span>
        </Link>

        {/* Desktop Links */}
        <div className="hidden md:flex items-center gap-8 lg:gap-12 text-[12px] font-bold uppercase tracking-[0.1em] text-slate-500">
          <NavLink href="/blog">Knowledge Hub</NavLink>
          <NavLink href="/pricing">Pricing</NavLink>
          <NavLink href="/about">About Us</NavLink>
        </div>

        {/* Right Side - Mobile Menu + CTA */}
        <div className="flex items-center gap-3 md:gap-5">
          {/* Secondary Desktop CTA: Talk to Expert */}
          <Link
            href="/contact"
            className="hidden md:inline-flex items-center px-6 py-2.5 text-[11px] font-extrabold uppercase tracking-widest text-emerald-900 bg-emerald-50/80 border border-emerald-300 hover:bg-emerald-100 hover:border-emerald-400 hover:-translate-y-0.5 active:scale-95 rounded-lg transition-all duration-200 shadow-sm"
          >
            Talk to Expert
          </Link>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="md:hidden p-2 hover:bg-slate-50 rounded-md transition-colors border border-transparent hover:border-slate-200"
            aria-label="Toggle menu"
          >
            {isMobileMenuOpen ? (
              <X size={24} className="text-slate-700" />
            ) : (
              <Menu size={24} className="text-slate-700" />
            )}
          </button>

          {/* Primary CTA Button: CBAM Check (Compliance Green) */}
          <a
            href={CBAM_COLLECT_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="group px-6 py-2.5 md:px-8 md:py-3 bg-emerald-600 text-white text-[11px] md:text-[12px] font-bold rounded-lg uppercase tracking-wider hover:bg-emerald-700 hover:shadow-md hover:-translate-y-0.5 active:scale-95 transition-all duration-200 flex items-center gap-2 shadow-md border border-emerald-600"
          >
            <span className="hidden sm:inline">CBAM Check</span>
            <span className="sm:hidden">Check</span>
            <ExternalLink
              size={14}
              className="group-hover:translate-x-1 transition-transform opacity-100"
            />
          </a>
        </div>
      </div>

      {/* Mobile Dropdown Menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden absolute top-full left-0 right-0 bg-white border-b border-slate-200 shadow-xl py-4 px-4 animate-in slide-in-from-top-2">
          <div className="space-y-2">
            <MobileNavLink href="/blog" onClick={() => setIsMobileMenuOpen(false)}>
              Knowledge Hub
            </MobileNavLink>
            <MobileNavLink href="/pricing" onClick={() => setIsMobileMenuOpen(false)}>
              Pricing
            </MobileNavLink>
            <MobileNavLink href="/about" onClick={() => setIsMobileMenuOpen(false)}>
              About Us
            </MobileNavLink>
          </div>

          <div className="border-t border-slate-100 my-4 pt-4 space-y-3">
            <Link
              href="/contact"
              onClick={() => setIsMobileMenuOpen(false)}
              className="block w-full text-center py-3 text-sm font-bold text-emerald-700 bg-emerald-50 rounded-md border border-emerald-100"
            >
              Talk to Expert
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
}

function NavLink({
  href,
  children,
}: {
  href: string;
  children: React.ReactNode;
}) {
  return (
    <Link
      href={href}
      className="relative py-1 text-slate-500 hover:text-slate-900 transition-colors duration-200 group"
    >
      <span>{children}</span>
      <span className="absolute bottom-0 left-0 w-full h-[2px] bg-emerald-500 origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-200 ease-out" />
    </Link>
  );
}

function MobileNavLink({
  href,
  children,
  onClick,
}: {
  href: string;
  children: React.ReactNode;
  onClick: () => void;
}) {
  return (
    <Link
      href={href}
      onClick={onClick}
      className="block px-4 py-3 text-base font-bold text-slate-600 hover:bg-slate-50 hover:text-emerald-700 rounded-md transition-colors"
    >
      {children}
    </Link>
  );
}
