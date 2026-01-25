"use client";

import React from "react";
import { ShieldCheck, Factory, Users, Target, Globe, Wrench, Ship, Beaker, User } from "lucide-react";
import { motion } from "framer-motion";
import Image from "next/image";

export default function AboutPage() {
  return (
    <main className="min-h-screen bg-white">
      {/* Hero Section with Background Image */}
      <section className="relative pt-32 pb-32 overflow-hidden border-b border-slate-200 bg-slate-900">
        {/* Network Mesh Background Pattern */}
        <div className="absolute inset-0 opacity-5 pointer-events-none">
          <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
                <circle cx="20" cy="20" r="1" fill="white" />
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#grid)" />
          </svg>
        </div>
        
        <div className="container mx-auto px-6 relative z-10">
          <div className="flex flex-col lg:flex-row items-center gap-12">
            {/* Left Content */}
            <div className="flex-1 lg:flex-[0.8] space-y-8 text-white">
              <h4 className="text-blue-400 font-mono text-lg font-bold uppercase tracking-[0.3em]">Our Mission</h4>
              <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold tracking-tight leading-[1.1]">
                Bridging Indian Engineering with EU Compliance.
              </h1>
              <p className="text-xl text-slate-300 leading-relaxed max-w-xl">
                CarbonSettle was founded to protect the competitiveness of Indian exporters. 
                We believe that fair trade requires forensic accuracy, not guesswork.
              </p>
            </div>

            {/* Right Content - Background Image */}
            <div className="flex-1 lg:flex-[1] w-full relative z-10 h-full">
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.2 }}
                className="relative rounded-2xl overflow-hidden shadow-2xl h-full"
              >
                {/* Gradient overlay on left side to blend with background */}
                <div className="absolute inset-y-0 left-0 w-1/3 bg-gradient-to-r from-slate-900 to-transparent z-10 pointer-events-none" />
                
                <Image
                  src="/about_us_section_bg.png"
                  alt="About CarbonSettle"
                  width={800}
                  height={600}
                  className="w-full h-full object-cover"
                  priority
                />
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* The Origin Story / Values */}
      <section className="py-24">
        <div className="container mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-20 items-center">
            <div className="space-y-6">
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold">Why CarbonSettle?</h2>
              <p className="text-slate-600 text-lg leading-relaxed">
                As the <strong>CBAM Definitive Period</strong> began on January 1, 2026, we saw Indian manufacturers facing a "data wall." EU importers now require verified, installation-specific emissions data that standard accounting firms simply aren't equipped to provide.
              </p>
              <p className="text-slate-600 text-lg leading-relaxed">
                Our team combines <strong>Process Engineering</strong> with <strong>Environmental Law</strong>. We don't just fill forms; we audit production lines to prove the actual efficiency of your plant.
              </p>
              
              <div className="grid grid-cols-2 gap-6 pt-6">
                <div className="p-6 bg-slate-50 rounded-xl border-2 border-slate-200">
                  <h4 className="font-bold text-3xl font-mono text-slate-900">100%</h4>
                  <p className="text-xs text-slate-500 uppercase font-bold tracking-wider mt-2">Audit Success Rate</p>
                </div>
                <div className="p-6 bg-slate-50 rounded-xl border-2 border-slate-200">
                  <h4 className="font-bold text-3xl font-mono text-slate-900">24h</h4>
                  <p className="text-xs text-slate-500 uppercase font-bold tracking-wider mt-2">Response Protocol</p>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <ValueCard 
                icon={<Target className="text-yellow-600" />} 
                title="Precision" 
                desc={<>Moving beyond 'Default Values' to save you up to <span className="text-green-600 font-bold">25%</span> in certificate costs.</>}
              />
              <ValueCard 
                icon={<ShieldCheck className="text-blue-600" />} 
                title="Integrity" 
                desc="Audit-Ready Architecture: XML files engineered to pass EU Registry validation." 
              />
              <ValueCard 
                icon={<Wrench className="text-orange-600" />} 
                title="Sector-Specific" 
                desc="Customized audit models designed specifically for Ludhiana Fasteners, Gujarat Aluminum, and Mumbai Steel hubs." 
              />
              <ValueCard 
                icon={<Globe className="text-purple-600" />} 
                title="Global" 
                desc="Real-time synchronization with all 27 EU National Competent Authorities." 
              />
            </div>
          </div>
        </div>
      </section>

      {/* Industrial Zones Section */}
      <section 
        className="py-24 bg-slate-50 border-y border-slate-200"
        style={{
          backgroundImage: `
            linear-gradient(to right, rgba(148, 163, 184, 0.05) 1px, transparent 1px),
            linear-gradient(to bottom, rgba(148, 163, 184, 0.05) 1px, transparent 1px)
          `,
          backgroundSize: '40px 40px'
        }}
      >
        <div className="container mx-auto px-6 text-center">
          <h2 className="text-4xl font-bold mb-6">Engineered for India's Key Export Zones</h2>
          <p className="text-lg text-slate-600 max-w-2xl mx-auto mb-16">
            Deep sector knowledge tailored to the unique manufacturing processes of India's industrial heartlands.
          </p>
          
          <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            <div className="bg-white p-8 rounded-2xl border-2 border-slate-200 shadow-lg hover:shadow-xl transition-all">
              <div className="w-16 h-16 bg-blue-50 rounded-xl flex items-center justify-center mx-auto mb-6">
                <Wrench size={32} className="text-blue-600" />
              </div>
              <h3 className="font-mono font-bold text-slate-400 text-sm mb-2">NORTH</h3>
              <p className="text-2xl font-bold mb-4">Ludhiana Hub</p>
              <p className="text-sm text-slate-600 leading-relaxed">
                Specialized calculation logic for Fasteners (HS 7318), Wire Drawing, and Pickling units.
              </p>
            </div>
            
            <div className="bg-white p-8 rounded-2xl border-2 border-slate-200 shadow-lg hover:shadow-xl transition-all">
              <div className="w-16 h-16 bg-emerald-50 rounded-xl flex items-center justify-center mx-auto mb-6">
                <Beaker size={32} className="text-emerald-600" />
              </div>
              <h3 className="font-mono font-bold text-slate-400 text-sm mb-2">WEST</h3>
              <p className="text-2xl font-bold mb-4">Gujarat Corridor</p>
              <p className="text-sm text-slate-600 leading-relaxed">
                Calibrated for high-energy Aluminum electrolysis and Fertilizer emission factors.
              </p>
            </div>
            
            <div className="bg-white p-8 rounded-2xl border-2 border-slate-200 shadow-lg hover:shadow-xl transition-all">
              <div className="w-16 h-16 bg-purple-50 rounded-xl flex items-center justify-center mx-auto mb-6">
                <Ship size={32} className="text-purple-600" />
              </div>
              <h3 className="font-mono font-bold text-slate-400 text-sm mb-2">COASTAL</h3>
              <p className="text-2xl font-bold mb-4">Mumbai / Pune</p>
              <p className="text-sm text-slate-600 leading-relaxed">
                Consolidated reporting protocols for large-scale Steel conglomerates and Auto-component exporters.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Leadership Section */}
      {/* <section className="py-24 bg-white">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4">Built by Engineers.</h2>
            <p className="text-lg text-slate-600 max-w-2xl mx-auto">
              Combining deep industrial expertise with regulatory precision.
            </p>
          </div>

          <div className="max-w-4xl mx-auto">
            <div className="bg-slate-50 border-2 border-slate-200 rounded-2xl p-12 flex flex-col md:flex-row gap-12 items-center">
              <div className="flex-shrink-0">
                <div className="w-48 h-48 bg-gradient-to-br from-slate-200 to-slate-300 rounded-2xl flex items-center justify-center border-2 border-slate-300">
                  <User size={64} className="text-slate-400" />
                </div>
              </div>

              <div className="flex-1 text-center md:text-left">
                <h3 className="text-2xl font-bold mb-2">Founder & Principal Architect</h3>
                <p className="text-blue-600 font-semibold mb-6">CarbonSettle</p>
                
                <p className="text-slate-600 text-lg leading-relaxed mb-6">
                  "Bridging the gap between Indian manufacturing reality and EU regulatory code."
                </p>
                
                <div className="flex flex-wrap gap-3 justify-center md:justify-start">
                  <span className="px-4 py-2 bg-white border border-slate-200 rounded-lg text-sm font-semibold text-slate-700">
                    Process Engineering
                  </span>
                  <span className="px-4 py-2 bg-white border border-slate-200 rounded-lg text-sm font-semibold text-slate-700">
                    Environmental Law
                  </span>
                  <span className="px-4 py-2 bg-white border border-slate-200 rounded-lg text-sm font-semibold text-slate-700">
                    ISO 14064-1
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section> */}
    </main>
  );
}

function ValueCard({ icon, title, desc }: { icon: React.ReactNode, title: string, desc: React.ReactNode }) {
  return (
    <div className="p-8 bg-white border-2 border-slate-200 rounded-2xl shadow-sm hover:shadow-lg hover:border-slate-300 transition-all">
      <div className="w-12 h-12 bg-slate-50 rounded-lg flex items-center justify-center mb-6">
        {icon}
      </div>
      <h3 className="font-bold text-lg mb-2">{title}</h3>
      <p className="text-sm text-slate-600 leading-relaxed">{desc}</p>
    </div>
  );
}