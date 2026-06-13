'use client';

import React, { useState } from 'react';
import { Mail, Phone, MapPin, CheckCircle, HelpCircle, ChevronDown, ChevronUp } from 'lucide-react';

export default function ContactPage() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [submitted, setSubmitted] = useState(false);
  
  // FAQs Accordion State
  const [faqOpen, setFaqOpen] = useState<{ [key: number]: boolean }>({
    0: true
  });

  const faqs = [
    {
      q: 'How accurate is the deepfake classifier?',
      a: 'Our core classifiers achieve up to 99.8% detection accuracy on standard compression schemas and verified benchmarks. However, newer generative models may require continuous training updates.'
    },
    {
      q: 'Can I integrate TruthGuard verification into my CMS via API?',
      a: 'Yes, we offer REST and GraphQL endpoints for media organizations and enterprise developers. Please mention "API access request" in your contact form.'
    },
    {
      q: 'What media file formats are currently supported?',
      a: 'We accept JPEG, PNG, MP4, WebM, AVI, MP3, WAV, and AAC formats. File size limits are capped at 100MB for standard web uploads.'
    }
  ];

  const toggleFaq = (index: number) => {
    setFaqOpen(prev => ({
      ...prev,
      [index]: !prev[index]
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    setName('');
    setEmail('');
    setMessage('');
    setTimeout(() => {
      setSubmitted(false);
    }, 4000);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-12">
      
      {/* Page Header */}
      <div className="text-center max-w-3xl mx-auto">
        <h1 className="font-display font-black text-3xl sm:text-4xl text-text-primary tracking-tight">Contact TruthGuard</h1>
        <p className="text-sm sm:text-base text-text-secondary mt-3">
          Get in touch with our team for enterprise API support, press inquiries, or threat intelligence integrations.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* Left Column: Contact Form */}
        <div className="lg:col-span-7 rounded-2xl border border-border bg-surface p-6 sm:p-8 shadow-sm">
          <h2 className="text-sm font-bold text-text-primary uppercase tracking-wider mb-6">Send Us a Message</h2>
          
          {submitted ? (
            <div className="p-4 bg-success/10 border border-success/30 rounded-xl flex items-start space-x-3 text-success">
              <CheckCircle className="w-5 h-5 flex-shrink-0 mt-0.5" />
              <div>
                <h4 className="text-xs font-bold">Message Received!</h4>
                <p className="text-[11px] text-text-secondary mt-1">Thank you. An integrity engineer will review your request and get back to you shortly.</p>
              </div>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="text-[10px] uppercase font-bold text-text-secondary block mb-1">Your Name</label>
                <input
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="e.g. John Doe"
                  className="w-full px-3.5 py-2.5 text-xs rounded-lg border border-border bg-surface text-text-primary focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
                />
              </div>

              <div>
                <label className="text-[10px] uppercase font-bold text-text-secondary block mb-1">Your Email</label>
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="john@example.com"
                  className="w-full px-3.5 py-2.5 text-xs rounded-lg border border-border bg-surface text-text-primary focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
                />
              </div>

              <div>
                <label className="text-[10px] uppercase font-bold text-text-secondary block mb-1">Message</label>
                <textarea
                  required
                  rows={4}
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="How can we help you?..."
                  className="w-full px-3.5 py-2.5 text-xs rounded-lg border border-border bg-surface text-text-primary focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
                />
              </div>

              <button
                type="submit"
                className="w-full py-2.5 text-center text-xs font-bold text-white bg-primary hover:bg-primary-dark rounded-xl shadow-sm transition-all"
              >
                Send Message
              </button>
            </form>
          )}
        </div>

        {/* Right Column: Address, Channels & FAQs */}
        <div className="lg:col-span-5 space-y-6">
          
          {/* Info Details */}
          <div className="rounded-2xl border border-border bg-surface-2 p-5 space-y-4 text-xs">
            <h3 className="font-bold text-text-primary uppercase tracking-wider text-[10px]">Office & Support Channels</h3>
            
            <div className="flex items-start space-x-3">
              <MapPin className="w-4 h-4 text-primary mt-0.5 flex-shrink-0" />
              <div>
                <p className="font-semibold text-text-primary">San Francisco HQ</p>
                <p className="text-text-secondary mt-0.5">100 Pine Street, Floor 14, San Francisco, CA 94111</p>
              </div>
            </div>

            <div className="flex items-start space-x-3">
              <Mail className="w-4 h-4 text-primary mt-0.5 flex-shrink-0" />
              <div>
                <p className="font-semibold text-text-primary">Email Support</p>
                <p className="text-text-secondary mt-0.5">support@truthguard.ai</p>
              </div>
            </div>

            <div className="flex items-start space-x-3">
              <Phone className="w-4 h-4 text-primary mt-0.5 flex-shrink-0" />
              <div>
                <p className="font-semibold text-text-primary">Enterprise Contact</p>
                <p className="text-text-secondary mt-0.5">+1 (800) 555-TRUST</p>
              </div>
            </div>
          </div>

          {/* FAQs Accordion */}
          <div className="rounded-2xl border border-border bg-surface p-5 shadow-sm space-y-3">
            <h3 className="font-bold text-text-primary uppercase tracking-wider text-[10px] mb-2 flex items-center space-x-1">
              <HelpCircle className="w-4 h-4 text-primary" />
              <span>Frequently Asked Questions</span>
            </h3>

            <div className="divide-y divide-border">
              {faqs.map((faq, idx) => (
                <div key={idx} className="py-2.5 first:pt-0 last:pb-0">
                  <button
                    onClick={() => toggleFaq(idx)}
                    className="w-full flex justify-between items-center text-left text-xs font-bold text-text-primary hover:text-primary transition-colors py-1"
                  >
                    <span>{faq.q}</span>
                    {faqOpen[idx] ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                  </button>
                  {faqOpen[idx] && (
                    <p className="text-[11px] text-text-secondary mt-1.5 leading-relaxed pl-1">
                      {faq.a}
                    </p>
                  )}
                </div>
              ))}
            </div>
          </div>

        </div>

      </div>

    </div>
  );
}
