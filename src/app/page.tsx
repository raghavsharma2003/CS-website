"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import {
  Shield,
  ArrowRight,
  Activity,
  FileText,
  CheckCircle2,
  Upload,
} from "lucide-react";
import LiabilityCalculator from "@/src/components/forensic/LiabilityCalculator";
import ComplianceProcessCard from "@/src/components/ComplianceProcessCard";
import { CBAM_COLLECT_URL } from "../lib/constants";
import dynamic from "next/dynamic";

import Image from "next/image";

// Dynamically import XMLViewerModal with SSR disabled
const XMLViewerModal = dynamic(
  () => import("@/src/components/XMLViewerModal"),
  { ssr: false }
);

export default function HomePage() {
  const [isXMLModalOpen, setIsXMLModalOpen] = useState(false);
  return (
    <main className="min-h-screen">
      {/* 1. Hero Section */}
      <section className="relative pt-14 md:pt-18 pb-16 md:pb-32 overflow-hidden border-b border-slate-200">
        <div className="container mx-auto px-4 md:px-6">
          <div className="flex flex-col lg:flex-row items-center gap-8 md:gap-12">
            {/* Left Content */}
            <div className="flex-1 lg:flex-[0.8] space-y-4 md:space-y-8 z-10 text-center lg:text-left">
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                className="inline-flex items-center gap-1.5 md:gap-2 px-2 md:px-3 py-1 rounded-full bg-red-50 border border-red-200 text-red-700 text-xs md:text-sm font-bold uppercase tracking-wide md:tracking-widest"
              >
                <Activity size={14} className="md:w-[16px] md:h-[16px]" />
                <span className="hidden sm:inline">⚠️ EU STATUS: MANDATORY REPORTING ACTIVE</span>
                <span className="sm:hidden">⚠️ EU CBAM ACTIVE</span>
              </motion.div>

              <h1 className="text-3xl sm:text-4xl md:text-4xl lg:text-5xl xl:text-6xl font-extrabold tracking-tight text-slate-900 leading-[1.1]">
                Export to the EU. <br />
                <span className="text-blue-500">Zero Customs Delays.</span>
              </h1>

              <p className="text-sm sm:text-base md:text-lg lg:text-xl text-slate-600 max-w-xl leading-relaxed mx-auto lg:mx-0">
                Don't pay the penalty for "Default Values." We generate
                audit-proof CBAM certificates using your actual factory
                data—guaranteeing the lowest legal carbon tax for Indian Steel
                & Fastener exporters.
              </p>

              <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-3 md:gap-4">
                <a
                  href={CBAM_COLLECT_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full sm:w-auto px-6 md:px-8 py-3 md:py-4 bg-slate-900 hover:bg-emerald-600 text-white hover:text-white font-bold rounded-xl transition-all flex items-center justify-center gap-2 md:gap-3 shadow-xl active:scale-95 text-sm md:text-base cursor-pointer"
                >
                  CBAM Check <ArrowRight size={16} className="md:w-[18px] md:h-[18px]" />
                </a>
                <button
                  onClick={() => setIsXMLModalOpen(true)}
                  className="w-full sm:w-auto px-6 md:px-8 py-3 md:py-4 bg-white border border-slate-200 hover:border-slate-900 text-slate-700 font-bold rounded-xl transition-all text-sm md:text-base"
                >
                  View Sample Report
                </button>
              </div>
            </div>

            {/* Right Content - Card Image */}
            <div className="flex-1 lg:flex-[1] w-full relative z-10 mt-8 lg:mt-0">
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.2 }}
                className="relative rounded-2xl overflow-hidden shadow-2xl border-[0px] border-white ring-1 ring-slate-200 min-h-[400px] sm:min-h-[450px] md:min-h-[500px]"
              >
                <Image
                  src="/hero_background_final.png"
                  alt="Industrial Worker"
                  width={1200}
                  height={1200}
                  className="w-full h-full min-h-[400px] sm:min-h-[450px] md:min-h-[500px] object-cover"
                  priority
                />
                {/* Compliance Flow Animation Overlay */}
                <ComplianceProcessCard />
              </motion.div>
            </div>
          </div>
        </div>

        {/* XML Viewer Modal */}
        <XMLViewerModal
          isOpen={isXMLModalOpen}
          onClose={() => setIsXMLModalOpen(false)}
        />
      </section>

      {/* 2. Compliance Gap Comparison */}
      <section
        className="py-12 md:py-16 lg:py-20 bg-slate-50"
        style={{
          backgroundImage: `
            linear-gradient(to right, rgba(148, 163, 184, 0.05) 1px, transparent 1px),
            linear-gradient(to bottom, rgba(148, 163, 184, 0.05) 1px, transparent 1px)
          `,
          backgroundSize: '40px 40px'
        }}
      >
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-4">Manual Audits vs. <br /> Forensic Engineering</h2>
            <p className="text-slate-600 max-w-2xl mx-auto text-lg">
              Traditional consultants rely on "Default Values" that place you in the highest tax bracket. We prove your actual efficiency.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
            {/* Card A: Old Way */}
            <div className="p-8 rounded-2xl border border-red-200 bg-red-50/30 h-full">
              <h3 className="text-xl font-bold text-slate-700 mb-6">
                Traditional Consultants
              </h3>
              <ul className="space-y-4">
                <ListItem status="bad" text="Manual Entry (High Error Risk)" />
                <ListItem
                  status="bad"
                  text="Default Values (Highest Tax Tier)"
                />
                <ListItem
                  status="bad"
                  text="Generic Service (No Industrial Context)"
                />
              </ul>
            </div>

            {/* Card B: CarbonSettle Way */}
            <div className="p-8 rounded-2xl border-t-4 border-emerald-500 bg-white shadow-2xl h-full">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-xl font-bold text-slate-900">
                  The CarbonSettle Standard
                </h3>
                <div className="px-3 py-1 bg-emerald-100 text-emerald-800 text-xs font-bold uppercase tracking-wide rounded-full">
                  ISO 14064 COMPLIANT
                </div>
              </div>
              <ul className="space-y-4">
                <ListItem
                  status="good"
                  text="Forensic Extraction (Direct Bill Analysis)"
                />
                <ListItem
                  status="good"
                  text="Actual Values (Lower Certificate Costs)"
                />
                <ListItem
                  status="good"
                  text="Process Engineering (Expert Pickling/Drawing Logic)"
                />
              </ul>
            </div>
          </div>

          {/* Methodology Link */}
          <div className="text-center mt-8">
            <a href="#" className="text-blue-600 hover:text-blue-800 font-medium inline-flex items-center gap-2">
              {/* See our full Methodology & Standards → */}
            </a>
          </div>
        </div>
      </section>

      {/*  3. How It Works (Blueprint Workflow) */}
      <section className="py-8 md:py-12 lg:py-16 bg-white overflow-hidden">
        <div className="container mx-auto px-6">
          <div className="text-center mb-20">
            <h2 className="text-lg font-bold text-blue-500 uppercase tracking-[0.3em] mb-4">
              Operational Protocol
            </h2>
            <p className="text-2xl sm:text-3xl md:text-4xl font-bold text-slate-900 tracking-tight">
              Three Steps to EU Registry Approval
            </p>
          </div>

          <div className="relative">
            {/* Technical Connector Line (Desktop Only) */}
            <div className="hidden lg:block absolute top-1/2 left-0 w-full h-[2px] bg-slate-100 -translate-y-1/2 z-0" />

            <div className="grid lg:grid-cols-3 gap-12 relative z-10">
              {/* Step 1 */}
              <div className="bg-white p-8 rounded-2xl border border-slate-100 shadow-sm group hover:border-slate-900 transition-all">
                <div className="w-16 h-16 bg-slate-50 border border-slate-200 rounded-xl flex items-center justify-center mb-8 group-hover:bg-blue-900 group-hover:text-white transition-colors">
                  <Upload size={28} strokeWidth={1.5} />
                </div>
                <div className="space-y-4">
                  <h4 className="text-xs font-mono font-bold text-slate-400 uppercase tracking-widest">
                    Phase 01 / Data Ingestion
                  </h4>
                  <h3 className="text-xl font-bold">You Upload.</h3>
                  <p className="text-slate-500 leading-relaxed">
                    Simply drop your electricity bills, production tonnage logs,
                    and fuel receipts into our secure portal. No manual forms.
                  </p>
                </div>
              </div>

              {/* Step 2 */}
              <div className="bg-white p-8 rounded-2xl border border-slate-100 shadow-sm group hover:border-slate-900 transition-all">
                <div className="w-16 h-16 bg-slate-50 border border-slate-200 rounded-xl flex items-center justify-center mb-8 group-hover:bg-blue-900 group-hover:text-white transition-colors">
                  <Activity size={28} strokeWidth={1.5} />
                </div>
                <div className="space-y-4">
                  <h4 className="text-xs font-mono font-bold text-slate-400 uppercase tracking-widest">
                    Phase 02 / Forensic Mapping
                  </h4>
                  <h3 className="text-xl font-bold">We Compute.</h3>
                  <p className="text-slate-500 leading-relaxed">
                    Our engine maps raw energy data to specific HS Codes (Bolts,
                    Wire, Bars) using actual emission factors, not guesses.
                  </p>
                </div>
              </div>

              {/* Step 3 */}
              <div className="bg-white p-8 rounded-2xl border border-slate-100 shadow-sm group hover:border-slate-900 transition-all">
                <div className="w-16 h-16 bg-slate-50 border border-slate-200 rounded-xl flex items-center justify-center mb-8 group-hover:bg-blue-900 group-hover:text-white transition-colors">
                  <FileText size={28} strokeWidth={1.5} />
                </div>
                <div className="space-y-4">
                  <h4 className="text-xs font-mono font-bold text-slate-400 uppercase tracking-widest">
                    Phase 03 / Final Settlement
                  </h4>
                  <h3 className="text-xl font-bold">Audit Ready.</h3>
                  <p className="text-slate-500 leading-relaxed">
                    Receive an EU-compliant XML file and a verified summary
                    report, ready for direct upload to the CBAM Transitional
                    Registry.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section
        id="calculator-section"
        className="py-12 md:py-16 lg:py-20 bg-slate-50 border-t border-slate-200"
        style={{
          backgroundImage: `
            linear-gradient(to right, rgba(148, 163, 184, 0.05) 1px, transparent 1px),
            linear-gradient(to bottom, rgba(148, 163, 184, 0.05) 1px, transparent 1px)
          `,
          backgroundSize: '40px 40px'
        }}
      >
        <div className="container mx-auto px-6">
          <div className="flex flex-col lg:flex-row items-start gap-20">
            <div className="flex-1 space-y-8">
              <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight leading-tight">
                The Cost of <br />
                <span className="text-red-600">Guessing.</span>
              </h2>
              <p className="text-xl text-slate-600 leading-relaxed max-w-xl">
                Using default values forces you into the highest tax tier.
                Switch to actual data to protect your margins.
              </p>
              <div className="space-y-6 pt-4">
                <div className="flex gap-4 items-start">
                  <div className="mt-2 w-3 h-3 rounded-full bg-blue-500 flex-shrink-0" />
                  <p className="text-base text-slate-600 leading-relaxed">
                    <strong className="text-slate-900">Anti-Circumvention:</strong> EU customs now use
                    real-time data exchange to verify authorized declarants.
                  </p>
                </div>
                <div className="flex gap-4 items-start">
                  <div className="mt-2 w-3 h-3 rounded-full bg-blue-500 flex-shrink-0" />
                  <p className="text-base text-slate-600 leading-relaxed">
                    <strong className="text-slate-900">Threshold Enforcement:</strong> Imports above 50
                    tonnes require mandatory financial guarantees for new
                    startups.
                  </p>
                </div>
              </div>
            </div>

            <div className="flex-1 w-full max-w-2xl">
              <LiabilityCalculator />
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}

// Helper Components
function TerminalLine({
  text,
  color,
  delay,
}: {
  text: string;
  color: string;
  delay: number;
}) {
  return (
    <motion.p
      initial={{ opacity: 0, x: -10 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay }}
      className={color}
    >
      {text}
    </motion.p>
  );
}

function ListItem({ text, status }: { text: string; status: "good" | "bad" }) {
  // Split text at first parenthesis or space to bold the key term
  const parts = text.match(/^([^(]+)(\(.+\))$/) || [text, text, ''];
  const keyTerm = parts[1]?.trim() || text;
  const detail = parts[2] || '';

  return (
    <li className="flex items-center gap-3 group">
      {status === "good" ? (
        <div className="w-6 h-6 rounded-full bg-green-100 flex items-center justify-center text-green-600 flex-shrink-0 transition-colors group-hover:bg-green-200 group-hover:text-green-700">
          <CheckCircle2 size={16} />
        </div>
      ) : (
        <div className="w-6 h-6 rounded-full bg-red-100 flex items-center justify-center text-red-600 font-bold text-sm flex-shrink-0 transition-colors group-hover:bg-red-200 group-hover:text-red-700">
          ✕
        </div>
      )}
      <span className={status === "good" ? "text-slate-700" : "text-slate-700"}>
        <strong>{keyTerm}</strong> {detail}
      </span>
    </li>
  );
}
