'use client';

import React from 'react';
import Link from 'next/link';
import { ShieldAlert, Quote } from 'lucide-react';

export const SocialProof = () => {
  const testimonials = [
    {
      quote: "TruthGuard AI has become an indispensable tool in our investigative newsroom. It allows us to verify social media leaks and video submissions in minutes rather than hours.",
      author: "Sarah Jenkins",
      role: "Lead Fact-Checking Editor",
      company: "The Daily Chronicle"
    },
    {
      quote: "The voice cloning identification is incredibly precise. We integrated TruthGuard’s verification suite into our identity assurance pipeline to block voice-phishing attempts.",
      author: "David Vance",
      role: "VP of Cyber Security",
      company: "Apex Financial Group"
    }
  ];

  return (
    <section className="py-20 bg-surface-2 border-t border-border overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Trusted Partners */}
        <div className="text-center mb-16">
          <p className="text-xs font-bold uppercase tracking-wider text-text-tertiary">Trusted by leading entities in media, finance, and public safety</p>
          <div className="flex flex-wrap justify-center items-center gap-8 md:gap-16 mt-8 opacity-65 grayscale hover:grayscale-0 transition-all">
            <div className="font-display font-black text-xl text-text-secondary tracking-widest uppercase">CHRONICLE</div>
            <div className="font-display font-extrabold text-xl text-text-secondary tracking-tight">APEX FIN</div>
            <div className="font-display font-medium text-xl text-text-secondary italic">global_news</div>
            <div className="font-display font-bold text-xl text-text-secondary tracking-normal">SENTINEL.org</div>
          </div>
        </div>

        {/* Testimonials */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto mb-20">
          {testimonials.map((test, i) => (
            <div key={i} className="rounded-2xl border border-border bg-surface p-7.5 shadow-sm relative">
              <Quote className="w-10 h-10 text-primary-50 dark:text-primary-100/10 absolute top-6 right-6 -z-0" />
              <div className="relative z-10">
                <p className="text-sm sm:text-base text-text-secondary italic leading-relaxed mb-6">
                  "{test.quote}"
                </p>
                <div>
                  <h4 className="text-sm font-bold text-text-primary">{test.author}</h4>
                  <p className="text-xs text-text-tertiary mt-0.5">{test.role}, {test.company}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom CTA Block */}
        <div className="rounded-3xl bg-gradient-to-br from-primary to-secondary p-8 sm:p-12 lg:p-16 text-center text-white relative overflow-hidden shadow-xl shadow-primary/10 max-w-6xl mx-auto">
          {/* Decorative shapes */}
          <div className="absolute top-[-20%] left-[-20%] w-[60%] h-[60%] rounded-full bg-white/10 blur-3xl pointer-events-none" />
          <div className="absolute bottom-[-20%] right-[-20%] w-[60%] h-[60%] rounded-full bg-accent/20 blur-3xl pointer-events-none" />

          <div className="relative z-10 flex flex-col items-center max-w-2xl mx-auto space-y-6">
            <div className="w-12 h-12 rounded-2xl bg-white/10 flex items-center justify-center border border-white/20">
              <ShieldAlert className="w-6 h-6" />
            </div>
            
            <h2 className="font-display font-extrabold text-3xl sm:text-4xl tracking-tight leading-tight">
              Start Safeguarding Content Trust Today
            </h2>
            
            <p className="text-sm sm:text-base text-blue-100 max-w-lg leading-relaxed">
              Equip your editorial staff or enterprise security team with state-of-the-art visual, audio, and claims verification pipelines.
            </p>

            <div className="flex flex-col sm:flex-row items-stretch sm:items-center space-y-3 sm:space-y-0 sm:space-x-4 pt-4 w-full sm:w-auto">
              <Link
                href="/register"
                className="px-8 py-3.5 text-center text-sm font-bold text-primary bg-white hover:bg-blue-50 transition-all rounded-xl shadow-md active:scale-[0.98]"
              >
                Create Free Account
              </Link>
              <Link
                href="/verify"
                className="px-8 py-3.5 text-center text-sm font-bold text-white border border-white/30 hover:bg-white/10 transition-all rounded-xl active:scale-[0.98]"
              >
                Verify Link or File
              </Link>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
};
