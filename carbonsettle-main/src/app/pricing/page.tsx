"use client";

import React, { useState } from "react";
import { Check, TrendingUp, AlertCircle, Sparkles, Building2, Rocket } from "lucide-react";
import Link from "next/link";

export default function PricingPage() {
  return (
    <main className="min-h-screen bg-slate-50 pt-20 pb-32">
      {/* Grid Background Pattern */}
      <div 
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage: `
            linear-gradient(to right, rgba(148, 163, 184, 0.05) 1px, transparent 1px),
            linear-gradient(to bottom, rgba(148, 163, 184, 0.05) 1px, transparent 1px)
          `,
          backgroundSize: '40px 40px'
        }}
      />

      <div className="container mx-auto px-6 relative z-10">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-20">
          <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold tracking-tight mb-6">
            Transparent Compliance Pricing
          </h1>
          <p className="text-xl text-slate-600 leading-relaxed">
            Predictable service fees in INR. Precise liability estimation in EUR. 
            No hidden costs—just audit-proof engineering.
          </p>
        </div>

        {/* Pricing Cards - 3 Column Layout */}
        <div className="grid md:grid-cols-3 gap-8 max-w-7xl mx-auto mb-32">
          
          {/* Card 1: Single Facility */}
          <div className="p-8 rounded-2xl border-2 border-slate-200 bg-white shadow-lg hover:shadow-xl transition-all">
            <div className="flex items-center gap-2 mb-4">
              <Building2 size={24} className="text-blue-600" />
              <h3 className="text-xl font-bold text-slate-900">
                Single Facility
              </h3>
            </div>
            
            <div className="mb-6">
              <div className="flex items-baseline gap-1">
                <span className="text-5xl font-bold text-slate-900">Standard Rate</span>
                {/* <span className="text-slate-500 font-medium">/qtr</span> */}
              </div>
              <p className="text-sm text-slate-500 mt-2">
                For specialized exporters with 1-2 HS Codes.
              </p>
            </div>

            <ul className="space-y-4 mb-8">
              <FeatureItem text="Single Factory Model" />
              <FeatureItem text="Automated Bill Extraction" />
              <FeatureItem text="Quarterly XML Generation" />
              <FeatureItem text="Standard EU Filing Support" />
            </ul>

            <Link 
              href="/contact"
              className="block w-full py-4 text-center border-2 border-slate-900 text-slate-900 font-bold rounded-xl hover:bg-slate-900 hover:text-white transition-all uppercase tracking-wider text-sm"
            >
             Start Documentation
            </Link>
          </div>

          {/* Card 2: Industrial Complex (Hero) */}
          <div className="p-8 rounded-2xl border-t-4 border-blue-700 bg-white shadow-2xl scale-105 relative">
            {/* Most Popular Badge */}
            <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
              <div className="px-4 py-1.5 bg-blue-800 text-white text-xs font-bold uppercase tracking-wider rounded-full shadow-lg">
                Most Popular
              </div>
            </div>

            <div className="flex items-center gap-2 mb-4 mt-2">
              <Sparkles size={24} className="text-blue-800" />
              <h3 className="text-xl font-bold text-slate-900">
                Industrial Complex
              </h3>
            </div>
            
            <div className="mb-6">
              <div className="flex items-baseline gap-2">
                <span className="text-5xl font-bold text-slate-900">Custom Quote</span>
              </div>
              <p className="text-sm text-slate-500 mt-2">
                For multi-product steel & fastener manufacturers.
              </p>
            </div>

            <ul className="space-y-4 mb-8 ">
              <FeatureItem text="Unlimited HS Codes" highlighted />
              <FeatureItem text="Multiple Production Lines" highlighted />
              <FeatureItem text="Dedicated Compliance Officer" highlighted />
              <FeatureItem text="Priority Forensic Verification" highlighted />
              <FeatureItem text="Audit Log Guarantee" highlighted />
            </ul>

            <Link 
              href="/contact"
              className="block w-full py-4 text-center bg-blue-800 hover:bg-blue-900 text-white font-bold rounded-xl transition-all uppercase tracking-wider text-sm shadow-lg"
            >
              Request Industrial Pricing
            </Link>
          </div>

          {/* Card 3: Enterprise */}
          <div className="p-8 rounded-2xl border-2 border-slate-200 bg-white shadow-lg hover:shadow-xl transition-all">
            <div className="flex items-center gap-2 mb-4">
              <Rocket size={24} className="text-purple-600" />
              <h3 className="text-xl font-bold text-slate-900">
                Enterprise
              </h3>
            </div>
            
            <div className="mb-6">
              <div className="flex items-baseline gap-1">
                <span className="text-5xl font-bold text-slate-900">Custom</span>
              </div>
              <p className="text-sm text-slate-500 mt-2">
                Bespoke solutions for industrial groups.
              </p>
            </div>

            <ul className="space-y-4 mb-8">
              <FeatureItem text="API Integration" />
              <FeatureItem text="On-site Carbon Audits" />
              <FeatureItem text="Vendor Portal Access" />
              <FeatureItem text="Multi-Facility Consolidation" />
            </ul>

            <Link 
              href="/contact"
              className="block w-full py-4 text-center border-2 border-slate-900 text-slate-900 font-bold rounded-xl hover:bg-slate-900 hover:text-white transition-all uppercase tracking-wider text-sm"
            >
              Contact Sales
            </Link>
          </div>
        </div>

        {/* Market Intelligence Section */}
        <section className="bg-slate-900 rounded-3xl p-6 md:p-12 lg:p-16 text-white relative overflow-hidden">
          <div className="relative z-10 grid md:grid-cols-2 gap-8 md:gap-16 items-start md:items-center">
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-blue-500/10 border border-blue-500/30 text-blue-400 text-xs font-bold uppercase tracking-wider mb-6">
                Market Intelligence
                </div>
              
              <h2 className="text-4xl lg:text-5xl font-bold mb-6 leading-tight">
                Your Compliance Liability<br />is Dynamic.
              </h2>
              
              <p className="text-slate-300 text-lg mb-8 leading-relaxed">
                While our service fee is fixed in INR, your certificate cost fluctuates weekly with the EU ETS market. 
                As of Jan 2026, the cost per certificate is approximately <strong className="text-white">€92.00</strong> (~₹8,300).
              </p>
              
              {/* Did You Know Box */}
              <div className="p-6 bg-blue-500/10 border border-blue-500/20 rounded-xl flex items-start gap-4">
                <AlertCircle className="text-blue-400 shrink-0 mt-1" size={24} />
                <div>
                  <p className="text-sm font-bold text-blue-400 uppercase tracking-wider mb-2">
                    Did You Know?
                  </p>
                  <p className="text-slate-200 leading-relaxed">
                    Exporters using <strong className="text-white">Actual Data</strong> save avg. <strong className="text-white">22%</strong> vs Default Values.
                  </p>
                </div>
              </div>
            </div>

            {/* Financial Dashboard Style Data */}
            <div className="bg-white/5 border border-white/10 p-6 md:p-8 rounded-2xl">
              <h4 className="text-sm font-bold uppercase mb-6 text-slate-400 tracking-wider">
                Current Market Indices
              </h4>
              
              <div className="space-y-6">
                <DataRow 
                  label="EU ETS Carbon Price" 
                  value="€92.15 / tCO2" 
                  trend="+1.2%" 
                  trendUp={true}
                />
                <DataRow 
                  label="EUR / INR Exchange" 
                  value="₹90.45" 
                  trend="Stable" 
                  trendUp={false}
                />
                <DataRow 
                  label="Default Intensity (Steel)" 
                  value="2.5 tCO2/t" 
                  trend="Fixed" 
                  trendUp={false}
                />
              </div>
              
              <div className="mt-8 pt-8 border-t border-white/10">
                <Link 
                  href="/#calculator-section"
                  className="block w-full py-4 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-xl transition-all uppercase tracking-wider text-sm text-center"
                >
                  Access Full Calculator
                </Link>
              </div>
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}

// Helper Components
function FeatureItem({ text, highlighted = false }: { text: string; highlighted?: boolean }) {
  return (
    <div className="flex items-center gap-3">
      <div className={`w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0 ${
        highlighted ? 'bg-blue-100' : 'bg-slate-100'
      }`}>
        <Check size={14} className={highlighted ? 'text-blue-800' : 'text-slate-600'} strokeWidth={3} />
      </div>
      <span className="text-sm text-slate-700">{text}</span>
    </div>
  );
}

function DataRow({ label, value, trend, trendUp }: { label: string; value: string; trend: string; trendUp: boolean }) {
  return (
    <div className="flex justify-between items-center gap-4">
      <span className="text-sm text-slate-400 uppercase tracking-wide">{label}</span>
      <div className="flex items-baseline gap-2 whitespace-nowrap">
        <span className="text-base md:text-lg font-bold">{value}</span>
        <span className={`text-xs ${trendUp ? 'text-red-400' : 'text-emerald-400'}`}>
          {trend}
        </span>
      </div>
    </div>
  );
}