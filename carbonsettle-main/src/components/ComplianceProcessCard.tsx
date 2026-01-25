"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FileText, ScanLine, Settings2, ShieldCheck } from "lucide-react";

type Stage = {
  id: number;
  icon: React.ElementType;
  text: string;
  subtext: string;
  color: string;
};

const stages: Stage[] = [
  {
    id: 1,
    icon: FileText,
    text: "Uploading Raw Bills",
    subtext: "electricity_bills_ludhiana.pdf",
    color: "text-slate-700",
  },
  {
    id: 2,
    icon: ScanLine,
    text: "Forensic Extraction",
    subtext: "parsing production_logs... 42 units found",
    color: "text-blue-600",
  },
  {
    id: 3,
    icon: Settings2,
    text: "Mapping HS Codes",
    subtext: "HS CODE 7318 (Fasteners) matched",
    color: "text-amber-600",
  },
  {
    id: 4,
    icon: ShieldCheck,
    text: "Audit-Ready XML",
    subtext: "Compliance Integrity Verified",
    color: "text-emerald-600",
  },
];

export default function ComplianceProcessCard() {
  const [currentStage, setCurrentStage] = useState(0);
  const [visibleStages, setVisibleStages] = useState<number[]>([]);

  useEffect(() => {
    const stageDuration = 1500;

    const timer = setTimeout(() => {
      if (currentStage < stages.length) {
        setVisibleStages((prev) => [...prev, currentStage]);
        setCurrentStage((prev) => prev + 1);
      } else {
        // Reset after showing all stages
        setTimeout(() => {
          setVisibleStages([]);
          setCurrentStage(0);
        }, 4000);
      }
    }, stageDuration);

    return () => clearTimeout(timer);
  }, [currentStage]);

  return (
    <div className="absolute top-[4%] left-[4%] w-[50%] sm:w-[48%] md:w-[46%] lg:w-[45%] xl:w-[42%] bg-white/50 backdrop-blur-lg border border-white/40 rounded-xl md:rounded-2xl shadow-2xl p-3 sm:p-4 md:p-5 lg:p-6 z-20">
      {/* Header */}
      <div className="flex items-center justify-between gap-2 md:gap-0 mb-4 md:mb-6 pb-3 md:pb-4 border-b border-slate-200/50">
        <div className="flex gap-1.5 md:gap-2">
          <div className="w-2 h-2 md:w-2.5 md:h-2.5 rounded-full bg-red-400/60" />
          <div className="w-2 h-2 md:w-2.5 md:h-2.5 rounded-full bg-yellow-400/60" />
          <div className="w-2 h-2 md:w-2.5 md:h-2.5 rounded-full bg-green-400/60" />
        </div>
        <span className="text-[8px] md:text-[10px] font-mono text-slate-600 uppercase tracking-[0.15em] md:tracking-[0.2em]">
          Secure Audit Tunnel v2.0
        </span>
      </div>

      {/* Stages List */}
      <div className="space-y-3 md:space-y-4 font-mono text-[11px] md:text-[13px]">
        <AnimatePresence>
          {visibleStages.map((stageIndex) => {
            const stage = stages[stageIndex];
            const Icon = stage.icon;
            const isLast = stageIndex === stages.length - 1;

            return (
              <motion.div
                key={stage.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
                transition={{ duration: 0.5 }}
                className={`flex items-start gap-2 md:gap-3 ${isLast ? "bg-emerald-50/80 border border-emerald-200/50 rounded-lg p-2 md:p-3" : ""}`}
              >
                <div className={`${stage.color} flex-shrink-0 mt-0.5 md:mt-1`}>
                  <Icon size={16} className="md:w-5 md:h-5" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className={`${stage.color} font-bold text-[10px] md:text-xs uppercase tracking-wider mb-0.5 md:mb-1`}>
                    {stage.text}
                  </p>
                  <p className="text-slate-600 text-[9px] md:text-xs truncate">
                    &gt; {stage.subtext}
                  </p>
                </div>
              </motion.div>
            );
          })}
        </AnimatePresence>

        {/* Loading indicator when cycling */}
        {currentStage < stages.length && visibleStages.length > 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="flex items-center gap-2 text-slate-600 text-[10px] md:text-xs"
          >
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ repeat: Infinity, duration: 1, ease: "linear" }}
              className="w-2.5 h-2.5 md:w-3 md:h-3 border-2 border-slate-400 border-t-transparent rounded-full"
            />
            <span>Processing...</span>
          </motion.div>
        )}
      </div>
    </div>
  );
}
