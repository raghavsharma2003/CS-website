"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { ArrowRight, Menu, X } from "lucide-react";
import { cn } from "@/src/lib/utils";
import Image from "next/image";

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // Handle background opacity on scroll
  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav
      className={cn(
        "fixed top-4 left-1/2 -translate-x-1/2 w-[95%] max-w-7xl z-50 transition-all duration-300 rounded-2xl border border-slate-200/50 shadow-sm",
        isScrolled
          ? "bg-white/90 backdrop-blur-xl py-2 shadow-lg"
          : "bg-white/70 backdrop-blur-lg py-3",
      )}
    >
      <div className="container mx-auto px-3 md:px-6 h-12 md:h-14 flex items-center justify-between">
        {/* Brand */}
        <Link
          href="/"
          className="flex items-center gap-1 group"
        >
          {/* The Logo */}
          <Image
            src="/logo1.png"
            alt="CarbonSettle"
            width={28}
            height={28}
            className="md:w-[38px] md:h-[38px] object-contain group-hover:opacity-80 transition-opacity"
          />

          {/* The Text */}
          <span className="text-sm md:text-lg lg:text-xl font-mono font-black tracking-tighter leading-none">
            CARBON
            <span className="text-blue-700 group-hover:text-blue-600 transition-colors">
              SETTLE
            </span>
          </span>
        </Link>

        {/* Desktop Links */}
        <div className="hidden md:flex items-center gap-6 lg:gap-10 text-[11px] font-bold uppercase tracking-[0.15em] text-slate-500">
          <NavLink href="/blog">Knowledge Hub</NavLink>
          <NavLink href="/pricing">Pricing</NavLink>
          <NavLink href="/about">About Us</NavLink>
        </div>

        {/* Right Side - Mobile Menu + CTA */}
        <div className="flex items-center gap-2 md:gap-4">
          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="md:hidden p-2 hover:bg-slate-100 rounded-lg transition-colors"
            aria-label="Toggle menu"
          >
            {isMobileMenuOpen ? (
              <X size={20} className="text-slate-700" />
            ) : (
              <Menu size={20} className="text-slate-700" />
            )}
          </button>

          {/* CTA Button */}
          <Link
            href="/contact"
            className="group px-3 py-1.5 md:px-5 md:py-2.5 bg-slate-900 text-white text-[9px] md:text-[10px] font-bold rounded-lg md:rounded-xl uppercase tracking-wider md:tracking-widest hover:bg-blue-700 hover:text-slate-100 transition-all duration-300 flex items-center gap-1 md:gap-2"
          >
            <span className="hidden sm:inline">Get Started</span>
            <span className="sm:hidden">Start</span>
            <ArrowRight
              size={12}
              className="md:w-[14px] md:h-[14px] group-hover:translate-x-1 transition-transform"
            />
          </Link>
        </div>
      </div>

      {/* Mobile Dropdown Menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden absolute top-full left-0 right-0 mt-2 mx-4 bg-white rounded-xl shadow-xl border border-slate-200 overflow-hidden">
          <div className="py-2">
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
      className="relative py-1 text-slate-500 hover:text-slate-900 transition-colors duration-300 group overflow-hidden"
    >
      <span>{children}</span>
      {/* Refined Underline Animation */}
      <span className="absolute bottom-0 left-0 w-full h-[1.5px] bg-blue-600 origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-300 ease-out" />
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
      className="block px-4 py-3 text-sm font-semibold text-slate-700 hover:bg-slate-50 hover:text-blue-600 transition-colors"
    >
      {children}
    </Link>
  );
}
