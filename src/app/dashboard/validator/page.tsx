"use client";

import React, { useState } from "react";
import { FileJson, ShieldCheck, AlertTriangle, Terminal, UploadCloud, RefreshCcw, Download } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export default function XMLValidator() {
  const [isScanning, setIsScanning] = useState(false);
  const [scanComplete, setScanComplete] = useState(false);

  const startScan = () => {
    setIsScanning(true);
    setTimeout(() => {
      setIsScanning(false);
      setScanComplete(true);
    }, 3500);
  };

  return (
    <main className="min-h-screen bg-[#0B0F1A] text-slate-300 pt-20 pb-32 font-sans">
      <div className="container mx-auto px-6">
        
        {/* Header Section */}
        <div className="mb-12 border-l-4 border-yellow-500 pl-6">
          <h1 className="text-3xl font-bold text-white font-mono uppercase tracking-tighter">Registry Pre-Check v2.6</h1>
          <p className="text-slate-500 mt-2 italic">Validation Engine synced with EU UCC Systems (Last Sync: Jan 17, 2026)</p>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          
          {/* 1. Upload/Drop Zone */}
          <div className="lg:col-span-2 space-y-6">
            {!scanComplete ? (
              <div 
                className={`border-2 border-dashed rounded-3xl p-20 transition-all flex flex-col items-center justify-center space-y-6 ${
                  isScanning ? 'border-yellow-500/50 bg-yellow-500/5' : 'border-slate-800 hover:border-slate-700 bg-slate-900/50'
                }`}
              >
                {isScanning ? (
                  <motion.div 
                    animate={{ rotate: 360 }}
                    transition={{ repeat: Infinity, duration: 2, ease: "linear" }}
                    className="text-yellow-500"
                  >
                    <RefreshCcw size={48} />
                  </motion.div>
                ) : (
                  <UploadCloud size={48} className="text-slate-600" />
                )}
                
                <div className="text-center">
                  <h3 className="text-xl font-bold text-white mb-2">
                    {isScanning ? "Analyzing Schema Integrity..." : "Upload CBAM XML"}
                  </h3>
                  <p className="text-slate-500 text-sm">Drag and drop your .xml file for forensic validation</p>
                </div>

                {!isScanning && (
                  <button 
                    onClick={startScan}
                    className="px-8 py-3 bg-white text-black font-bold rounded-lg uppercase tracking-widest text-xs hover:bg-yellow-500 transition-colors"
                  >
                    Initialize Scan
                  </button>
                )}
              </div>
            ) : (
              /* Scan Results Visual */
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-6">
                <div className="bg-green-500/10 border border-green-500/30 p-8 rounded-3xl flex items-center justify-between">
                  <div className="flex items-center gap-6">
                    <div className="w-16 h-16 bg-green-500 rounded-2xl flex items-center justify-center text-black">
                      <ShieldCheck size={32} />
                    </div>
                    <div>
                      <h3 className="text-2xl font-bold text-white">Validation Passed</h3>
                      <p className="text-green-500 font-mono text-sm uppercase tracking-widest">Status: 100% Registry Ready</p>
                    </div>
                  </div>
                  <button className="p-4 bg-slate-800 rounded-xl hover:bg-slate-700 transition-colors">
                    <Download size={20} />
                  </button>
                </div>

                {/* Technical Log Output */}
                <div className="bg-black rounded-2xl p-6 font-mono text-xs border border-slate-800 space-y-2 text-slate-400">
                  <p className="text-blue-400">[INFO] Checking XSD Version: CBAM_DECLARATION_V1.1.xsd</p>
                  <p className="text-green-400">[PASS] Importer EORI Format Validated</p>
                  <p className="text-green-400">[PASS] Installation Data Points (5/5) Complete</p>
                  <p className="text-green-400">[PASS] Verification Report Reference ID Found</p>
                  <p className="text-yellow-400">[WARN] Embedded Emissions slightly higher than EU-AVG for Sector: 7318</p>
                  <p className="text-green-400">[PASS] Signature Hash Verified</p>
                </div>
              </motion.div>
            )}
          </div>

          {/* 2. Error/Checklist Sidebar */}
          <div className="space-y-6">
            <div className="bg-slate-900 border border-slate-800 p-8 rounded-3xl">
              <h4 className="text-white font-bold mb-6 flex items-center gap-2 uppercase tracking-tighter">
                <Terminal size={18} className="text-yellow-500" /> Compliance Checklist
              </h4>
              
              <div className="space-y-6">
                <CheckItem label="Correct Reporting Period (2026-Q1)" active={true} />
                <CheckItem label="Verified Indirect Emissions" active={true} />
                <CheckItem label="Installation ID Registration" active={true} />
                <CheckItem label="Calculation Methodology Match" active={true} />
              </div>
            </div>

            <div className="p-6 bg-yellow-500/5 border border-yellow-500/20 rounded-2xl">
                <div className="flex gap-4">
                    <AlertTriangle className="text-yellow-500 shrink-0" size={20} />
                    <div>
                        <h5 className="text-yellow-500 font-bold text-sm mb-1">2026 Enforcement Note</h5>
                        <p className="text-xs text-slate-400 leading-relaxed">
                            Starting Jan 1, 2026, the EU Registry will automatically cross-check XML data with National Customs declarations. Inconsistencies will trigger immediate portal lock-outs.
                        </p>
                    </div>
                </div>
            </div>
          </div>

        </div>
      </div>
    </main>
  );
}

function CheckItem({ label, active }: { label: string; active: boolean }) {
  return (
    <div className="flex items-center gap-3">
      <div className={`w-4 h-4 rounded-md border ${active ? 'bg-yellow-500 border-yellow-500 flex items-center justify-center' : 'border-slate-700'}`}>
        {active && <ShieldCheck size={12} className="text-black" />}
      </div>
      <span className={`text-xs ${active ? 'text-slate-200' : 'text-slate-500'}`}>{label}</span>
    </div>
  );
}