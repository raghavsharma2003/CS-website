"use client";

import React, { useState } from "react";
import { Send, CheckCircle2, Loader2, Clock, FileCode, Shield, Lock, ChevronDown } from "lucide-react";
import emailjs from '@emailjs/browser';

export default function ContactHub() {
  const [submitted, setSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState("");

  // State to hold all form data
  const [formData, setFormData] = useState({
    fullName: "",
    companyName: "",
    email: "",
    region: "Select Region",
    productionProcess: ""
  });

  // Handle input changes
  const handleChange = (e: any) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // Handle Form Submission & Email Integration
  const handleSubmit = async (e: any) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError("");

    // EMAILJS CONFIGURATION
    const serviceId = "service_4sek6b4"; 
    const templateId = "template_mj09gze"; 
    const publicKey = "TUYiqwH4q9ic_TpaM";

    const formattedMessage = `
      Company: ${formData.companyName}
      Industrial Hub: ${formData.region}
      Email: ${formData.email}
      
      --------------------------
      Production Process:
      ${formData.productionProcess}
    `;

    const templateParams = {
      name: formData.fullName,
      time: new Date().toLocaleString(),
      message: formattedMessage,
      reply_to: formData.email
    };

    try {
      await emailjs.send(serviceId, templateId, templateParams, publicKey);
      console.log("Email sent successfully");
      setSubmitted(true);
    } catch (err) {
      console.error("Failed to send:", err);
      setError("Failed to send message. Please try again later.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <main className="min-h-screen bg-slate-50 pt-20 pb-32">
      <div className="container mx-auto px-6">
        {/* Main Contact Section */}
        <div className="grid lg:grid-cols-2 gap-0 max-w-7xl mx-auto shadow-2xl rounded-3xl overflow-hidden mb-16">
          
          {/* Left Column: Dark Navy Info Panel */}
          <div className="bg-slate-900 text-white p-8 lg:p-12 space-y-8">
            <div>
              <h4 className="text-blue-400 font-mono text-xs font-bold uppercase tracking-[0.3em] mb-4">Get Started</h4>
              <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold tracking-tight mb-4 leading-tight">
                Request Your<br />Compliance Assessment
              </h1>
              <p className="text-slate-300 leading-relaxed text-sm">
                Fill out the form and our team will review your requirements and get back to you within 24 hours.
              </p>
            </div>

            {/* SLA Grid */}
            <div className="grid grid-cols-2 gap-3">
              <SLAMetric 
                icon={<Clock size={18} />}
                value="24h Response"
                subtext="Quick turnaround"
              />
              <SLAMetric 
                icon={<FileCode size={18} />}
                value="3-Day Report"
                subtext="Fast delivery"
              />
              <SLAMetric 
                icon={<Shield size={18} />}
                value="NDA Protected"
                subtext="Your data is safe"
              />
              <SLAMetric 
                icon={<Lock size={18} />}
                value="ISO 27001"
                subtext="Secure & encrypted"
              />
            </div>
          </div>

          {/* Right Column: White Form Card */}
          <div 
            className="bg-white p-8 lg:p-12 relative"
            style={{
              backgroundImage: `
                linear-gradient(to right, rgba(148, 163, 184, 0.03) 1px, transparent 1px),
                linear-gradient(to bottom, rgba(148, 163, 184, 0.03) 1px, transparent 1px)
              `,
              backgroundSize: '40px 40px'
            }}
          >
            {!submitted ? (
              <>
                {/* Secure Connection Badge */}
                {/* <div className="flex items-center gap-2 mb-6 px-3 py-1.5 bg-green-50 border border-green-200 rounded-lg w-fit">
                  <Lock size={12} className="text-green-600" />
                  <span className="text-xs font-bold text-green-700 uppercase tracking-wide">Secure Connection</span>
                </div> */}

                <h2 className="text-xl font-bold mb-6">Send Us Your Details</h2>

                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="grid md:grid-cols-2 gap-4">
                    <FormInput 
                      label="Full Name" 
                      name="fullName"
                      placeholder="e.g. Rajesh Kumar" 
                      value={formData.fullName}
                      onChange={handleChange}
                    />
                    <FormInput 
                      label="Company Name" 
                      name="companyName"
                      placeholder="e.g. Ludhiana Steel Works" 
                      value={formData.companyName}
                      onChange={handleChange}
                    />
                  </div>
                  
                  <FormInput 
                    label="Work Email" 
                    name="email"
                    placeholder="r.kumar@company.in" 
                    type="email" 
                    value={formData.email}
                    onChange={handleChange}
                  />

                  <div className="space-y-2">
                    <label className="text-xs font-bold uppercase text-slate-500 tracking-wider">Primary Industrial Hub</label>
                    <select 
                      name="region"
                      value={formData.region}
                      onChange={handleChange}
                      className="w-full bg-slate-50 border-2 border-slate-200 rounded-xl py-2.5 px-4 text-sm focus:border-blue-600 outline-none transition-all"
                    >
                      <option>Select Region</option>
                      <option>Ludhiana Cluster</option>
                      <option>Gujarat/Jamnagar</option>
                      <option>Mumbai/Pune</option>
                      <option>Other</option>
                    </select>
                  </div>

                  <div className="space-y-2">
                    <label className="text-xs font-bold uppercase text-slate-500 tracking-wider">
                      Production Process
                    </label>
                    <textarea 
                      name="productionProcess"
                      value={formData.productionProcess}
                      onChange={handleChange}
                      rows={3}
                      placeholder="e.g., Electric Arc Furnace, Cold Heading, Wire Drawing..."
                      className="w-full bg-slate-50 border-2 border-slate-200 rounded-xl py-2.5 px-4 text-sm focus:border-blue-600 outline-none transition-all resize-none"
                    />
                  </div>

                  {error && (
                    <div className="p-3 bg-red-50 border border-red-200 rounded-xl text-sm text-red-700">
                      {error}
                    </div>
                  )}

                  <div className="pt-2">
                    <button 
                      disabled={isSubmitting}
                      className="w-full py-4.5 bg-slate-900 hover:bg-blue-700 text-white font-bold rounded-xl flex items-center justify-center gap-3 transition-all disabled:opacity-70 disabled:cursor-not-allowed shadow-lg"
                    >
                      {isSubmitting ? (
                        <>
                          <Loader2 size={22} className="animate-spin" />
                          Sending...
                        </>
                      ) : (
                        <>
                          Send Request
                          <Send size={22} />
                        </>
                      )}
                    </button>
                    <p className="text-xs text-bold text-center text-slate-400 mt-3 leading-relaxed">
                      By submitting, you agree to our data processing terms.
                    </p>
                  </div>
                </form>
              </>
            ) : (
              <div className="py-20 text-center space-y-6">
                <div className="w-20 h-20 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto">
                  <CheckCircle2 size={40} />
                </div>
                <h3 className="text-2xl font-bold">Request Sent!</h3>
                <p className="text-slate-500 max-w-xs mx-auto">
                  We've received your details ({formData.email}). Our team will contact you shortly.
                </p>
                <button 
                  onClick={() => {
                    setSubmitted(false);
                    setFormData({ fullName: "", companyName: "", email: "", region: "Select Region", productionProcess: "" });
                  }}
                  className="text-sm font-bold text-blue-600 hover:text-blue-700 underline"
                >
                  Submit another request
                </button>
              </div>
            )}
          </div>

        </div>

        {/* FAQ Section Below */}
        <div className="max-w-4xl mx-auto">
          <h2 className="text-xl sm:text-2xl md:text-2xl font-bold mb-6 text-center">Frequently Asked Questions</h2>
          <div className="space-y-4">
            <FAQAccordion 
              question="Is this consultation binding?"
              answer="No, this is just an initial inquiry. We'll review your requirements and send you a proposal. You're only committed once you sign a formal agreement with us."
            />
            <FAQAccordion 
              question="What information do you need from me?"
              answer="We typically need your electricity bills and production records. If you don't have all the documents, don't worry - we can work with whatever data you have available."
            />
            <FAQAccordion 
              question="How long does the process take?"
              answer="We'll respond to your inquiry within 24 hours. The full assessment usually takes 3-5 business days, depending on the complexity of your operations."
            />
            <FAQAccordion 
              question="Is my data secure?"
              answer="Yes, absolutely. We use ISO 27001 certified systems and all data is encrypted. We can also sign an NDA before you share any sensitive information."
            />
          </div>
        </div>

      </div>
    </main>
  );
}

// Sub-components

function SLAMetric({ icon, value, subtext }: { icon: React.ReactNode; value: string; subtext: string }) {
  return (
    <div className="p-3 bg-white/5 border border-white/10 rounded-xl">
      <div className="text-blue-400 mb-2">{icon}</div>
      <div className="font-bold text-sm mb-1">{value}</div>
      <div className="text-xs text-slate-400">{subtext}</div>
    </div>
  );
}

function FAQAccordion({ question, answer }: { question: string; answer: string }) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="bg-white border-2 border-slate-200 rounded-xl overflow-hidden">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full p-4 flex items-center justify-between text-left hover:bg-slate-50 transition-colors"
      >
        <span className="font-semibold text-slate-900">{question}</span>
        <ChevronDown 
          size={20} 
          className={`text-slate-400 transition-transform ${isOpen ? 'rotate-180' : ''}`}
        />
      </button>
      {isOpen && (
        <div className="px-4 pb-4 text-sm text-slate-600 leading-relaxed">
          {answer}
        </div>
      )}
    </div>
  );
}

function FormInput({ label, placeholder, type = "text", name, value, onChange }: any) {
  return (
    <div className="space-y-2">
      <label className="text-xs font-bold uppercase text-slate-500 tracking-wider">{label}</label>
      <input 
        type={type} 
        name={name}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        required
        className="w-full bg-slate-50 border-2 border-slate-200 rounded-xl py-3 px-4 text-sm focus:border-blue-600 outline-none transition-all"
      />
    </div>
  );
}