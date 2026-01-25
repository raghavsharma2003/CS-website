"use client";
import React from "react";
import Link from "next/link";
import Image from "next/image";
import { Mail, Phone, MapPin } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-slate-900 text-white pt-16 pb-8 border-t border-slate-800">
      <div className="container mx-auto px-6">
        {/* Main Footer Content - 4 Columns */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
          
          {/* Column 1: Identity */}
          <div className="space-y-6">
            <Link href="/" className="flex items-center gap-2">
              <Image
                src="/logo1.png"
                width={40}
                height={40}
                alt="CarbonSettle Logo"
                className="object-contain"
              />
              <span className="text-xl font-black tracking-tighter">
                CARBON<span className="text-blue-500">SETTLE</span>
              </span>
            </Link>
            
            <p className="text-slate-400 text-sm leading-relaxed">
              Forensic CBAM compliance for Indian exporters.
            </p>
            
            {/* Badges */}
            <div className="flex flex-col gap-2">
              <div className="px-3 py-1.5 border border-white/20 rounded-lg text-xs font-semibold text-slate-300 inline-block w-fit">
                ISO 14064-1 Compliant
              </div>
              <div className="px-3 py-1.5 border border-white/20 rounded-lg text-xs font-semibold text-slate-300 inline-block w-fit">
                GDPR Ready
              </div>
            </div>
          </div>

          {/* Column 2: Platform */}
          <div className="space-y-4">
            <h4 className="font-bold text-white uppercase tracking-wider text-sm">
              Platform
            </h4>
            <ul className="space-y-3 text-slate-400 text-sm">
              <li>
                <Link href="/#calculator-section" className="hover:text-white transition-colors">
                  Liability Calculator
                </Link>
              </li>
              <li>
                <Link href="/dashboard/validator" className="hover:text-white transition-colors">
                  XML Validator
                </Link>
              </li>
              <li>
                <Link href="/knowledge" className="hover:text-white transition-colors">
                  Knowledge Hub
                </Link>
              </li>
              <li>
                <Link href="/pricing" className="hover:text-white transition-colors">
                  Pricing
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 3: Company */}
          <div className="space-y-4">
            <h4 className="font-bold text-white uppercase tracking-wider text-sm">
              Company
            </h4>
            <ul className="space-y-3 text-slate-400 text-sm">
              <li>
                <Link href="/about" className="hover:text-white transition-colors">
                  About Us
                </Link>
              </li>
              <li>
                <Link href="/privacy" className="hover:text-white transition-colors">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link href="/terms" className="hover:text-white transition-colors">
                  Terms of Service
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 4: Contact */}
          <div className="space-y-4">
            <h4 className="font-bold text-white uppercase tracking-wider text-sm">
              Compliance Desk
            </h4>
            <ul className="space-y-3 text-slate-400 text-sm">
              <li className="flex items-start gap-2">
                <Mail size={16} className="mt-0.5 flex-shrink-0 text-blue-400" />
                <a 
                  href="mailto:compliance@carbonsettle.com" 
                  className="text-white hover:text-blue-400 transition-colors"
                >
                  compliance@carbonsettle.com
                </a>
              </li>
              <li className="flex items-start gap-2">
                <Phone size={16} className="mt-0.5 flex-shrink-0 text-blue-400" />
                <a 
                  href="tel:+917627028724" 
                  className="hover:text-white transition-colors"
                >
                  +91 7627028724
                </a>
              </li>
              <li className="flex items-start gap-2">
                <MapPin size={16} className="mt-0.5 flex-shrink-0 text-blue-400" />
                <span>
                  Corporate Base:<br />
                  New Delhi / NCR, India
                </span>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-slate-800 flex flex-col md:flex-row justify-between items-center gap-4 text-slate-500 text-xs">
          <p>
            © 2026 CarbonSettle. All rights reserved.
          </p>
          <p className="text-slate-600">
            Made for Indian Industry
          </p>
        </div>
      </div>
    </footer>
  );
}