"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";
import { Document, Page, pdfjs } from "react-pdf";

// Configure PDF.js worker
pdfjs.GlobalWorkerOptions.workerSrc = `//unpkg.com/pdfjs-dist@${pdfjs.version}/build/pdf.worker.min.mjs`;

interface PDFViewerModalProps {
  isOpen: boolean;
  onClose: () => void;
  pdfUrl: string;
}

export default function PDFViewerModal({
  isOpen,
  onClose,
  pdfUrl,
}: PDFViewerModalProps) {
  const [numPages, setNumPages] = useState<number>(0);

  function onDocumentLoadSuccess({ numPages }: { numPages: number }) {
    setNumPages(numPages);
  }

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
            <div className="flex items-center justify-between px-6 py-4 border-b border-slate-200 bg-slate-50 flex-shrink-0">
              <h2 className="text-lg font-bold text-slate-900">
                Sample XML Report
              </h2>
              <button
                onClick={onClose}
                className="p-2 hover:bg-slate-200 rounded-lg transition-colors"
                aria-label="Close modal"
              >
                <X size={24} className="text-slate-600" />
              </button>
            </div>

            {/* PDF Viewer */}
            <div className="relative bg-slate-100 flex items-center justify-center overflow-auto flex-1 p-4">
              <Document
                file={pdfUrl}
                onLoadSuccess={onDocumentLoadSuccess}
                loading={
                  <div className="flex items-center justify-center p-12">
                    <div className="animate-spin rounded-full h-12 w-12 border-4 border-slate-300 border-t-blue-600" />
                  </div>
                }
                error={
                  <div className="p-12 text-center">
                    <p className="text-red-600 font-semibold">
                      Failed to load PDF
                    </p>
                    <p className="text-slate-500 text-sm mt-2">
                      Please check the file path and try again.
                    </p>
                  </div>
                }
                className="flex items-center justify-center"
              >
                <Page
                  pageNumber={1}
                  renderTextLayer={true}
                  renderAnnotationLayer={true}
                  className="shadow-lg"
                  width={typeof window !== 'undefined' ? Math.min(window.innerWidth - 80, 700) : 700}
                />
              </Document>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
