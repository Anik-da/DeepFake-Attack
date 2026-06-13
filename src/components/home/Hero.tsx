'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { ShieldCheck, Eye, Sparkles, CheckCircle, AlertTriangle } from 'lucide-react';

export const Hero = () => {
  const [activeTab, setActiveTab] = useState<'image' | 'video' | 'audio'>('image');
  const [scanProgress, setScanProgress] = useState(0);
  const [isScanning, setIsScanning] = useState(true);

  // Scanning loop for demo effect
  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isScanning) {
      interval = setInterval(() => {
        setScanProgress((prev) => {
          if (prev >= 100) {
            setIsScanning(false);
            // Wait 2s and scan again
            setTimeout(() => {
              setIsScanning(true);
              setScanProgress(0);
            }, 3000);
            return 100;
          }
          return prev + 2;
        });
      }, 50);
    }
    return () => clearInterval(interval);
  }, [isScanning]);

  return (
    <section className="relative overflow-hidden pt-12 pb-24 lg:pt-20 lg:pb-32 hero-grid">
      {/* Background radial glow */}
      <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] rounded-full bg-primary/10 blur-[120px] pointer-events-none" />
      <div className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] rounded-full bg-secondary/5 blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          {/* Text Content */}
          <div className="lg:col-span-7 flex flex-col space-y-6 text-left animate-fade-in-up">
            {/* Tag */}
            <div className="inline-flex items-center space-x-2 bg-primary-50 dark:bg-primary-100/10 border border-primary/20 rounded-full px-3.5 py-1.5 w-fit">
              <Sparkles className="w-4 h-4 text-primary animate-pulse" />
              <span className="text-xs font-bold text-primary tracking-wide uppercase">
                Next-Gen Synthetic Media Analysis
              </span>
            </div>

            {/* Title */}
            <h1 className="font-display font-extrabold text-4xl sm:text-5xl lg:text-6xl tracking-tight text-text-primary leading-tight">
              Detect Deepfakes. <br />
              <span className="gradient-text animate-gradient-shift">Verify Truth.</span> <br />
              Protect Trust.
            </h1>

            {/* Subtitle */}
            <p className="text-base sm:text-lg text-text-secondary max-w-xl leading-relaxed">
              AI-powered verification platform helping users identify manipulated images, videos, audio, and misinformation. Built for journalists, enterprises, and trust-critical teams.
            </p>

            {/* CTAs */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center space-y-3.5 sm:space-y-0 sm:space-x-4 pt-2">
              <Link
                href="/verify"
                className="px-8 py-3.5 text-center text-sm font-bold text-white bg-primary hover:bg-primary-dark transition-all rounded-xl shadow-lg hover:shadow-primary/20 shadow-primary/10 active:scale-[0.98] flex items-center justify-center space-x-2"
              >
                <ShieldCheck className="w-5 h-5" />
                <span>Analyze Content</span>
              </Link>
              <Link
                href="/verify?demo=true"
                className="px-8 py-3.5 text-center text-sm font-bold text-text-primary bg-surface hover:bg-surface-2 transition-all rounded-xl border border-border shadow-sm active:scale-[0.98] flex items-center justify-center space-x-2"
              >
                <Eye className="w-4.5 h-4.5 text-text-secondary" />
                <span>Try Demo</span>
              </Link>
            </div>

            {/* Trust Metrics */}
            <div className="grid grid-cols-3 gap-4 border-t border-border/60 pt-8 mt-4">
              <div>
                <p className="font-display font-bold text-2xl sm:text-3xl text-text-primary">99.8%</p>
                <p className="text-xs text-text-tertiary font-medium mt-0.5 uppercase tracking-wide">Analysis Accuracy</p>
              </div>
              <div>
                <p className="font-display font-bold text-2xl sm:text-3xl text-text-primary">1.2M+</p>
                <p className="text-xs text-text-tertiary font-medium mt-0.5 uppercase tracking-wide">Items Checked</p>
              </div>
              <div>
                <p className="font-display font-bold text-2xl sm:text-3xl text-text-primary">&lt; 15s</p>
                <p className="text-xs text-text-tertiary font-medium mt-0.5 uppercase tracking-wide">Processing Time</p>
              </div>
            </div>
          </div>

          {/* Graphical AI Scanning Panel */}
          <div className="lg:col-span-5 relative">
            <div className="relative mx-auto max-w-[400px] lg:max-w-none rounded-2xl border border-border bg-surface p-4.5 shadow-xl shadow-black/5 dark:shadow-black/25">
              {/* Tab Selector */}
              <div className="flex border-b border-border/80 pb-3 mb-4 space-x-1.5">
                {(['image', 'video', 'audio'] as const).map((tab) => (
                  <button
                    key={tab}
                    onClick={() => {
                      setActiveTab(tab);
                      setScanProgress(0);
                      setIsScanning(true);
                    }}
                    className={`flex-1 text-center py-1.5 text-xs font-semibold rounded-lg capitalize transition-colors duration-150 ${
                      activeTab === tab 
                        ? 'text-primary bg-primary-50 dark:bg-primary-100/10' 
                        : 'text-text-secondary hover:text-text-primary'
                    }`}
                  >
                    {tab}
                  </button>
                ))}
              </div>

              {/* Scanning Box */}
              <div className="relative rounded-xl overflow-hidden aspect-video bg-slate-900 flex items-center justify-center border border-border/50">
                {activeTab === 'image' && (
                  <img
                    src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=600&auto=format&fit=crop"
                    alt="Scan Face Demo"
                    className="w-full h-full object-cover"
                  />
                )}

                {activeTab === 'video' && (
                  <img
                    src="https://images.unsplash.com/photo-1544005313-94ddf0286df2?q=80&w=600&auto=format&fit=crop"
                    alt="Scan Video Demo"
                    className="w-full h-full object-cover"
                  />
                )}

                {activeTab === 'audio' && (
                  <div className="flex flex-col items-center justify-center p-6 text-center w-full h-full bg-slate-950">
                    <div className="flex space-x-1 mb-3">
                      {[1, 2, 3, 4, 5, 4, 3, 2, 1, 2, 4, 5, 3].map((h, i) => (
                        <div
                          key={i}
                          className="w-1 bg-primary rounded-full"
                          style={{
                            height: `${h * 4}px`,
                            animation: isScanning ? 'grid-pulse 1s ease-in-out infinite' : 'none',
                            animationDelay: `${i * 0.1}s`
                          }}
                        />
                      ))}
                    </div>
                    <span className="text-[10px] text-slate-400 font-mono">voice_recording_leak.mp3</span>
                  </div>
                )}

                {/* Laser scan line overlay */}
                {isScanning && (
                  <div className="absolute inset-x-0 h-0.5 bg-gradient-to-r from-transparent via-primary to-transparent animate-scan-line shadow-[0_0_10px_rgba(59,130,246,0.8)]" />
                )}

                {/* Status Overlay */}
                <div className="absolute top-3 right-3 bg-black/70 backdrop-blur-md px-2.5 py-1 rounded-full border border-white/10 flex items-center space-x-1.5">
                  <span className={`w-2 h-2 rounded-full ${isScanning ? 'bg-primary animate-ping' : 'bg-success'}`} />
                  <span className="text-[10px] font-bold text-white uppercase tracking-wider font-mono">
                    {isScanning ? `Analyzing ${scanProgress}%` : 'Analysis Done'}
                  </span>
                </div>

                {/* Face recognition boxes overlay */}
                {activeTab === 'image' && isScanning && (
                  <div className="absolute border-2 border-primary/80 rounded shadow-[0_0_8px_rgba(37,99,235,0.4)] top-[25%] left-[38%] w-[25%] h-[35%]">
                    <div className="absolute top-[-5px] left-[-5px] w-2 h-2 border-t-2 border-l-2 border-primary" />
                    <div className="absolute top-[-5px] right-[-5px] w-2 h-2 border-t-2 border-r-2 border-primary" />
                    <div className="absolute bottom-[-5px] left-[-5px] w-2 h-2 border-b-2 border-l-2 border-primary" />
                    <div className="absolute bottom-[-5px] right-[-5px] w-2 h-2 border-b-2 border-r-2 border-primary" />
                    <span className="absolute bottom-[-20px] left-0 text-[8px] bg-primary text-white px-1 py-0.5 rounded font-mono font-bold whitespace-nowrap">
                      DETECTING FACE: MANIPULATION LIKELY
                    </span>
                  </div>
                )}
              </div>

              {/* Analysis Indicators */}
              <div className="mt-4.5 space-y-3">
                <div className="flex justify-between items-center text-xs">
                  <span className="text-text-secondary font-medium">Manipulated Probability</span>
                  <span className={`font-bold font-mono ${isScanning ? 'text-text-primary' : 'text-danger'}`}>
                    {isScanning ? 'Calculating...' : activeTab === 'image' ? '88%' : activeTab === 'video' ? '6%' : '65%'}
                  </span>
                </div>
                <div className="w-full bg-surface-2 rounded-full h-2 overflow-hidden border border-border/50">
                  <div 
                    className={`h-full transition-all duration-300 ${
                      isScanning 
                        ? 'bg-primary animate-shimmer' 
                        : (activeTab === 'image' || activeTab === 'audio') 
                          ? 'bg-danger' 
                          : 'bg-success'
                    }`}
                    style={{ width: `${isScanning ? scanProgress : activeTab === 'image' ? 88 : activeTab === 'video' ? 6 : 65}%` }}
                  />
                </div>

                {/* Live Output Feed */}
                <div className="rounded-lg bg-surface-2 border border-border/60 p-3 flex items-start space-x-3.5">
                  {!isScanning ? (
                    (activeTab === 'image' || activeTab === 'audio') ? (
                      <>
                        <div className="w-8 h-8 rounded-lg bg-danger/10 text-danger flex items-center justify-center flex-shrink-0">
                          <AlertTriangle className="w-4.5 h-4.5" />
                        </div>
                        <div>
                          <p className="text-xs font-bold text-danger">Deepfake Manipulation Detected</p>
                          <p className="text-[11px] text-text-secondary mt-0.5 leading-snug">
                            {activeTab === 'image' 
                              ? 'Face splicing boundary detected along the jawline with Adobe Photoshop metadata traces.' 
                              : 'Robotic spectral intervals and text-to-speech transitions suggest voice cloning.'}
                          </p>
                        </div>
                      </>
                    ) : (
                      <>
                        <div className="w-8 h-8 rounded-lg bg-success/10 text-success flex items-center justify-center flex-shrink-0">
                          <CheckCircle className="w-4.5 h-4.5" />
                        </div>
                        <div>
                          <p className="text-xs font-bold text-success">Content Confirmed Authentic</p>
                          <p className="text-[11px] text-text-secondary mt-0.5 leading-snug">
                            Verification score: 94/100. No synthetic anomalies, pixel mismatches, or lip-sync errors identified.
                          </p>
                        </div>
                      </>
                    )
                  ) : (
                    <>
                      <div className="w-8 h-8 rounded-lg bg-primary/10 text-primary flex items-center justify-center flex-shrink-0 animate-pulse">
                        <Sparkles className="w-4.5 h-4.5" />
                      </div>
                      <div className="flex-1 space-y-1.5 py-0.5">
                        <div className="h-2.5 bg-border rounded w-1/3 skeleton" />
                        <div className="h-2 bg-border rounded w-4/5 skeleton" />
                      </div>
                    </>
                  )}
                </div>
              </div>
            </div>

            {/* Floating Trust Indicator Badge */}
            <div className="absolute top-[-15px] left-[-25px] hidden sm:flex items-center space-x-2 bg-surface border border-border shadow-md rounded-xl p-2.5 animate-float">
              <div className="w-7 h-7 rounded-lg bg-success/10 text-success flex items-center justify-center">
                <CheckCircle className="w-4 h-4 fill-current" />
              </div>
              <div>
                <p className="text-[10px] font-bold uppercase tracking-wider text-text-tertiary">FACT CHECKED</p>
                <p className="text-xs font-bold text-text-primary">100% Verified Claim</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
