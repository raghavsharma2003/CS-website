
import React from 'react';
import Link from 'next/link';
import { Calculator, FileText, ArrowRight } from 'lucide-react';

export default function BlogCTA() {
    return (
        <div className="my-16 p-8 bg-slate-900 rounded-2xl shadow-2xl border border-slate-800 text-white relative overflow-hidden group">
            {/* Background Decoration */}
            <div className="absolute top-0 right-0 w-64 h-64 bg-blue-600 rounded-full blur-[100px] opacity-20 -translate-y-1/2 translate-x-1/2" />

            <div className="relative z-10 grid md:grid-cols-2 gap-8 items-center">
                <div className="space-y-4">
                    <h3 className="text-2xl font-bold tracking-tight">
                        Stop guessing your <span className="text-blue-400">CBAM Tax.</span>
                    </h3>
                    <p className="text-slate-300 leading-relaxed">
                        Forensic analysis extracts actual emissions from your electricity and production logs. Don't pay the defaults.
                    </p>

                    <div className="flex flex-col sm:flex-row gap-3 pt-2 opacity-90">
                        <div className="flex items-center gap-2 text-sm text-slate-400">
                            <Calculator size={16} className="text-blue-500" /> <span>Free Liability Check</span>
                        </div>
                        <div className="hidden sm:block text-slate-700">|</div>
                        <div className="flex items-center gap-2 text-sm text-slate-400">
                            <FileText size={16} className="text-blue-500" /> <span>ISO 14064 Compliant</span>
                        </div>
                    </div>
                </div>

                <div className="flex flex-col gap-3">
                    <button
                        onClick={() => {
                            const el = document.getElementById('calculator-section');
                            if (el) el.scrollIntoView({ behavior: 'smooth' });
                            else window.location.href = '/#calculator-section';
                        }}
                        className="w-full py-4 bg-blue-600 hover:bg-blue-500 text-white font-bold rounded-xl transition-all shadow-lg flex items-center justify-center gap-2"
                    >
                        Calculate Liability <ArrowRight size={18} />
                    </button>

                    <button
                        onClick={() => {
                            // Assuming we open the modal, but if not on homepage, maybe redirect?
                            // For safety in blog context, we link to homepage modal trigger mock or new page.
                            // Simulating a link to homepage for now as modal trigger is local to page.tsx
                            window.location.href = '/';
                        }}
                        className="w-full py-4 bg-transparent border border-slate-700 hover:border-white text-slate-300 hover:text-white font-bold rounded-xl transition-all flex items-center justify-center gap-2"
                    >
                        View Sample XML Report
                    </button>
                </div>
            </div>
        </div>
    );
}
