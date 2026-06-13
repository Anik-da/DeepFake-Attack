'use client';

import React from 'react';
import Link from 'next/link';
import { UploadCloud, CheckCircle2, LayoutDashboard, BarChart3, Award, Users } from 'lucide-react';

export const Features = () => {
  const features = [
    {
      icon: <UploadCloud className="w-6 h-6 text-primary" />,
      title: 'Deepfake Detection',
      description: 'Upload images, video recordings, or audio files to detect face swaps, lip-sync flaws, and synthetic voice cloning within seconds.',
      href: '/verify'
    },
    {
      icon: <CheckCircle2 className="w-6 h-6 text-primary" />,
      title: 'Fact Check Center',
      description: 'Enter claims, social media headlines, or articles. Get cross-referenced search evidence, verdicts, and source credibility rankings.',
      href: '/fact-check'
    },
    {
      icon: <LayoutDashboard className="w-6 h-6 text-primary" />,
      title: 'AI Trust Dashboard',
      description: 'Track total content verified, deepfakes cataloged, fact check statistics, and overall detection metrics in real-time graphs.',
      href: '/dashboard'
    },
    {
      icon: <BarChart3 className="w-6 h-6 text-primary" />,
      title: 'Misinformation Tracker',
      description: 'Monitor global and regional trending hoaxes. Stay ahead of viral misinformation across health, politics, finance, and tech.',
      href: '/reports'
    },
    {
      icon: <Award className="w-6 h-6 text-primary" />,
      title: 'Authenticity Certificate',
      description: 'Export verifiable, tamper-evident cryptographic reports detailing authenticity scores, face landmarks, and metadata anomalies.',
      href: '/verify'
    },
    {
      icon: <Users className="w-6 h-6 text-primary" />,
      title: 'Community Verification',
      description: 'Report suspicious links, crowdsource verifications, cast votes on media integrity, and calculate overall community credibility.',
      href: '/reports'
    }
  ];

  return (
    <section className="py-20 bg-surface-2 border-y border-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Heading */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="font-display font-extrabold text-3xl sm:text-4xl text-text-primary tracking-tight">
            Integrated Defense Against Digital Manipulation
          </h2>
          <p className="text-base sm:text-lg text-text-secondary mt-4">
            TruthGuard AI combines deep learning detection pipelines, web verification engines, and community intelligence into a unified authenticity platform.
          </p>
        </div>

        {/* Feature Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feat, index) => (
            <div
              key={index}
              className="group relative rounded-2xl border border-border bg-surface p-7 shadow-sm hover:shadow-md hover:border-primary/20 transition-all duration-200 hover:-translate-y-1"
            >
              {/* Icon Container */}
              <div className="w-12 h-12 rounded-xl bg-primary-50 dark:bg-primary-100/10 flex items-center justify-center mb-6 group-hover:scale-105 transition-transform duration-200">
                {feat.icon}
              </div>

              {/* Title */}
              <h3 className="font-display font-bold text-lg text-text-primary mb-2.5">
                {feat.title}
              </h3>

              {/* Description */}
              <p className="text-sm text-text-secondary leading-relaxed mb-6">
                {feat.description}
              </p>

              {/* Link */}
              <Link
                href={feat.href}
                className="text-xs font-bold text-primary hover:text-primary-dark transition-colors inline-flex items-center space-x-1"
              >
                <span>Access Feature</span>
                <span className="group-hover:translate-x-0.5 transition-transform duration-150">&rarr;</span>
              </Link>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
