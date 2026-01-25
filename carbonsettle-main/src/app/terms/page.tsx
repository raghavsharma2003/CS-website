"use client";

import React, { useState } from "react";
import { Shield, FileText, Database, Scale, MapPin, AlertTriangle } from "lucide-react";

export default function TermsPage() {
  const [activeSection, setActiveSection] = useState("preamble");

  const scrollToSection = (id: string) => {
    setActiveSection(id);
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  return (
    <main className="min-h-screen bg-white pt-20">
      {/* Header */}
      <div className="bg-slate-900 text-white py-16">
        <div className="container mx-auto px-6">
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-4">Terms of Service</h1>
          <p className="text-slate-300">Effective Date: January 18, 2026</p>
        </div>
      </div>

      <div className="container mx-auto px-6 py-16">
        <div className="grid lg:grid-cols-4 gap-12 max-w-7xl mx-auto">
          
          {/* Left Sidebar - Table of Contents (Sticky) */}
          <div className="lg:col-span-1">
            <div className="sticky top-24 space-y-2">
              <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-4">Contents</h3>
              
              <TOCItem 
                icon={<FileText size={16} />}
                label="1. Preamble"
                id="preamble"
                active={activeSection === "preamble"}
                onClick={() => scrollToSection("preamble")}
              />
              <TOCItem 
                icon={<Shield size={16} />}
                label="2. Scope of Services"
                id="scope"
                active={activeSection === "scope"}
                onClick={() => scrollToSection("scope")}
              />
              <TOCItem 
                icon={<AlertTriangle size={16} />}
                label="3. Limitation of Liability"
                id="liability"
                active={activeSection === "liability"}
                onClick={() => scrollToSection("liability")}
              />
              <TOCItem 
                icon={<Database size={16} />}
                label="4. Data Use & IP Rights"
                id="data"
                active={activeSection === "data"}
                onClick={() => scrollToSection("data")}
              />
              <TOCItem 
                icon={<FileText size={16} />}
                label="5. No Guarantee"
                id="guarantee"
                active={activeSection === "guarantee"}
                onClick={() => scrollToSection("guarantee")}
              />
              <TOCItem 
                icon={<Scale size={16} />}
                label="6. Client Responsibilities"
                id="responsibilities"
                active={activeSection === "responsibilities"}
                onClick={() => scrollToSection("responsibilities")}
              />
              <TOCItem 
                icon={<MapPin size={16} />}
                label="7. Jurisdiction"
                id="jurisdiction"
                active={activeSection === "jurisdiction"}
                onClick={() => scrollToSection("jurisdiction")}
              />
            </div>
          </div>

          {/* Right Content - Legal Text */}
          <div className="lg:col-span-3 space-y-12 text-slate-700 leading-relaxed">
            
            {/* Section 1: Preamble */}
            <Section id="preamble" title="1. Preamble">
              <p className="mb-4">
                CarbonSettle provides software-as-a-service (SaaS) for carbon emission calculation and CBAM compliance documentation. 
              </p>
              <div className="p-4 bg-yellow-50 border-l-4 border-yellow-500 rounded">
                <p className="font-semibold text-yellow-900">
                  IMPORTANT: CarbonSettle is NOT a law firm, tax advisory service, or authorized EU Indirect Representative. 
                  We provide technical tools and data processing services only.
                </p>
              </div>
            </Section>

            {/* Section 2: Scope of Services */}
            <Section id="scope" title="2. Scope of Services">
              <p className="mb-4">
                CarbonSettle's services include, but are not limited to:
              </p>
              <ul className="list-disc pl-6 space-y-2 mb-4">
                <li>Calculation of embedded carbon emissions based on Client-provided production data</li>
                <li>Generation of XML files formatted for EU CBAM Registry submission</li>
                <li>Forensic verification of electricity bills and production logs</li>
                <li>Advisory on ISO 14064-1 methodology application</li>
              </ul>
              <p>
                The Client acknowledges that all outputs are contingent upon the accuracy and completeness of data provided by the Client.
              </p>
            </Section>

            {/* Section 3: Limitation of Liability (CRITICAL) */}
            <Section id="liability" title="3. LIMITATION OF LIABILITY">
              <div className="p-6 bg-red-50 border-2 border-red-300 rounded-xl mb-6">
                <h4 className="font-bold text-red-900 mb-4 flex items-center gap-2">
                  <AlertTriangle size={20} />
                  CRITICAL LEGAL NOTICE
                </h4>
                <p className="font-bold uppercase mb-4">
                  TO THE MAXIMUM EXTENT PERMITTED BY LAW, CARBONSETTLE SHALL NOT BE LIABLE FOR ANY DIRECT, INDIRECT, INCIDENTAL, 
                  OR CONSEQUENTIAL DAMAGES, INCLUDING BUT NOT LIMITED TO:
                </p>
                <ul className="list-disc pl-6 space-y-2 font-semibold">
                  <li>EU CBAM PENALTIES OR FINES</li>
                  <li>REJECTION OF CERTIFICATES BY NATIONAL COMPETENT AUTHORITIES (NCAs)</li>
                  <li>LOSS OF MARKET ACCESS OR CUSTOMS DELAYS</li>
                  <li>FINANCIAL LOSSES DUE TO REGULATORY NON-COMPLIANCE</li>
                </ul>
              </div>
              
              <p className="mb-4">
                <strong>Client Acknowledgment:</strong> The Client acknowledges that CarbonSettle's outputs are based solely on 
                Client-provided data. The Client bears full legal responsibility for the accuracy of submissions to the EU Registry 
                and compliance with all applicable regulations.
              </p>
              
              <p>
                CarbonSettle's total liability under these Terms shall not exceed the fees paid by the Client in the twelve (12) 
                months preceding the claim.
              </p>
            </Section>

            {/* Section 4: Data Use & IP Rights */}
            <Section id="data" title="4. Data Use & Intellectual Property Rights">
              <h4 className="font-semibold mb-3">4.1 License Grant</h4>
              <p className="mb-4">
                Client grants CarbonSettle a <strong>worldwide, perpetual, non-exclusive, royalty-free license</strong> to use 
                Anonymized and Aggregated Data derived from the Client's use of the Services for the purpose of:
              </p>
              <ul className="list-disc pl-6 space-y-2 mb-6">
                <li>Improving the accuracy of our Machine Learning emission factor models</li>
                <li>Benchmarking industry-specific emission intensities</li>
                <li>Developing new products and analytical tools</li>
                <li>Publishing anonymized industry reports and whitepapers</li>
              </ul>

              <h4 className="font-semibold mb-3">4.2 Privacy Protection</h4>
              <div className="p-4 bg-green-50 border-l-4 border-green-500 rounded mb-4">
                <p className="text-green-900">
                  <strong>Privacy Guarantee:</strong> We will never share your specific production secrets, raw electricity bills, 
                  or identifiable company data with third parties or competitors. All data used for model training is anonymized 
                  and aggregated across multiple clients.
                </p>
              </div>

              <h4 className="font-semibold mb-3">4.3 Client Data Ownership</h4>
              <p>
                Client retains all ownership rights to their raw production data. CarbonSettle claims no ownership over 
                Client-submitted information, only the right to use anonymized derivatives as specified above.
              </p>
            </Section>

            {/* Section 5: No Guarantee of Acceptance */}
            <Section id="guarantee" title="5. No Guarantee of Regulatory Acceptance">
              <p className="mb-4">
                While CarbonSettle's methodologies adhere to <strong>ISO 14064-1</strong> standards and EU CBAM Implementing 
                Regulation guidelines, CarbonSettle does not and cannot guarantee:
              </p>
              <ul className="list-disc pl-6 space-y-2 mb-4">
                <li>Acceptance of certificates by the European Commission</li>
                <li>Approval by specific National Competent Authorities (NCAs)</li>
                <li>Immunity from audits or verification requests</li>
                <li>Specific outcomes in customs clearance procedures</li>
              </ul>
              <p>
                Regulatory interpretations vary by EU member state. The Client is responsible for engaging qualified legal counsel 
                for jurisdiction-specific compliance advice.
              </p>
            </Section>

            {/* Section 6: Client Responsibilities */}
            <Section id="responsibilities" title="6. Client Responsibilities">
              <p className="mb-4">The Client agrees to:</p>
              <ul className="list-disc pl-6 space-y-2">
                <li>Provide accurate, complete, and timely production data and electricity bills</li>
                <li>Maintain proper documentation of all manufacturing processes</li>
                <li>Notify CarbonSettle immediately of any material changes to production methods</li>
                <li>Comply with all applicable export control and trade regulations</li>
                <li>Not use CarbonSettle's services for fraudulent or illegal purposes</li>
                <li>Indemnify CarbonSettle against claims arising from Client's data inaccuracies</li>
              </ul>
            </Section>

            {/* Section 7: Jurisdiction */}
            <Section id="jurisdiction" title="7. Governing Law & Jurisdiction">
              <p className="mb-4">
                These Terms of Service shall be governed by and construed in accordance with the <strong>laws of India</strong>, 
                without regard to its conflict of law provisions.
              </p>
              <p className="mb-4">
                Any disputes, claims, or controversies arising out of or relating to these Terms or the Services shall be subject 
                to the <strong>exclusive jurisdiction of the courts in New Delhi, India</strong>.
              </p>
              <p>
                The parties agree to submit to the personal jurisdiction of such courts and waive any objections based on 
                inconvenient forum.
              </p>
            </Section>

            {/* Footer */}
            <div className="pt-8 border-t border-slate-200">
              <p className="text-sm text-slate-500">
                Last Updated: January 18, 2026
              </p>
              <p className="text-sm text-slate-500 mt-2">
                For questions regarding these Terms, please contact us at <a href="mailto:legal@carbonsettle.com" className="text-blue-600 underline">legal@carbonsettle.com</a>
              </p>
            </div>

          </div>
        </div>
      </div>
    </main>
  );
}

// Helper Components

function TOCItem({ icon, label, id, active, onClick }: any) {
  return (
    <button
      onClick={onClick}
      className={`w-full flex items-center gap-3 px-3 py-2 rounded-lg text-left text-sm transition-all ${
        active 
          ? 'bg-blue-50 text-blue-700 font-semibold' 
          : 'text-slate-600 hover:bg-slate-50'
      }`}
    >
      <span className={active ? 'text-blue-600' : 'text-slate-400'}>{icon}</span>
      {label}
    </button>
  );
}

function Section({ id, title, children }: { id: string; title: string; children: React.ReactNode }) {
  return (
    <section id={id} className="scroll-mt-24">
      <h2 className="text-2xl font-bold mb-6 text-slate-900">{title}</h2>
      <div className="text-slate-700">
        {children}
      </div>
    </section>
  );
}
