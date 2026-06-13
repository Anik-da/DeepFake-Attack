'use client';

import React from 'react';
import { Shield, Users, Globe, Award, Heart, CheckCircle } from 'lucide-react';

export default function AboutPage() {
  const values = [
    {
      icon: <Shield className="w-5 h-5 text-primary" />,
      title: 'Digital Integrity',
      desc: 'We strive to provide access to clear indicators, ensuring that everyone can verify digital content authenticity.'
    },
    {
      icon: <Globe className="w-5 h-5 text-primary" />,
      title: 'Global Transparency',
      desc: 'Combatting systemic misinformation requires collaborative verification models accessible in any region.'
    },
    {
      icon: <Award className="w-5 h-5 text-primary" />,
      title: 'Verifiable Proof',
      desc: 'Providing detailed explanations and downloadable authenticity reports with cryptographic verification keys.'
    }
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-16">
      
      {/* Hero Mission */}
      <div className="text-center max-w-3xl mx-auto space-y-4">
        <h1 className="font-display font-black text-3xl sm:text-4xl text-text-primary tracking-tight">Our Mission</h1>
        <p className="text-sm sm:text-base text-text-secondary leading-relaxed">
          TruthGuard AI was founded to establish digital trust in an era of hyper-realistic generative AI manipulation. 
          We believe in protecting public conversation, journalism, and democracy by verifying facts and identifying digital counterfeits.
        </p>
      </div>

      {/* Grid: Core Values */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {values.map((val, i) => (
          <div key={i} className="rounded-2xl border border-border bg-surface p-6 shadow-sm">
            <div className="w-10 h-10 rounded-xl bg-primary-50 dark:bg-primary-100/10 flex items-center justify-center mb-4">
              {val.icon}
            </div>
            <h3 className="font-display font-bold text-base text-text-primary mb-2">{val.title}</h3>
            <p className="text-xs text-text-secondary leading-relaxed">{val.desc}</p>
          </div>
        ))}
      </div>

      {/* Technology block */}
      <div className="rounded-2xl border border-border bg-surface-2 p-6 sm:p-8 flex flex-col lg:flex-row items-center justify-between gap-8">
        <div className="max-w-xl space-y-4">
          <h2 className="font-display font-extrabold text-2xl text-text-primary tracking-tight">Built on Advanced Neural Classifiers</h2>
          <p className="text-xs sm:text-sm text-text-secondary leading-relaxed">
            Our verification engine employs multiple layers of deep learning algorithms trained on thousands of authentic and manipulated media assets.
          </p>
          <ul className="text-xs text-text-secondary space-y-2">
            <li className="flex items-center space-x-2">
              <CheckCircle className="w-4 h-4 text-success flex-shrink-0" />
              <span>Generative Adversarial Network (GAN) detection boundaries.</span>
            </li>
            <li className="flex items-center space-x-2">
              <CheckCircle className="w-4 h-4 text-success flex-shrink-0" />
              <span>Face landmark consistency and temporal blinking analyzers.</span>
            </li>
            <li className="flex items-center space-x-2">
              <CheckCircle className="w-4 h-4 text-success flex-shrink-0" />
              <span>Spectrogram synthetic audio fingerprinting and voice cloning detection.</span>
            </li>
          </ul>
        </div>
        
        {/* Abstract graphic */}
        <div className="w-full lg:max-w-xs border border-border rounded-xl bg-surface p-5 text-center relative overflow-hidden">
          <div className="absolute top-0 right-0 w-2.5 h-2.5 bg-primary rounded-full animate-ping m-3" />
          <Shield className="w-12 h-12 text-primary mx-auto mb-3" />
          <span className="text-[10px] font-bold text-text-tertiary uppercase tracking-wider block">Security Protocol</span>
          <span className="text-base font-extrabold text-text-primary block mt-1">Version 4.2.1-Prod</span>
          <div className="border-t border-border mt-4 pt-3 flex justify-between text-[10px] text-text-secondary font-mono">
            <span>Lat: 37.7749° N</span>
            <span>Lon: 122.4194° W</span>
          </div>
        </div>
      </div>

      {/* Team block */}
      <div className="space-y-6">
        <div className="text-center max-w-xl mx-auto">
          <h2 className="font-display font-bold text-2xl text-text-primary tracking-tight">Our Leadership Team</h2>
          <p className="text-xs text-text-secondary mt-1">Committed to engineering trust and building deep learning systems.</p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {[
            {
              name: 'Dr. Elena Rostova',
              role: 'Chief AI Architect',
              avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=256&h=256&fit=crop'
            },
            {
              name: 'Julian Sterling',
              role: 'Founder & CEO',
              avatar: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?q=80&w=256&h=256&fit=crop'
            },
            {
              name: 'Marcus Chen',
              role: 'Director of Product',
              avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?q=80&w=256&h=256&fit=crop'
            },
            {
              name: 'Sarah Lindqvist',
              role: 'Head of Threat Intel',
              avatar: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?q=80&w=256&h=256&fit=crop'
            }
          ].map((member, i) => (
            <div key={i} className="text-center rounded-xl border border-border bg-surface p-4">
              <img 
                src={member.avatar} 
                alt={member.name} 
                className="w-16 h-16 rounded-xl object-cover border border-border mx-auto mb-3"
              />
              <h4 className="text-xs sm:text-sm font-bold text-text-primary">{member.name}</h4>
              <p className="text-[10px] text-text-tertiary mt-0.5">{member.role}</p>
            </div>
          ))}
        </div>
      </div>

    </div>
  );
}
