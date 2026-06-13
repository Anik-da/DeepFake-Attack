'use client';

import React, { useState, useEffect, useRef } from 'react';
import { Brain, Cpu, Activity, ShieldCheck, Settings, Layers } from 'lucide-react';
import { modelMetrics } from '../../../lib/mockData';

export default function ExplainabilityPage() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  // States for threshold sliders
  const [sensitivity, setSensitivity] = useState(78);
  const [noiseReduction, setNoiseReduction] = useState(45);

  // Dynamic computed values based on sliders
  const truePositiveRate = (90 + (sensitivity * 0.1) - (noiseReduction * 0.05)).toFixed(1);
  const falsePositiveRate = ((100 - sensitivity) * 0.08 + (noiseReduction * 0.03)).toFixed(2);
  const throughput = Math.round(180 + (noiseReduction * 0.5) - (sensitivity * 0.3));

  // Audio/Visual spectral animation
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationId: number;
    let width = (canvas.width = canvas.offsetWidth);
    let height = (canvas.height = canvas.offsetHeight);

    const numBars = 45;
    const bars = Array.from({ length: numBars }, () => Math.random() * 0.8 + 0.2);

    const resize = () => {
      if (!canvas) return;
      width = canvas.width = canvas.offsetWidth;
      height = canvas.height = canvas.offsetHeight;
    };
    window.addEventListener('resize', resize);

    const render = () => {
      ctx.clearRect(0, 0, width, height);

      // Draw background grid lines
      ctx.strokeStyle = 'rgba(30, 41, 59, 0.15)';
      ctx.lineWidth = 1;
      for (let i = 20; i < height; i += 20) {
        ctx.beginPath();
        ctx.moveTo(0, i);
        ctx.lineTo(width, i);
        ctx.stroke();
      }

      // Draw spectrum bars
      const barWidth = width / numBars - 2;
      for (let i = 0; i < numBars; i++) {
        // Add random fluctuation based on sensitivity
        const targetVal = Math.random() * 0.7 + 0.1;
        bars[i] += (targetVal - bars[i]) * 0.25;

        const barHeight = bars[i] * height * 0.8;
        const x = i * (barWidth + 2);
        const y = height - barHeight;

        // Custom gradient for the bars
        const grad = ctx.createLinearGradient(0, y, 0, height);
        grad.addColorStop(0, '#2563EB'); // Blue primary
        grad.addColorStop(0.5, '#3b82f6'); // Accent light blue
        grad.addColorStop(1, 'rgba(37, 99, 235, 0.02)');

        ctx.fillStyle = grad;
        ctx.fillRect(x, y, barWidth, barHeight);
      }

      // Laser scanning overlay line
      const laserY = (Math.sin(Date.now() / 800) + 1) * 0.5 * height;
      ctx.strokeStyle = 'rgba(239, 68, 68, 0.5)';
      ctx.lineWidth = 2;
      ctx.beginPath();
      ctx.moveTo(0, laserY);
      ctx.lineTo(width, laserY);
      ctx.stroke();

      animationId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener('resize', resize);
      cancelAnimationFrame(animationId);
    };
  }, [sensitivity]);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      
      {/* Header */}
      <div>
        <h1 className="font-display font-black text-3xl text-text-primary tracking-tight">Explainability & Calibration Center</h1>
        <p className="text-xs sm:text-sm text-text-secondary mt-1">
          Adjust decision thresholds, optimize performance metrics, and review neural classifier layer probabilities.
        </p>
      </div>

      {/* Upper Grid: Model Classifiers Breakdown */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Left Card: Probabilities breakdown */}
        <div className="lg:col-span-7 rounded-2xl border border-border bg-surface p-5 sm:p-6 shadow-sm space-y-6">
          <div>
            <span className="text-[10px] font-bold text-primary uppercase tracking-wider block">Neural Classifier Layers</span>
            <h3 className="text-base font-bold text-text-primary mt-1">Model Probability Breakdowns</h3>
          </div>

          <div className="space-y-5">
            {Object.values(modelMetrics).map((model, idx) => (
              <div key={idx} className="space-y-1.5">
                <div className="flex justify-between items-start">
                  <div>
                    <span className="text-xs font-bold text-text-primary block">{model.label}</span>
                    <span className="text-[10px] text-text-secondary block mt-0.5 leading-relaxed">{model.description}</span>
                  </div>
                  <span className={`text-xs font-mono font-extrabold ${model.probability > 70 ? 'text-danger' : 'text-success'}`}>
                    {model.probability}%
                  </span>
                </div>
                
                {/* Custom Progress Bar */}
                <div className="h-2 bg-surface-2 rounded-full overflow-hidden border border-border/20">
                  <div 
                    className={`h-full rounded-full transition-all duration-500 ${
                      model.probability > 70 
                        ? 'bg-gradient-to-r from-primary to-danger' 
                        : 'bg-gradient-to-r from-primary to-success'
                    }`}
                    style={{ width: `${model.probability}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Right Card: Audio/Visual Spectrum Spectrogram */}
        <div className="lg:col-span-5 rounded-2xl border border-border bg-surface p-5 sm:p-6 shadow-sm flex flex-col justify-between">
          <div>
            <span className="text-[10px] font-bold text-primary uppercase tracking-wider block">Raw Data Inspection</span>
            <h3 className="text-base font-bold text-text-primary mt-1">Synthetic Spectrogram Analyzer</h3>
            <p className="text-[11px] text-text-secondary mt-1.5 leading-relaxed">
              Visualizing high-frequency neural features and compression anomalies.
            </p>
          </div>

          <div className="flex-grow min-h-[240px] mt-6 bg-[#040813] border border-border rounded-xl overflow-hidden relative">
            <canvas ref={canvasRef} className="w-full h-full block" />
            <div className="absolute top-3 right-3 px-2 py-1 bg-black/40 backdrop-blur-md rounded border border-white/10 text-[9px] font-mono text-primary font-bold">
              SIGNAL SYNC
            </div>
          </div>
        </div>
      </div>

      {/* Threshold & Metrics Simulation Row */}
      <div className="rounded-2xl border border-border bg-surface p-5 sm:p-6 shadow-sm space-y-6">
        <div className="border-b border-border pb-4">
          <span className="text-[10px] font-bold text-primary uppercase tracking-wider block">Model Calibration</span>
          <h3 className="text-base font-bold text-text-primary mt-1">Interactive Threshold Calibration</h3>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
          {/* Sliders Block */}
          <div className="space-y-6">
            <div className="space-y-2">
              <div className="flex justify-between items-center">
                <label className="text-xs font-bold text-text-secondary flex items-center gap-1.5">
                  <Settings className="w-4 h-4 text-primary" /> Sensitivity Threshold
                </label>
                <span className="text-xs font-mono font-extrabold text-primary">
                  {sensitivity}%
                </span>
              </div>
              <input
                type="range"
                min="30"
                max="98"
                value={sensitivity}
                onChange={(e) => setSensitivity(Number(e.target.value))}
                className="w-full h-1.5 bg-surface-2 rounded-lg appearance-none cursor-pointer accent-primary"
              />
              <span className="text-[10px] text-text-tertiary block leading-relaxed">
                Increasing sensitivity reduces False Negatives but increases overall False Positives.
              </span>
            </div>

            <div className="space-y-2">
              <div className="flex justify-between items-center">
                <label className="text-xs font-bold text-text-secondary flex items-center gap-1.5">
                  <Activity className="w-4 h-4 text-primary" /> Neural Spectral Filter
                </label>
                <span className="text-xs font-mono font-extrabold text-primary">
                  {noiseReduction}%
                </span>
              </div>
              <input
                type="range"
                min="10"
                max="90"
                value={noiseReduction}
                onChange={(e) => setNoiseReduction(Number(e.target.value))}
                className="w-full h-1.5 bg-surface-2 rounded-lg appearance-none cursor-pointer accent-primary"
              />
              <span className="text-[10px] text-text-tertiary block leading-relaxed">
                Fine-tunes the compression artifacts filter to prevent digital noise distortion.
              </span>
            </div>
          </div>

          {/* Calibrated Output KPIs */}
          <div className="grid grid-cols-2 gap-4 bg-surface-2 border border-border rounded-xl p-5">
            <div className="p-2 space-y-1">
              <div className="text-[9px] text-text-tertiary font-bold uppercase tracking-wider">True Positive Rate</div>
              <div className="text-lg font-extrabold text-success flex items-center gap-1.5">
                <ShieldCheck className="w-5 h-5" /> {truePositiveRate}%
              </div>
            </div>

            <div className="p-2 space-y-1">
              <div className="text-[9px] text-text-tertiary font-bold uppercase tracking-wider">False Positive Rate</div>
              <div className="text-lg font-extrabold text-danger flex items-center gap-1.5">
                <Activity className="w-5 h-5" /> {falsePositiveRate}%
              </div>
            </div>

            <div className="p-2 space-y-1">
              <div className="text-[9px] text-text-tertiary font-bold uppercase tracking-wider">Scanning Throughput</div>
              <div className="text-lg font-extrabold text-primary flex items-center gap-1.5">
                <Layers className="w-5 h-5" /> {throughput} fps
              </div>
            </div>

            <div className="p-2 space-y-1">
              <div className="text-[9px] text-text-tertiary font-bold uppercase tracking-wider">Model Latency</div>
              <div className="text-lg font-extrabold text-text-primary flex items-center gap-1.5">
                <Cpu className="w-5 h-5 text-text-secondary" /> {Math.round(24 + (sensitivity * 0.1))} ms
              </div>
            </div>
          </div>
        </div>
      </div>

    </div>
  );
}
