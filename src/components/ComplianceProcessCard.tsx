"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { UploadCloud, ScanLine, Waypoints, BadgeCheck, ChevronRight } from "lucide-react";

type Stage = {
  id: number;
  icon: React.ElementType;
  text: string;
  subtext: string;
  color: string;
  bgColor: string;
  highlight?: boolean;
};

const stages: Stage[] = [
  {
    id: 1,
    icon: UploadCloud,
    text: "You Upload Bills",
    subtext: "Electricity & Fuel Receipts",
    color: "text-slate-600",
    bgColor: "bg-white",
  },
  {
    id: 2,
    icon: ScanLine,
    text: "Verified Extraction",
    subtext: "Reading 42 Units...",
    color: "text-blue-600",
    bgColor: "bg-blue-50/50",
  },
  {
    id: 3,
    icon: Waypoints,
    text: "HS Code Mapping",
    subtext: "Matching 7318 (Fasteners)",
    color: "text-amber-600",
    bgColor: "bg-amber-50/50",
  },
  {
    id: 4,
    icon: BadgeCheck,
    text: "Audit-Ready Report",
    subtext: "100% Compliant",
    color: "text-emerald-700",
    bgColor: "bg-emerald-50",
    highlight: true,
  },
];

export default function ComplianceProcessCard() {
  const [currentStage, setCurrentStage] = useState(0);
  const [visibleStages, setVisibleStages] = useState<number[]>([]);

  useEffect(() => {
    const stageDuration = 1200; // Middle ground: not too fast, not too slow/

    const timer = setTimeout(() => {
      if (currentStage < stages.length) {
        setVisibleStages((prev) => [...prev, currentStage]);
        setCurrentStage((prev) => prev + 1);
      } else {
        // Reset after showing all stages (Longer pause to highlight result)
        setTimeout(() => {
          setVisibleStages([]);
          setCurrentStage(0);
        }, 6000);
      }
    }, stageDuration);

    return () => clearTimeout(timer);
  }, [currentStage]);

  return (
    <div className="absolute top-[8%] left-[6%] w-[55%] sm:w-[50%] md:w-[48%] bg-white/90 backdrop-blur-md border border-white/60 rounded-2xl shadow-2xl p-5 md:p-6 z-20">
      {/* Header - Humanized */}
      <div className="flex items-center justify-between mb-5 pb-3 border-b border-slate-100">
        <h3 className="text-sm font-bold text-slate-800 flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
          Live Process
        </h3>
        <span className="text-xs text-slate-400 font-medium font-mono">
          SECURE_TUNNEL_V2
        </span>
      </div>

      {/* Stages List */}
      <div className="space-y-3">
        <AnimatePresence mode="popLayout">
          {visibleStages.map((stageIndex) => {
            const stage = stages[stageIndex];
            const Icon = stage.icon;
            const isHighlight = stage.highlight;

            return (
              <motion.div
                key={stage.id}
                initial={{ opacity: 0, scale: 0.9, x: -10 }}
                animate={{ opacity: 1, scale: isHighlight ? 1.05 : 1, x: 0 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.5, ease: "backOut" }}
                className={`flex items-center gap-3 p-3 rounded-xl border ${isHighlight
                  ? "border-emerald-300 bg-emerald-50 shadow-md ring-1 ring-emerald-100"
                  : `border-transparent ${stage.bgColor}`
                  }`}
              >
                <div className={`w-8 h-8 rounded-lg flex items-center justify-center shadow-sm ${isHighlight ? "bg-emerald-600 text-white" : "bg-white " + stage.color
                  }`}>
                  <Icon size={18} strokeWidth={isHighlight ? 2.5 : 2} />
                </div>

                <div className="flex-1 min-w-0">
                  <p className={`text-xs md:text-sm ${isHighlight ? "font-extrabold text-emerald-900" : "font-semibold " + stage.color}`}>
                    {stage.text}
                  </p>
                  <p className={`text-[10px] md:text-xs font-medium ${isHighlight ? "text-emerald-700" : "text-slate-500"}`}>
                    {stage.subtext}
                  </p>
                </div>

                {stageIndex < 3 && (
                  <div className="w-[1px] h-4 bg-slate-200" />
                )}
              </motion.div>
            );
          })}
        </AnimatePresence>

        {/* Humanized Empty State / Progress */}
        {currentStage < stages.length && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="flex items-center gap-3 px-3 py-2 text-slate-400 text-xs italic"
          >
            <div className="flex gap-1">
              <motion.span animate={{ opacity: [0.4, 1, 0.4] }} transition={{ repeat: Infinity, duration: 1.5, delay: 0 }}>.</motion.span>
              <motion.span animate={{ opacity: [0.4, 1, 0.4] }} transition={{ repeat: Infinity, duration: 1.5, delay: 0.2 }}>.</motion.span>
              <motion.span animate={{ opacity: [0.4, 1, 0.4] }} transition={{ repeat: Infinity, duration: 1.5, delay: 0.4 }}>.</motion.span>
            </div>
            <span>Verifying steps...</span>
          </motion.div>
        )}
      </div>
    </div>
  );
}
