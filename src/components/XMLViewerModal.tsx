"use client";

import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";

interface XMLViewerModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const sampleXML = `<?xml version="1.0" encoding="UTF-8"?>
<CBAMReport xmlns="http://xmlns.ec.europa.eu/BusinessObjects/CBAM/Report/v2">
  <Header>
    <ReportID>IN-APEX-2025-Q4-SAMPLE</ReportID>
    <ReportingPeriod>2025-Q4</ReportingPeriod>
    <CreationTimestamp>2026-01-12T10:00:00Z</CreationTimestamp>
  </Header>
  <Declarant>
    <EORINumber>DE987654321000</EORINumber>
    <Name>EU Steel Importers NV</Name>
  </Declarant>
  <CBAMGoods>
    <Good>
      <CNCode>72142000</CNCode>
      <GoodsDescription>Bars and rods of iron or non-alloy steel</GoodsDescription>
      <CountryOfOrigin>IN</CountryOfOrigin>
      <InstallationID>IN-O3CI-998877</InstallationID>
      <ProductionRoute>Electric Arc Furnace (EAF)</ProductionRoute>
      <NetMassUnit>Tonne</NetMassUnit>
      <NetMass>1000.00</NetMass>
      <EmbeddedEmissions>
        <DirectEmissions>
          <SpecificEmbeddedEmissions>0.3185</SpecificEmbeddedEmissions>
          <MeasurementMethod>Calculation-based</MeasurementMethod>
        </DirectEmissions>
        <IndirectEmissions>
          <SpecificEmbeddedEmissions>0.4615</SpecificEmbeddedEmissions>
          <SourceOfEmissionFactor>Grid</SourceOfEmissionFactor>
          <EmissionFactorValue>0.710</EmissionFactorValue>
        </IndirectEmissions>
        <Precursors>
          <Precursor>
            <CNCode>72011000</CNCode>
            <SpecificEmbeddedEmissions>0.1800</SpecificEmbeddedEmissions>
          </Precursor>
        </Precursors>
      </EmbeddedEmissions>
      <CarbonPricePaid>
        <IsCarbonPricePaid>false</IsCarbonPricePaid>
      </CarbonPricePaid>
    </Good>
  </CBAMGoods>
</CBAMReport>`;

export default function XMLViewerModal({
  isOpen,
  onClose,
}: XMLViewerModalProps) {
  if (!isOpen) return null;

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/80 backdrop-blur-sm p-4"
          onClick={onClose}
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            transition={{ type: "spring", damping: 25 }}
            className="relative w-full max-w-4xl bg-white rounded-2xl shadow-2xl overflow-hidden flex flex-col max-h-[90vh]"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header */}
            <div className="flex items-center justify-between px-4 md:px-6 py-4 border-b border-slate-200 bg-slate-50 flex-shrink-0">
              <div>
                <h2 className="text-lg md:text-xl font-bold text-slate-900">
                  Sample CBAM XML Report
                </h2>
                <p className="text-xs text-slate-500 mt-1">EU Registry Format</p>
              </div>
              <button
                onClick={onClose}
                className="p-2 hover:bg-slate-200 rounded-lg transition-colors"
                aria-label="Close modal"
              >
                <X size={24} className="text-slate-600" />
              </button>
            </div>

            {/* XML Code Viewer */}
            <div className="relative bg-slate-900 overflow-auto flex-1">
              <pre className="p-4 md:p-6 text-xs md:text-sm leading-relaxed">
                <code className="text-green-400 font-mono">
                  {sampleXML}
                </code>
              </pre>
            </div>

            {/* Footer */}
            <div className="px-4 md:px-6 py-3 bg-slate-50 border-t border-slate-200 flex-shrink-0">
              <p className="text-xs text-slate-600">
                <span className="font-semibold">Note:</span> This is a sample format. Actual reports are generated based on your production data.
              </p>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
