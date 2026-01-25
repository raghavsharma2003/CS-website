"use client";

import React, { useState, useEffect } from "react";
import { Calculator, TrendingUp, AlertCircle } from "lucide-react";
import { motion, useSpring, useTransform } from "framer-motion";
import Link from "next/link";

export default function LiabilityCalculator() {
  const [tonnage, setTonnage] = useState(500);
  
  // 2026 Benchmarks
  const ETS_PRICE = 92.15; // Current Jan 2026 Market Price (€/tonne)
  const EUR_TO_INR = 92; // Fixed conversion rate
  const DEFAULT_INTENSITY = 2.5; // EU Default for Steel (tCO2/t)
  const ACTUAL_INTENSITY = 1.4; // Average Actual via CarbonSettle

  // Calculations
  const defaultCost = tonnage * DEFAULT_INTENSITY * ETS_PRICE;
  const actualCost = tonnage * ACTUAL_INTENSITY * ETS_PRICE;
  const savings = defaultCost - actualCost;

  // Animated number springs
  const defaultCostSpring = useSpring(defaultCost, { stiffness: 100, damping: 30 });
  const savingsSpring = useSpring(savings, { stiffness: 100, damping: 30 });

  useEffect(() => {
    defaultCostSpring.set(defaultCost);
    savingsSpring.set(savings);
  }, [tonnage, defaultCost, savings, defaultCostSpring, savingsSpring]);

  // Helper function to format INR
  const formatINR = (euros: number) => {
    const inr = euros * EUR_TO_INR;
    if (inr >= 10000000) {
      return `₹${(inr / 10000000).toFixed(1)} Cr`;
    } else if (inr >= 100000) {
      return `₹${(inr / 100000).toFixed(1)} Lakh`;
    } else {
      return `₹${inr.toLocaleString('en-IN')}`;
    }
  };

  return (
    <div className="bg-white border-2 border-slate-200 rounded-2xl p-8 shadow-xl">
      <div className="flex items-center gap-3 mb-8">
        <div className="p-2 bg-blue-50 rounded-lg text-blue-600">
          <Calculator size={20} />
        </div>
        <h3 className="text-xl font-bold font-mono uppercase tracking-tight">
          Liability Estimator <span className="text-slate-400 text-sm ml-2">v2026.1</span>
        </h3>
      </div>

      {/* Slider Section */}
      <div className="space-y-6 mb-12">
        <div className="flex justify-between items-end">
          <label className="text-sm font-bold text-slate-500 uppercase tracking-wider">
            Quarterly Export Volume
          </label>
          <div className="text-3xl font-mono font-bold text-slate-900">
            {tonnage.toLocaleString()} <span className="text-sm text-slate-400">Tonnes</span>
          </div>
        </div>
        <input
          type="range"
          min="50" // CBAM 2026 Threshold
          max="10000"
          step="50"
          value={tonnage}
          onChange={(e) => setTonnage(Number(e.target.value))}
          className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-blue-600"
        />
        <div className="flex justify-between text-[10px] font-mono text-slate-400 uppercase">
          <span>50t (Threshold)</span>
          <span>10,000t</span>
        </div>
      </div>

      {/* Results Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Default Cost Card */}
        <div className="p-6 bg-red-50 border-2 border-red-200 rounded-xl">
          <div className="flex items-center gap-2 text-red-600 mb-2">
            <AlertCircle size={16} />
            <span className="text-xs font-bold uppercase">Cost with Default Values</span>
          </div>
          <div className="text-3xl font-mono font-bold text-red-700">
            €{Math.round(defaultCost).toLocaleString()}
          </div>
          <div className="text-lg font-semibold text-slate-500 mt-1">
            {formatINR(defaultCost)}
          </div>
          <p className="text-[10px] text-red-500 mt-3 leading-tight">
            Using default intensity: {DEFAULT_INTENSITY} tCO2/tonne
          </p>
        </div>

        {/* Savings Card */}
        <div className="p-6 bg-emerald-50 border-2 border-emerald-200 rounded-xl">
          <div className="flex items-center gap-2 text-emerald-600 mb-2">
            <TrendingUp size={16} />
            <span className="text-xs font-bold uppercase tracking-widest">Savings with CarbonSettle</span>
          </div>
          <div className="text-3xl font-mono font-bold text-emerald-700">
            €{Math.round(savings).toLocaleString()}
          </div>
          <div className="text-lg font-semibold text-slate-500 mt-1">
            {formatINR(savings)}
          </div>
          <p className="text-[10px] text-emerald-600 mt-3 leading-tight">
            Using actual intensity: {ACTUAL_INTENSITY} tCO2/tonne
          </p>
        </div>
      </div>

      {/* CTA Button */}
      <Link 
        href="/contact"
        className="block w-full mt-8 py-4 bg-slate-900 hover:bg-blue-600 text-white font-bold rounded-xl transition-all text-sm uppercase tracking-widest shadow-lg hover:scale-105 active:scale-95 text-center"
      >
        Get My Free Liability Assessment
      </Link>

      {/* Disclaimer */}
      <p className="text-center text-slate-400 text-xs mt-6 leading-relaxed">
        Calculations based on live EU ETS Carbon Price: €{ETS_PRICE}/tonne. Default intensity assumed at {DEFAULT_INTENSITY} tCO2/t.
      </p>
    </div>
  );
}