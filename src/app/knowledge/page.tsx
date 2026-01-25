"use client";

import React from "react";
import { BookOpen, Search, Globe2, Scale, Zap, ShieldCheck, ArrowRight, Clock, CheckCircle } from "lucide-react";
import { motion } from "framer-motion";

export default function KnowledgeHub() {
  return (
    <main className="min-h-screen bg-slate-50 pt-20 pb-32">
      <div className="container mx-auto px-6">
        {/* 1. Page Header with Live Ticker */}
        <div className="flex flex-col md:flex-row justify-between items-end gap-6 mb-16">
          <div className="max-w-2xl">
            <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight mb-6">Regulation Intelligence</h1>
            <p className="text-lg text-slate-600 leading-relaxed">
              Real-time tracking of EU Official Journal amendments and NCA protocols.
            </p>
          </div>
          <div className="bg-white border border-slate-200 p-4 rounded-xl flex items-center gap-4 shadow-sm">
            {/* Pulse animation for live indicator */}
            <div className="relative flex items-center justify-center">
              <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
              <div className="absolute w-2 h-2 rounded-full bg-green-500 animate-ping" />
            </div>
            <div className="font-mono text-xs">
              <span className="text-slate-400 block uppercase">Last Global Update</span>
              <span className="font-bold text-slate-900">17 JAN 2026 | 15:45 GMT</span>
            </div>
          </div>
        </div>

        {/* 2. Top-Level Resource Categories */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-20">
          <ResourceCategoryCard 
            icon={<Scale className="text-blue-500" />}
            title="The 2026 Definitive Regime"
            description="The transition is over. Learn about mandatory verification and certificate surrendering protocols."
            cta="View Transition Protocols →"
          />
          <ResourceCategoryCard 
            icon={<Zap className="text-yellow-500" />}
            title="HS Code Matrix"
            description="Verify if your products (Steel, Aluminum, Fasteners) fall under the 2026 CBAM scope."
            cta="Search Protected HS Codes →"
          />
          <ResourceCategoryCard 
            icon={<Globe2 className="text-green-500" />}
            title="NCA Directory"
            description="Direct contact details for National Competent Authorities in all 27 EU Member States."
            cta="Find EU Competent Authority →"
          />
        </div>

        {/* 3. Main Content Grid */}
        <div className="grid lg:grid-cols-3 gap-12">
          
          {/* Left: Featured Articles/Technical Guides */}
          <div className="lg:col-span-2 space-y-8">
            <h3 className="text-sm font-mono font-bold uppercase tracking-widest text-slate-400 flex items-center gap-2">
              <BookOpen size={16} /> Latest Technical Briefs
            </h3>
            
            <ArticleCard 
                date="Jan 12, 2026"
                source="EU Official Journal"
                category="Compliance"
                title="The 50-Tonne Rule: How to Monitor Cumulative Annual Imports"
                excerpt="Small shipments can add up. Learn how the new UCC-integrated registry tracks your total tonnage automatically."
            />
            <ArticleCard 
                date="Jan 05, 2026"
                source="European Commission"
                category="Data Engineering"
                title="Actual Values vs. Default Values: A Cost-Benefit Analysis for 2026"
                excerpt="Default values have been revised upward. Why proving your factory's specific emission factor is now a financial priority."
            />
             <ArticleCard 
                date="Dec 28, 2025"
                source="EU Official Journal"
                category="Customs"
                title="Linking EORI with the CBAM Declarant Portal: Step-by-Step"
                excerpt="A walkthrough for Indian exporters registering their indirect representatives in the EU Registry."
            />
          </div>

          {/* Right: Sidebar Tools */}
          <div className="space-y-8">
             {/* Sidebar Tool 1: HS Code Validator */}
             <div className="bg-slate-900 rounded-2xl p-6 text-white">
                <h4 className="font-bold mb-4 flex items-center gap-2">
                    <CheckCircle size={18} className="text-blue-400" /> HS Code Validator
                </h4>
                <div className="relative">
                    <input 
                        type="text" 
                        placeholder="Enter HS Code (e.g., 7318)..." 
                        className="w-full bg-slate-800 border border-slate-700 rounded-lg py-3 px-4 text-sm focus:outline-none focus:border-blue-500 transition-colors"
                    />
                    <button className="absolute right-2 top-1/2 -translate-y-1/2 p-2 bg-blue-600 hover:bg-blue-700 rounded-md transition-colors">
                        <CheckCircle size={16} />
                    </button>
                </div>
             </div>

             {/* Sidebar Tool 2: Mandatory Reporting Thresholds */}
             <div className="bg-white border border-slate-200 rounded-2xl p-6">
                <h4 className="font-bold mb-6 text-slate-900 border-b border-slate-100 pb-4">Mandatory Reporting Thresholds</h4>
                <div className="space-y-4">
                    <ThresholdRow label="Iron & Steel" value="> 50kg per shipment" />
                    <ThresholdRow label="Aluminium" value="> 50kg per shipment" />
                    <ThresholdRow label="Hydrogen" value="0.0kg (No Threshold)" />
                    <ThresholdRow label="Electricity" value="0.0kg (No Threshold)" />
                </div>
                <div className="mt-6 pt-6 border-t border-slate-100">
                    <p className="text-sm text-blue-600 font-medium flex items-start gap-2">
                        <CheckCircle size={16} className="mt-0.5 flex-shrink-0" />
                        <span>Shipments below these limits are exempt (De Minimis Rule).</span>
                    </p>
                </div>
             </div>
          </div>
        </div>
      </div>
    </main>
  );
}

// Helper Components
function ResourceCategoryCard({ icon, title, description, cta }: any) {
  return (
    <div className="bg-white p-8 rounded-2xl border border-slate-200 hover:border-slate-900 hover:shadow-xl transition-all group cursor-pointer">
      <div className="w-12 h-12 bg-slate-50 rounded-xl flex items-center justify-center mb-6 group-hover:bg-slate-900 transition-colors">
        {icon}
      </div>
      <h3 className="text-xl font-bold mb-3">{title}</h3>
      <p className="text-slate-500 text-sm leading-relaxed mb-6">{description}</p>
      <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-slate-900 group-hover:text-blue-600 transition-colors">
        {cta}
      </div>
    </div>
  );
}

function ArticleCard({ date, source, category, title, excerpt }: any) {
    return (
        <div className="group cursor-pointer hover:-translate-y-1 hover:shadow-lg transition-all duration-300 p-6 rounded-xl hover:bg-white">
            <div className="flex items-center gap-3 text-xs font-mono mb-3 flex-wrap">
                <span className="text-blue-600 font-bold uppercase">{category}</span>
                <span className="text-slate-300">•</span>
                <span className="text-slate-400">{date}</span>
                <span className="text-slate-300">•</span>
                <span className="px-2 py-0.5 bg-slate-100 text-slate-600 rounded-full text-[10px] font-semibold">
                    Source: {source}
                </span>
            </div>
            <h3 className="text-2xl font-bold mb-3 group-hover:text-blue-600 transition-colors">{title}</h3>
            <p className="text-slate-500 leading-relaxed max-w-2xl mb-4">{excerpt}</p>
            <div className="w-full h-[1px] bg-slate-100 group-hover:bg-blue-600 transition-all mt-8" />
        </div>
    )
}

function ThresholdRow({ label, value }: any) {
    return (
        <div className="flex justify-between items-center text-sm">
            <span className="text-slate-500">{label}</span>
            <span className="font-mono font-bold text-slate-900">{value}</span>
        </div>
    )
}