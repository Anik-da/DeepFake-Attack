'use client';

import React, { useState } from 'react';
import { BookOpen, ShieldCheck, Zap, BrainCircuit, Eye, Lock, ArrowRight, CheckCircle2 } from 'lucide-react';

export default function EducationHubPage() {
  const [activeArticle, setActiveArticle] = useState<string | null>('what-is');

  const articles = [
    {
      id: 'what-is',
      title: 'What is a Deepfake?',
      subtitle: 'Understanding synthetic media and digital counterfeits',
      icon: <BrainCircuit className="w-5 h-5 text-primary" />,
      content: (
        <div className="space-y-4 text-xs sm:text-sm text-text-secondary leading-relaxed">
          <p>
            A <strong>deepfake</strong> is a synthetic media format in which a person in an existing image, video, or audio recording is replaced or modified with someone else's likeness or voice, leveraging advanced artificial intelligence.
          </p>
          <p>
            While media manipulation isn't new, deepfakes are distinguished by the use of deep neural networks—specifically Generative Adversarial Networks (GANs) and diffusion models—which automate the creation process to produce photorealistic results that can easily deceive human observers.
          </p>
          <div className="p-4 bg-surface-2 rounded-xl border border-border">
            <h5 className="font-bold text-text-primary mb-2 flex items-center space-x-1.5">
              <Zap className="w-4 h-4 text-warning" />
              <span>Key Terms to Know:</span>
            </h5>
            <ul className="list-disc pl-4 space-y-1">
              <li><strong>Face-Swap:</strong> Overlaying a target face onto a source body in photos or video recordings.</li>
              <li><strong>Lip-Sync:</strong> Adjusting lip and mouth movements of a speaker to match a completely different, synthesized audio track.</li>
              <li><strong>Voice Cloning:</strong> Generating a custom Text-to-Speech (TTS) voice profile utilizing a target speaker's vocal training samples.</li>
            </ul>
          </div>
        </div>
      )
    },
    {
      id: 'how-works',
      title: 'How Deepfakes Work',
      subtitle: 'The machine learning technology behind the curtains',
      icon: <BookOpen className="w-5 h-5 text-primary" />,
      content: (
        <div className="space-y-4 text-xs sm:text-sm text-text-secondary leading-relaxed">
          <p>
            Modern deepfakes are created using a machine learning architecture known as a <strong>Generative Adversarial Network (GAN)</strong>.
          </p>
          <p>
            A GAN consists of two distinct neural networks that work against each other:
          </p>
          <ol className="list-decimal pl-4 space-y-2">
            <li>
              <strong>The Generator:</strong> This network takes training samples (e.g., thousands of photos of a politician) and attempts to construct synthetic images that resemble the target.
            </li>
            <li>
              <strong>The Discriminator:</strong> This network evaluates the generator's synthetic outputs against authentic source photos and tries to identify flaws or telltale signs of artificiality.
            </li>
          </ol>
          <p>
            Through hundreds of thousands of cycles, both networks improve simultaneously. The generator learns to produce images so realistic that the discriminator can no longer tell the difference.
          </p>
        </div>
      )
    },
    {
      id: 'how-identify',
      title: 'How to Identify Fake Content',
      subtitle: 'Manual checklist and visual cues to look for',
      icon: <Eye className="w-5 h-5 text-primary" />,
      content: (
        <div className="space-y-4 text-xs sm:text-sm text-text-secondary leading-relaxed">
          <p>
            Although deep learning algorithms continue to advance rapidly, many current deepfakes still exhibit subtle physical and environmental inconsistencies:
          </p>
          <div className="space-y-3.5">
            <div className="flex items-start space-x-2.5">
              <CheckCircle2 className="w-4.5 h-4.5 text-primary flex-shrink-0 mt-0.5" />
              <div>
                <strong className="text-text-primary">Inconsistent Blinking:</strong> Many video deepfakes show abnormal blinking patterns—either blinking too rarely, too quickly, or failing to close eyes fully.
              </div>
            </div>
            <div className="flex items-start space-x-2.5">
              <CheckCircle2 className="w-4.5 h-4.5 text-primary flex-shrink-0 mt-0.5" />
              <div>
                <strong className="text-text-primary">Double-Edge Borders:</strong> Inspect the edges of cheeks, jawlines, and hairlines. Spliced face swaps often exhibit blurry outlines or sudden pixel density changes.
              </div>
            </div>
            <div className="flex items-start space-x-2.5">
              <CheckCircle2 className="w-4.5 h-4.5 text-primary flex-shrink-0 mt-0.5" />
              <div>
                <strong className="text-text-primary">Shadow & Reflection Mismatches:</strong> Analyze the eyes. Real eyes reflect light realistically; deepfakes often show flat reflections or lights originating from contradictory directions relative to the background.
              </div>
            </div>
            <div className="flex items-start space-x-2.5">
              <CheckCircle2 className="w-4.5 h-4.5 text-primary flex-shrink-0 mt-0.5" />
              <div>
                <strong className="text-text-primary">Voice Incoherence:</strong> Listen for robotic consonants, absence of breathing sounds, flat pitch intonation, and minor click/pop static patterns near sentence boundaries.
              </div>
            </div>
          </div>
        </div>
      )
    },
    {
      id: 'safety-guide',
      title: 'Online Safety Guide',
      subtitle: 'Best practices for navigating the digital landscape',
      icon: <Lock className="w-5 h-5 text-primary" />,
      content: (
        <div className="space-y-4 text-xs sm:text-sm text-text-secondary leading-relaxed">
          <p>
            Misinformation campaigns aim to trigger emotional responses. Use the following baseline workflow before sharing content:
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 my-2">
            <div className="p-3.5 border border-border rounded-xl bg-surface-2">
              <h6 className="font-bold text-xs text-text-primary mb-1">1. Trace the Origin</h6>
              <p className="text-[11px] text-text-secondary">Perform a reverse image search to find the original high-resolution upload of the image or video clip.</p>
            </div>
            <div className="p-3.5 border border-border rounded-xl bg-surface-2">
              <h6 className="font-bold text-xs text-text-primary mb-1">2. Look for Lateral Coverage</h6>
              <p className="text-[11px] text-text-secondary">Check if other reputable, independent news agencies are reporting the same story or if they have flagged it as satirical.</p>
            </div>
            <div className="p-3.5 border border-border rounded-xl bg-surface-2">
              <h6 className="font-bold text-xs text-text-primary mb-1">3. Evaluate the URL Domain</h6>
              <p className="text-[11px] text-text-secondary">Be wary of websites with slightly altered URLs mimicking official brands (e.g., "bbc-news-online.co" instead of "bbc.com").</p>
            </div>
            <div className="p-3.5 border border-border rounded-xl bg-surface-2">
              <h6 className="font-bold text-xs text-text-primary mb-1">4. Use Analysis Tools</h6>
              <p className="text-[11px] text-text-secondary">Run suspicious media files through TruthGuard's Verify Content or Fact Check engines before re-posting.</p>
            </div>
          </div>
        </div>
      )
    }
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      
      {/* Page Header */}
      <div className="text-center max-w-3xl mx-auto mb-12">
        <h1 className="font-display font-black text-3xl sm:text-4xl text-text-primary tracking-tight">
          Education & Resource Hub
        </h1>
        <p className="text-sm sm:text-base text-text-secondary mt-3">
          Equip yourself with the knowledge to recognize synthetic media, trace source origins, and navigate the internet safely.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* Left Side: Article list selector */}
        <div className="lg:col-span-4 space-y-3">
          {articles.map((art) => (
            <button
              key={art.id}
              onClick={() => setActiveArticle(art.id)}
              className={`w-full text-left p-4.5 rounded-xl border transition-all flex items-start space-x-3.5 ${
                activeArticle === art.id 
                  ? 'border-primary bg-primary-50/20 dark:bg-primary-100/5' 
                  : 'border-border bg-surface hover:bg-surface-2'
              }`}
            >
              <div className="mt-0.5">{art.icon}</div>
              <div>
                <h4 className="text-xs sm:text-sm font-bold text-text-primary">{art.title}</h4>
                <p className="text-[10px] sm:text-xs text-text-secondary mt-0.5 leading-snug">{art.subtitle}</p>
              </div>
            </button>
          ))}
        </div>

        {/* Right Side: Active Article view */}
        <div className="lg:col-span-8">
          {activeArticle && (
            <div className="rounded-2xl border border-border bg-surface p-6 sm:p-8 shadow-sm space-y-6 animate-scale-in">
              {(() => {
                const art = articles.find(a => a.id === activeArticle);
                if (!art) return null;
                return (
                  <>
                    <div className="border-b border-border pb-4">
                      <span className="text-[10px] uppercase font-bold text-primary font-mono">EDUCATIONAL ARTICLE</span>
                      <h2 className="font-display font-extrabold text-2xl text-text-primary mt-1">{art.title}</h2>
                      <p className="text-xs text-text-secondary mt-1">{art.subtitle}</p>
                    </div>
                    <div>{art.content}</div>
                  </>
                );
              })()}
            </div>
          )}
        </div>

      </div>

    </div>
  );
}
