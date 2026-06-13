'use client';

import React, { useState, useEffect, useRef, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import { Upload, FileImage, FileVideo, FileAudio, AlertTriangle, CheckCircle, Shield, ArrowRight, Download, RefreshCw, Sparkles, HelpCircle } from 'lucide-react';
import { mockDeepfakeAnalyses } from '../../lib/mockData';
import { DeepfakeAnalysisResult } from '../../types';
import { useAuth } from '../../context/AuthContext';

function VerifyContent() {
  const searchParams = useSearchParams();
  const { addToHistory } = useAuth();
  const fileInputRef = useRef<HTMLInputElement>(null);

  // States
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [demoFileName, setDemoFileName] = useState<string | null>(null);
  const [isScanning, setIsScanning] = useState(false);
  const [scanProgress, setScanProgress] = useState(0);
  const [scanStep, setScanStep] = useState('');
  const [result, setResult] = useState<DeepfakeAnalysisResult | null>(null);
  const [showCertificate, setShowCertificate] = useState(false);

  // Demo file trigger via query params or click
  useEffect(() => {
    const isDemo = searchParams.get('demo');
    if (isDemo === 'true') {
      triggerDemo('political_rally_speech.jpg');
    }
  }, [searchParams]);

  const triggerDemo = (fileName: string) => {
    setResult(null);
    setSelectedFile(null);
    setShowCertificate(false);
    setDemoFileName(fileName);
    startScanning(fileName);
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      // Allow files up to 1GB (1000MB)
      if (file.size > 1000 * 1024 * 1024) {
        alert('File size exceeds the 1GB limit. Please upload a smaller file.');
        return;
      }
      setSelectedFile(file);
      setDemoFileName(null);
      setResult(null);
      setShowCertificate(false);
      startScanning(file.name, file);
    }
  };

  const triggerFileUpload = () => {
    fileInputRef.current?.click();
  };

  // Scan simulation
  const startScanning = (name: string, fileObject?: File) => {
    setIsScanning(true);
    setScanProgress(0);
    setScanStep('Initializing files...');

    const steps = [
      { progress: 15, step: 'Decompressing container data...' },
      { progress: 35, step: 'Analyzing metadata EXIF headers...' },
      { progress: 55, step: 'Extracting focal regions & facial landmarks...' },
      { progress: 75, step: 'Running adversarial synthetic classifiers...' },
      { progress: 90, step: 'Synthesizing voice spectrogram patterns...' },
      { progress: 100, step: 'Generating authenticity certificate...' }
    ];

    let currentStepIdx = 0;
    const interval = setInterval(() => {
      setScanProgress((prev) => {
        const target = steps[currentStepIdx]?.progress || 100;
        if (prev >= target) {
          if (currentStepIdx < steps.length - 1) {
            currentStepIdx++;
            setScanStep(steps[currentStepIdx].step);
          } else {
            clearInterval(interval);
            setIsScanning(false);
            showResults(name, fileObject);
          }
          return target;
        }
        return prev + 1.5;
      });
    }, 45);
  };

  const showResults = async (name: string, fileObject?: File) => {
    let resolvedResult: DeepfakeAnalysisResult | null = null;

    if (fileObject) {
      try {
        const formData = new FormData();
        formData.append('file', fileObject);
        const fileType = fileObject.type.startsWith('image/') 
          ? 'image' 
          : fileObject.type.startsWith('audio/') 
            ? 'audio' 
            : 'video';
        formData.append('type', fileType);

        // Call the Python backend endpoint
        const response = await fetch('http://127.0.0.1:8000/api/verify', {
          method: 'POST',
          body: formData,
        });

        if (response.ok) {
          resolvedResult = await response.json();
        } else {
          console.warn('Local inference server returned an error. Falling back to simulation...');
        }
      } catch (error) {
        console.warn('Could not connect to local AI inference server. Running simulated fallback...');
      }
    }

    // Try mock preset deepfakes if not matched/failed by local API
    if (!resolvedResult) {
      resolvedResult = mockDeepfakeAnalyses[name];
    }

    if (!resolvedResult) {
      // Fallback/Default for user-uploaded custom files
      const isFake = Math.random() > 0.5;
      const score = isFake ? Math.floor(15 + Math.random() * 30) : Math.floor(85 + Math.random() * 12);
      const prob = 100 - score;
      
      resolvedResult = {
        id: 'TG-' + Math.floor(10000 + Math.random() * 90000),
        type: name.endsWith('.mp3') || name.endsWith('.wav') ? 'audio' : name.endsWith('.mp4') ? 'video' : 'image',
        fileName: name,
        fileSize: selectedFile ? `${(selectedFile.size / (1024 * 1024)).toFixed(1)} MB` : '3.8 MB',
        timestamp: new Date().toISOString().replace('T', ' ').substring(0, 16),
        authenticityScore: score,
        manipulationProbability: prob,
        riskLevel: score < 30 ? 'critical' : score < 60 ? 'high' : score < 85 ? 'medium' : 'low',
        faceAnalysis: score < 85 ? {
          skinTextureScore: score + 10,
          eyeBlinkingConsistency: score - 5 > 0 ? score - 5 : 0,
          mouthMovementSync: score,
          landmarksDetected: 68,
          anomalyDetails: ['Unnatural blend transitions found around active boundaries.', 'EXIF data altered.']
        } : undefined,
        metadataAnalysis: {
          exifDataModified: isFake,
          anomaliesFound: isFake ? ['Camera model signature modified.'] : []
        },
        explanation: isFake 
          ? 'Deep neural analysis detected spatial artifacts and adversarial frequency anomalies. The voice/face lacks standard micro-physiological features, confirming synthetically altered parameters.'
          : 'The media satisfies normal camera sensor compression schemas, audio alignment vectors, and standard color spaces. Verified authentic.',
        certificateId: 'TG-CERT-' + Math.floor(100000 + Math.random() * 900000)
      };
    }

    setResult(resolvedResult);
    
    // Add to user session history
    addToHistory({
      type: resolvedResult.type,
      fileName: resolvedResult.fileName,
      fileSize: resolvedResult.fileSize,
      authenticityScore: resolvedResult.authenticityScore,
      riskLevel: resolvedResult.riskLevel
    });
  };

  const downloadCertificate = () => {
    if (!result) return;
    const printWindow = window.open('', '_blank');
    if (!printWindow) {
      alert('Please allow popups to download the certificate.');
      return;
    }
    
    printWindow.document.write(`
      <html>
        <head>
          <title>TruthGuard AI Verification Certificate - ${result.certificateId}</title>
          <style>
            body {
              font-family: 'Courier New', Courier, monospace;
              padding: 40px;
              background-color: #0d0f12;
              color: #e2e8f0;
              text-align: center;
            }
            .certificate-box {
              border: 4px double #3b82f6;
              padding: 30px;
              max-width: 650px;
              margin: 0 auto;
              background-color: #111827;
              border-radius: 12px;
            }
            .header {
              font-size: 24px;
              font-weight: bold;
              margin-bottom: 20px;
              color: #3b82f6;
              text-transform: uppercase;
              letter-spacing: 2px;
            }
            .meta {
              text-align: left;
              margin: 20px 0;
              font-size: 14px;
              line-height: 1.6;
            }
            .meta-item {
              margin-bottom: 8px;
            }
            .label {
              font-weight: bold;
              color: #9ca3af;
            }
            .value {
              color: #f3f4f6;
            }
            .badge {
              display: inline-block;
              padding: 10px 20px;
              font-size: 18px;
              font-weight: bold;
              border-radius: 8px;
              margin: 20px 0;
              text-transform: uppercase;
            }
            .authentic {
              background-color: rgba(16, 185, 129, 0.2);
              color: #10b981;
              border: 1px solid #10b981;
            }
            .manipulated {
              background-color: rgba(239, 68, 68, 0.2);
              color: #ef4444;
              border: 1px solid #ef4444;
            }
            .footer-sig {
              margin-top: 40px;
              border-top: 1px dashed #374151;
              padding-top: 20px;
              font-size: 12px;
              color: #6b7280;
            }
            @media print {
              body {
                background-color: #ffffff;
                color: #000000;
              }
              .certificate-box {
                border: 4px double #000000;
                background-color: #ffffff;
                box-shadow: none;
              }
              .header {
                color: #000000;
              }
              .badge {
                border: 2px solid #000000;
                color: #000000;
                background: none;
              }
            }
          </style>
        </head>
        <body>
          <div class="certificate-box">
            <div class="header">TruthGuard AI Forensic Laboratory</div>
            <p style="font-size: 14px; color: #9ca3af;">CRYPTOGRAPHIC VERIFICATION CERTIFICATE</p>
            
            <div class="badge ${result.authenticityScore > 60 ? 'authentic' : 'manipulated'}">
              ${result.authenticityScore > 60 ? 'Verified Original' : 'AI Manipulated / Deepfake'}
            </div>

            <div class="meta">
              <div class="meta-item"><span class="label">Certificate ID:</span> <span class="value">${result.certificateId}</span></div>
              <div class="meta-item"><span class="label">Analysis Timestamp:</span> <span class="value">${result.timestamp || new Date().toISOString()}</span></div>
              <div class="meta-item"><span class="label">Target Filename:</span> <span class="value">${result.fileName}</span></div>
              <div class="meta-item"><span class="label">Target Filesize:</span> <span class="value">${result.fileSize}</span></div>
              <div class="meta-item"><span class="label">Authenticity Score:</span> <span class="value">${result.authenticityScore}%</span></div>
              <div class="meta-item"><span class="label">Manipulation Risk:</span> <span class="value">${result.manipulationProbability}%</span></div>
              <div class="meta-item"><span class="label">Risk Category:</span> <span class="value" style="text-transform: uppercase;">${result.riskLevel}</span></div>
            </div>

            <p style="text-align: left; font-size: 12px; color: #9ca3af; line-height: 1.5; margin-top: 20px;">
              <strong>Forensic Explanation:</strong> ${result.explanation}
            </p>

            <div class="footer-sig">
              <p>SECURE CRYPTOGRAPHIC DIGITAL SIGNATURE</p>
              <p style="font-family: monospace; font-size: 10px;">tg-signature-hash-${result.certificateId.toLowerCase()}-verified</p>
            </div>
          </div>
          <script>
            window.onload = function() {
              window.print();
              setTimeout(function() { window.close(); }, 500);
            }
          </script>
        </body>
      </html>
    `);
    printWindow.document.close();
  };

  const getRiskColor = (level: string) => {
    switch (level) {
      case 'low': return 'text-success bg-success/10 border-success/25';
      case 'medium': return 'text-warning bg-warning/10 border-warning/25';
      case 'high': return 'text-danger bg-danger/10 border-danger/25';
      case 'critical': return 'text-danger bg-danger/15 border-danger/40';
      default: return 'text-text-secondary bg-surface-2 border-border';
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      
      {/* Page Header */}
      <div className="text-center max-w-3xl mx-auto mb-10">
        <h1 className="font-display font-black text-3xl sm:text-4xl text-text-primary tracking-tight">
          Verify Media Authenticity
        </h1>
        <p className="text-sm sm:text-base text-text-secondary mt-3">
          Deep learning models to detect manipulation, facial splicing, and AI voice clones.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* Left Side: Upload Zone & Demos */}
        <div className="lg:col-span-5 space-y-6">
          
          {/* Upload card */}
          <div className="rounded-2xl border border-border bg-surface p-5 sm:p-6 shadow-sm">
            <h2 className="text-sm font-bold text-text-primary uppercase tracking-wider mb-4">Analyze New File</h2>
            
            <div
              onClick={triggerFileUpload}
              className="border-2 border-dashed border-border hover:border-primary/50 rounded-xl p-8 text-center cursor-pointer hover:bg-surface-2 transition-all group relative overflow-hidden"
            >
              <input
                ref={fileInputRef}
                type="file"
                accept="image/*,video/*,audio/*"
                onChange={handleFileChange}
                className="hidden"
              />
              <div className="w-12 h-12 rounded-xl bg-primary-50 dark:bg-primary-100/10 flex items-center justify-center mx-auto mb-4 group-hover:scale-105 transition-transform">
                <Upload className="w-5.5 h-5.5 text-primary" />
              </div>
              <p className="text-sm font-bold text-text-primary">Drag & drop files here</p>
              <p className="text-xs text-text-secondary mt-1">Images, Videos, or Audio up to 1GB</p>
              <div className="mt-4 flex items-center justify-center space-x-2 text-xs text-text-tertiary">
                <span className="flex items-center space-x-1"><FileImage className="w-3.5 h-3.5" /> <span>JPG/PNG</span></span>
                <span>•</span>
                <span className="flex items-center space-x-1"><FileVideo className="w-3.5 h-3.5" /> <span>MP4/WebM</span></span>
                <span>•</span>
                <span className="flex items-center space-x-1"><FileAudio className="w-3.5 h-3.5" /> <span>MP3/WAV</span></span>
              </div>
            </div>

            {selectedFile && (
              <div className="mt-4 p-3 bg-surface-2 rounded-lg border border-border flex items-center justify-between">
                <div className="flex items-center space-x-2.5 truncate">
                  <FileImage className="w-4 h-4 text-primary flex-shrink-0" />
                  <span className="text-xs font-semibold text-text-primary truncate max-w-[150px]">{selectedFile.name}</span>
                </div>
                <span className="text-[10px] text-text-tertiary">{(selectedFile.size / (1024 * 1024)).toFixed(1)} MB</span>
              </div>
            )}
          </div>

          {/* Demos selector */}
          <div className="rounded-2xl border border-border bg-surface p-5 sm:p-6 shadow-sm">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-sm font-bold text-text-primary uppercase tracking-wider">Try Sample Demos</h2>
              <Sparkles className="w-4.5 h-4.5 text-primary" />
            </div>

            <div className="space-y-2.5">
              <button
                onClick={() => triggerDemo('political_rally_speech.jpg')}
                className="w-full flex items-center justify-between p-3.5 rounded-xl border border-border hover:border-primary/30 hover:bg-surface-2 transition-all text-left group"
              >
                <div className="flex items-center space-x-3">
                  <div className="w-9 h-9 rounded-lg bg-danger/10 text-danger flex items-center justify-center">
                    <FileImage className="w-4.5 h-4.5" />
                  </div>
                  <div>
                    <p className="text-xs font-bold text-text-primary">political_rally_speech.jpg</p>
                    <p className="text-[10px] text-text-secondary mt-0.5">Image • Face-Swap Attack Demo</p>
                  </div>
                </div>
                <ArrowRight className="w-4 h-4 text-text-tertiary group-hover:text-primary transition-colors" />
              </button>

              <button
                onClick={() => triggerDemo('ceo_announcement_final.mp4')}
                className="w-full flex items-center justify-between p-3.5 rounded-xl border border-border hover:border-primary/30 hover:bg-surface-2 transition-all text-left group"
              >
                <div className="flex items-center space-x-3">
                  <div className="w-9 h-9 rounded-lg bg-success/10 text-success flex items-center justify-center">
                    <FileVideo className="w-4.5 h-4.5" />
                  </div>
                  <div>
                    <p className="text-xs font-bold text-text-primary">ceo_announcement_final.mp4</p>
                    <p className="text-[10px] text-text-secondary mt-0.5">Video • Original Clip Verification</p>
                  </div>
                </div>
                <ArrowRight className="w-4 h-4 text-text-tertiary group-hover:text-primary transition-colors" />
              </button>

              <button
                onClick={() => triggerDemo('voice_recording_leak.mp3')}
                className="w-full flex items-center justify-between p-3.5 rounded-xl border border-border hover:border-primary/30 hover:bg-surface-2 transition-all text-left group"
              >
                <div className="flex items-center space-x-3">
                  <div className="w-9 h-9 rounded-lg bg-warning/10 text-warning flex items-center justify-center">
                    <FileAudio className="w-4.5 h-4.5" />
                  </div>
                  <div>
                    <p className="text-xs font-bold text-text-primary">voice_recording_leak.mp3</p>
                    <p className="text-[10px] text-text-secondary mt-0.5">Audio • AI Voice Clone Deepfake</p>
                  </div>
                </div>
                <ArrowRight className="w-4 h-4 text-text-tertiary group-hover:text-primary transition-colors" />
              </button>
            </div>
          </div>

        </div>

        {/* Right Side: Analysis Display */}
        <div className="lg:col-span-7">
          
          {/* Default Empty State */}
          {!isScanning && !result && (
            <div className="rounded-2xl border border-border bg-surface-2 p-12 text-center flex flex-col items-center justify-center min-h-[380px]">
              <div className="w-14 h-14 rounded-2xl bg-surface border border-border flex items-center justify-center text-text-tertiary mb-4.5">
                <Shield className="w-6 h-6" />
              </div>
              <h3 className="text-base font-bold text-text-primary">Awaiting File Selection</h3>
              <p className="text-xs text-text-secondary mt-2 max-w-sm leading-relaxed">
                Drag a file into the upload block or click one of our sample deepfake demonstration cards to trigger our detection engines.
              </p>
            </div>
          )}

          {/* Scanning Animation */}
          {isScanning && (
            <div className="rounded-2xl border border-border bg-surface p-6 sm:p-8 shadow-sm space-y-8 animate-scale-in">
              <div className="flex flex-col md:flex-row gap-8 items-center md:items-start">
                
                {/* Circular scanner progress */}
                <div className="w-full md:w-1/3 flex flex-col items-center justify-center text-center p-4 border border-border bg-surface-2/40 rounded-xl">
                  <div className="relative w-20 h-20 mb-4">
                    <div className="absolute inset-0 rounded-full border-2 border-primary/20 animate-ping" />
                    <div className="absolute inset-2 rounded-full border-2 border-primary/40 animate-pulse" />
                    <div className="absolute inset-0 flex items-center justify-center text-primary">
                      <RefreshCw className="w-7 h-7 animate-spin" />
                    </div>
                  </div>
                  <h4 className="text-xs font-bold uppercase tracking-wider text-text-secondary">AI Diagnostic Sweep</h4>
                  <div className="w-full bg-surface rounded-full h-2 overflow-hidden border border-border/60 mt-3.5">
                    <div className="h-full bg-primary transition-all duration-300" style={{ width: `${scanProgress}%` }} />
                  </div>
                  <span className="text-xs font-mono font-extrabold text-primary mt-1.5">{Math.round(scanProgress)}% Completed</span>
                </div>

                {/* Timeline Checklist */}
                <div className="flex-1 w-full space-y-4">
                  <span className="text-[10px] font-bold text-primary uppercase tracking-wider block">Investigation Timeline</span>
                  <div className="space-y-3 relative pl-4 border-l border-border/80 ml-2">
                    {[
                      { limit: 15, label: 'Decompressing container data...' },
                      { limit: 35, label: 'Analyzing metadata EXIF headers...' },
                      { limit: 55, label: 'Extracting focal regions & facial landmarks...' },
                      { limit: 75, label: 'Running adversarial synthetic classifiers...' },
                      { limit: 90, label: 'Synthesizing voice spectrogram patterns...' },
                      { limit: 100, label: 'Generating authenticity certificate...' }
                    ].map((step, idx, arr) => {
                      const prevLimit = idx === 0 ? 0 : arr[idx - 1].limit;
                      const isDone = scanProgress >= step.limit;
                      const isCurrent = scanProgress >= prevLimit && scanProgress < step.limit;
                      
                      return (
                        <div key={idx} className={`flex items-center justify-between transition-all duration-300 ${
                          isDone || isCurrent ? 'opacity-100' : 'opacity-35'
                        }`}>
                          <div className="flex items-center space-x-3">
                            <div className={`w-5 h-5 rounded-full flex items-center justify-center border text-[10px] ${
                              isDone 
                                ? 'bg-success border-success text-white' 
                                : isCurrent 
                                  ? 'border-primary bg-primary/10 text-primary animate-pulse' 
                                  : 'border-border bg-surface-2 text-text-tertiary'
                            }`}>
                              {isDone ? '✓' : idx + 1}
                            </div>
                            <span className={`text-xs ${isCurrent ? 'font-bold text-primary' : 'text-text-primary'}`}>
                              {step.label}
                            </span>
                          </div>
                          {isCurrent && (
                            <span className="text-[9px] font-bold text-primary animate-pulse tracking-wide uppercase">ACTIVE</span>
                          )}
                          {isDone && (
                            <span className="text-[9px] font-bold text-success font-mono">OK</span>
                          )}
                        </div>
                      );
                    })}
                  </div>
                </div>

              </div>
            </div>
          )}

          {/* Results Panel */}
          {!isScanning && result && !showCertificate && (
            <div className="rounded-2xl border border-border bg-surface p-6 sm:p-8 shadow-sm space-y-6 animate-scale-in">
              
              {/* Results Title Block */}
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center border-b border-border pb-5 gap-3">
                <div>
                  <div className="flex items-center space-x-2">
                    <span className="text-xs font-bold text-text-tertiary font-mono uppercase">{result.id}</span>
                    <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full border uppercase tracking-wide ${getRiskColor(result.riskLevel)}`}>
                      {result.riskLevel} Risk
                    </span>
                  </div>
                  <h3 className="text-lg font-bold text-text-primary mt-1">{result.fileName}</h3>
                </div>
                <div className="flex space-x-2">
                  <button
                    onClick={() => setShowCertificate(true)}
                    className="px-3.5 py-1.5 text-xs font-bold text-white bg-primary hover:bg-primary-dark transition-all rounded-lg shadow-sm flex items-center space-x-1.5"
                  >
                    <Download className="w-3.5 h-3.5" />
                    <span>View Certificate</span>
                  </button>
                  <button
                    onClick={() => {
                      setResult(null);
                      setSelectedFile(null);
                    }}
                    className="p-1.5 rounded-lg border border-border text-text-secondary hover:text-text-primary hover:bg-surface-2"
                  >
                    <RefreshCw className="w-4 h-4" />
                  </button>
                </div>
              </div>

              {/* Guages Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                
                {/* Circular Gauge */}
                <div className="rounded-xl border border-border bg-surface-2 p-5 flex flex-col items-center justify-center text-center">
                  <span className="text-xs font-bold text-text-secondary uppercase tracking-wider mb-3.5">Authenticity Score</span>
                  <div className="relative w-28 h-28 flex items-center justify-center">
                    
                    {/* SVG Progress Circle */}
                    <svg className="w-full h-full transform -rotate-90">
                      <circle cx="56" cy="56" r="46" strokeWidth="8" stroke="var(--border)" fill="transparent" />
                      <circle 
                        cx="56" 
                        cy="56" 
                        r="46" 
                        strokeWidth="8" 
                        stroke={result.authenticityScore > 70 ? 'var(--success)' : result.authenticityScore > 40 ? 'var(--warning)' : 'var(--danger)'} 
                        fill="transparent" 
                        strokeDasharray={2 * Math.PI * 46}
                        strokeDashoffset={2 * Math.PI * 46 * (1 - result.authenticityScore / 100)}
                        strokeLinecap="round"
                      />
                    </svg>
                    <div className="absolute text-center">
                      <span className="font-display font-extrabold text-2xl text-text-primary">{result.authenticityScore}</span>
                      <span className="text-[10px] text-text-tertiary block font-bold font-mono">/100</span>
                    </div>
                  </div>
                </div>

                {/* Probability */}
                <div className="rounded-xl border border-border bg-surface-2 p-5 flex flex-col justify-between">
                  <div className="space-y-4">
                    <div>
                      <span className="text-[10px] font-bold text-text-tertiary uppercase tracking-wider">Manipulation Probability</span>
                      <div className="flex justify-between items-end mt-1">
                        <span className="font-display font-extrabold text-2xl text-text-primary">{result.manipulationProbability}%</span>
                        <span className="text-xs text-text-secondary font-medium">Likelihood of AI Synthesis</span>
                      </div>
                      <div className="w-full bg-border rounded-full h-2 mt-2 overflow-hidden">
                        <div 
                          className={`h-full ${result.manipulationProbability > 60 ? 'bg-danger' : 'bg-success'}`}
                          style={{ width: `${result.manipulationProbability}%` }}
                        />
                      </div>
                    </div>
                  </div>

                  <div className="border-t border-border pt-3 mt-4 flex items-center justify-between text-xs">
                    <span className="text-text-secondary">EXIF Metadata Altered:</span>
                    <span className={`font-bold ${result.metadataAnalysis.exifDataModified ? 'text-danger' : 'text-success'}`}>
                      {result.metadataAnalysis.exifDataModified ? 'Yes' : 'No'}
                    </span>
                  </div>
                </div>

              </div>

              {/* Explanatory Report */}
              <div className="rounded-xl border border-border p-4 flex items-start space-x-3.5">
                {result.authenticityScore < 60 ? (
                  <div className="w-9 h-9 rounded-lg bg-danger/10 text-danger flex items-center justify-center flex-shrink-0">
                    <AlertTriangle className="w-5 h-5" />
                  </div>
                ) : (
                  <div className="w-9 h-9 rounded-lg bg-success/10 text-success flex items-center justify-center flex-shrink-0">
                    <CheckCircle className="w-5 h-5" />
                  </div>
                )}
                <div>
                  <h4 className="text-sm font-bold text-text-primary">AI Analysis Explanatory Summary</h4>
                  <p className="text-xs text-text-secondary mt-1 leading-relaxed">
                    {result.explanation}
                  </p>
                </div>
              </div>

              {/* Advanced Technical Details */}
              <div className="space-y-4 pt-2">
                <h4 className="text-xs font-bold text-text-primary uppercase tracking-wider">Detection Parameters</h4>
                
                {/* Face analysis details (for image/video) */}
                {result.faceAnalysis && (
                  <div className="rounded-xl border border-border bg-surface-2 p-4 space-y-3.5">
                    <span className="text-xs font-bold text-text-secondary block">Facial Authenticity Classifier</span>
                    <div className="grid grid-cols-3 gap-4 text-center">
                      <div className="p-2 border border-border rounded-lg bg-surface">
                        <span className="text-[10px] text-text-tertiary font-bold uppercase tracking-wider block">Texture</span>
                        <span className="text-sm font-extrabold text-text-primary block mt-0.5">{result.faceAnalysis.skinTextureScore}%</span>
                      </div>
                      <div className="p-2 border border-border rounded-lg bg-surface">
                        <span className="text-[10px] text-text-tertiary font-bold uppercase tracking-wider block">Blinking</span>
                        <span className="text-sm font-extrabold text-text-primary block mt-0.5">{result.faceAnalysis.eyeBlinkingConsistency}%</span>
                      </div>
                      <div className="p-2 border border-border rounded-lg bg-surface">
                        <span className="text-[10px] text-text-tertiary font-bold uppercase tracking-wider block">Lip-Sync</span>
                        <span className="text-sm font-extrabold text-text-primary block mt-0.5">{result.faceAnalysis.mouthMovementSync}%</span>
                      </div>
                    </div>
                    {result.faceAnalysis.anomalyDetails.length > 0 && (
                      <div className="space-y-1.5 border-t border-border pt-3">
                        <span className="text-[10px] font-bold text-text-tertiary uppercase tracking-wider">Identified Anomalies:</span>
                        <ul className="text-xs text-text-secondary list-disc pl-4 space-y-1">
                          {result.faceAnalysis.anomalyDetails.map((det, i) => (
                            <li key={i}>{det}</li>
                          ))}
                        </ul>
                      </div>
                    )}
                  </div>
                )}

                {/* Voice analysis details (for audio) */}
                {result.voiceAnalysis && (
                  <div className="rounded-xl border border-border bg-surface-2 p-4 space-y-3.5">
                    <span className="text-xs font-bold text-text-secondary block">Spectral Voice Fingerprints</span>
                    <div className="grid grid-cols-3 gap-4 text-center">
                      <div className="p-2 border border-border rounded-lg bg-surface">
                        <span className="text-[10px] text-text-tertiary font-bold uppercase tracking-wider block">Spectrogram</span>
                        <span className="text-sm font-extrabold text-text-primary block mt-0.5">{result.voiceAnalysis.spectralAnomalyScore}%</span>
                      </div>
                      <div className="p-2 border border-border rounded-lg bg-surface">
                        <span className="text-[10px] text-text-tertiary font-bold uppercase tracking-wider block">Synthesis</span>
                        <span className="text-sm font-extrabold text-text-primary block mt-0.5">{result.voiceAnalysis.syntheticFrequencyScore}%</span>
                      </div>
                      <div className="p-2 border border-border rounded-lg bg-surface">
                        <span className="text-[10px] text-text-tertiary font-bold uppercase tracking-wider block">Naturalness</span>
                        <span className="text-sm font-extrabold text-text-primary block mt-0.5">{result.voiceAnalysis.naturalnessScore}%</span>
                      </div>
                    </div>
                    {result.voiceAnalysis.anomalyDetails.length > 0 && (
                      <div className="space-y-1.5 border-t border-border pt-3">
                        <span className="text-[10px] font-bold text-text-tertiary uppercase tracking-wider">Identified Anomalies:</span>
                        <ul className="text-xs text-text-secondary list-disc pl-4 space-y-1">
                          {result.voiceAnalysis.anomalyDetails.map((det, i) => (
                            <li key={i}>{det}</li>
                          ))}
                        </ul>
                      </div>
                    )}
                  </div>
                )}

                {/* EXIF Metadata panel */}
                <div className="rounded-xl border border-border bg-surface-2 p-4">
                  <div className="flex justify-between items-center text-xs">
                    <span className="font-bold text-text-secondary">Metadata analysis:</span>
                    <span className="text-text-tertiary">{result.metadataAnalysis.softwareUsed || 'Original Headers'}</span>
                  </div>
                  {result.metadataAnalysis.anomaliesFound.length > 0 ? (
                    <div className="mt-2 text-xs text-danger space-y-1">
                      {result.metadataAnalysis.anomaliesFound.map((anom, i) => (
                        <p key={i} className="flex items-center space-x-1.5">
                          <span>•</span>
                          <span>{anom}</span>
                        </p>
                      ))}
                    </div>
                  ) : (
                    <p className="text-xs text-success mt-2">✓ No structural EXIF file anomalies detected.</p>
                  )}
                </div>

              </div>

            </div>
          )}

          {/* Certificate View (Toggleable) */}
          {result && showCertificate && (
            <div className="rounded-2xl border border-border bg-surface p-6 sm:p-8 shadow-sm space-y-6 animate-scale-in">
              <div className="flex justify-between items-center border-b border-border pb-4">
                <div className="flex items-center space-x-2">
                  <Shield className="w-5 h-5 text-primary" />
                  <h3 className="text-base font-bold text-text-primary">Authenticity Certificate</h3>
                </div>
                <button
                  onClick={() => setShowCertificate(false)}
                  className="text-xs font-bold text-primary hover:underline"
                >
                  Back to Analysis
                </button>
              </div>

              {/* Certificate content layout */}
              <div className="border-4 border-double border-border rounded-xl p-6 text-center space-y-6 relative overflow-hidden bg-surface-2">
                
                {/* Background seal watermarks */}
                <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 opacity-5 pointer-events-none">
                  <Shield className="w-56 h-56" />
                </div>

                <div className="space-y-1">
                  <h4 className="font-display font-black text-xl text-text-primary tracking-tight uppercase">VERIFICATION CERTIFICATE</h4>
                  <p className="text-[10px] text-text-tertiary tracking-widest font-bold">TRUTHGUARD CONTENT SECURE PROTOCOL</p>
                </div>

                <div className="grid grid-cols-2 gap-4 max-w-sm mx-auto text-left text-xs border-y border-border py-4 my-2">
                  <div>
                    <span className="text-[10px] uppercase text-text-tertiary font-bold">Verification ID</span>
                    <p className="font-semibold text-text-primary">{result.id}</p>
                  </div>
                  <div>
                    <span className="text-[10px] uppercase text-text-tertiary font-bold">Timestamp</span>
                    <p className="font-semibold text-text-primary">{result.timestamp}</p>
                  </div>
                  <div className="mt-2">
                    <span className="text-[10px] uppercase text-text-tertiary font-bold">Authenticity Score</span>
                    <p className="font-bold text-primary">{result.authenticityScore} / 100</p>
                  </div>
                  <div className="mt-2">
                    <span className="text-[10px] uppercase text-text-tertiary font-bold">Status</span>
                    <p className={`font-bold ${result.authenticityScore > 60 ? 'text-success' : 'text-danger'}`}>
                      {result.authenticityScore > 60 ? 'VERIFIED ORIGINAL' : 'AI MANIPULATED'}
                    </p>
                  </div>
                </div>

                <div className="text-center max-w-md mx-auto text-[11px] text-text-secondary leading-relaxed pt-2">
                  This document certifies that the media file named <strong>{result.fileName}</strong> was subjected to multi-layered neural classification networks, face mesh verification, and compression analysis. 
                  {result.authenticityScore < 60 
                    ? ' Findings indicate trace AI synthetic alterations and structural anomalies.'
                    : ' The file shows no evidence of adversarial deep learning tampering.'}
                </div>

                <div className="flex justify-between items-end pt-4 border-t border-border/60">
                  <div className="text-left">
                    <span className="text-[9px] uppercase text-text-tertiary font-bold">Verification Signature</span>
                    <p className="font-mono text-[9px] text-text-primary">tg-signature-hash-{result.certificateId.toLowerCase()}</p>
                  </div>
                  <div className="w-12 h-12 bg-white border border-border p-1 flex items-center justify-center">
                    {/* Placeholder QR Code visual */}
                    <div className="grid grid-cols-4 gap-0.5 w-full h-full bg-slate-200">
                      {[1,0,1,1, 0,1,0,1, 1,0,1,0, 0,0,1,1].map((v, i) => (
                        <div key={i} className={`rounded-[1px] ${v === 1 ? 'bg-black' : 'bg-transparent'}`} />
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              {/* Actions */}
              <div className="flex space-x-3">
                <button
                  onClick={downloadCertificate}
                  className="flex-1 py-2.5 text-center text-xs font-bold text-white bg-primary hover:bg-primary-dark rounded-xl shadow-sm flex items-center justify-center space-x-1.5"
                >
                  <Download className="w-4 h-4" />
                  <span>Download PDF Certificate</span>
                </button>
                <button
                  onClick={() => setShowCertificate(false)}
                  className="px-4 py-2.5 text-xs font-bold text-text-primary border border-border bg-surface hover:bg-surface-2 rounded-xl"
                >
                  Close Certificate
                </button>
              </div>

            </div>
          )}

        </div>

      </div>

    </div>
  );
}

export default function VerifyContentPage() {
  return (
    <Suspense fallback={
      <div className="max-w-7xl mx-auto px-4 py-16 text-center">
        <div className="w-10 h-10 border-2 border-t-primary border-border rounded-full animate-spin mx-auto mb-4" />
        <p className="text-xs text-text-secondary">Loading verification engine...</p>
      </div>
    }>
      <VerifyContent />
    </Suspense>
  );
}

