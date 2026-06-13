'use client';

import React from 'react';
import Link from 'next/link';
import { Shield, Mail } from 'lucide-react';

export const Footer = () => {
  return (
    <footer className="bg-surface-2 border-t border-border mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8">
          {/* Brand Info */}
          <div className="lg:col-span-2">
            <Link href="/" className="flex items-center mb-4">
              <img 
                src="/logo.png" 
                alt="TruthGuard AI" 
                className="h-8 w-auto object-contain dark:brightness-125 dark:drop-shadow-[0_0_8px_rgba(255,255,255,0.1)]" 
              />
            </Link>
            <p className="text-sm text-text-secondary max-w-sm mb-6 leading-relaxed">
              TruthGuard AI is a state-of-the-art verification platform dedicated to combating deepfakes, synthetic manipulation, and online disinformation.
            </p>
            <div className="flex space-x-4">
              {/* Twitter/X Icon */}
              <a href="#" aria-label="Twitter" className="w-9 h-9 rounded-lg border border-border flex items-center justify-center text-text-secondary hover:text-primary hover:bg-surface transition-all">
                <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                  <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                </svg>
              </a>
              {/* LinkedIn Icon */}
              <a href="#" aria-label="LinkedIn" className="w-9 h-9 rounded-lg border border-border flex items-center justify-center text-text-secondary hover:text-primary hover:bg-surface transition-all">
                <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                  <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
                </svg>
              </a>
              {/* GitHub Icon */}
              <a href="#" aria-label="GitHub" className="w-9 h-9 rounded-lg border border-border flex items-center justify-center text-text-secondary hover:text-primary hover:bg-surface transition-all">
                <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                  <path fillRule="evenodd" clipRule="evenodd" d="M12 2C6.477 2 2 6.477 2 12c0 4.42 2.865 8.17 6.839 9.49.5.092.682-.217.682-.482 0-.237-.008-.866-.013-1.7-2.782.603-3.369-1.34-3.369-1.34-.454-1.156-1.11-1.464-1.11-1.464-.908-.62.069-.608.069-.608 1.003.07 1.531 1.03 1.531 1.03.892 1.529 2.341 1.087 2.91.831.092-.646.35-1.086.636-1.336-2.22-.253-4.555-1.11-4.555-4.943 0-1.091.39-1.984 1.029-2.683-.103-.253-.446-1.27.098-2.647 0 0 .84-.269 2.75 1.025A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.294 2.747-1.025 2.747-1.025.546 1.377.203 2.394.1 2.647.64.699 1.028 1.592 1.028 2.683 0 3.842-2.339 4.687-4.566 4.935.359.309.678.919.678 1.852 0 1.336-.012 2.415-.012 2.743 0 .267.18.579.688.481C19.137 20.167 22 16.418 22 12c0-5.523-4.477-10-10-10z" />
                </svg>
              </a>
              {/* Mail Icon */}
              <a href="#" aria-label="Mail" className="w-9 h-9 rounded-lg border border-border flex items-center justify-center text-text-secondary hover:text-primary hover:bg-surface transition-all">
                <Mail className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Product Links */}
          <div>
            <h3 className="text-xs font-semibold uppercase tracking-wider text-text-primary mb-4">Product</h3>
            <ul className="space-y-2.5">
              <li>
                <Link href="/verify" className="text-sm text-text-secondary hover:text-primary transition-colors">
                  Verify Content
                </Link>
              </li>
              <li>
                <Link href="/fact-check" className="text-sm text-text-secondary hover:text-primary transition-colors">
                  Fact Check Center
                </Link>
              </li>
              <li>
                <Link href="/dashboard" className="text-sm text-text-secondary hover:text-primary transition-colors">
                  AI Trust Dashboard
                </Link>
              </li>
              <li>
                <Link href="/reports" className="text-sm text-text-secondary hover:text-primary transition-colors">
                  Misinformation Tracker
                </Link>
              </li>
            </ul>
          </div>

          {/* Resources Links */}
          <div>
            <h3 className="text-xs font-semibold uppercase tracking-wider text-text-primary mb-4">Resources</h3>
            <ul className="space-y-2.5">
              <li>
                <Link href="/education" className="text-sm text-text-secondary hover:text-primary transition-colors">
                  Education Hub
                </Link>
              </li>
              <li>
                <Link href="/about" className="text-sm text-text-secondary hover:text-primary transition-colors">
                  About Platform
                </Link>
              </li>
              <li>
                <a href="#" className="text-sm text-text-secondary hover:text-primary transition-colors">
                  API Documentation
                </a>
              </li>
              <li>
                <a href="#" className="text-sm text-text-secondary hover:text-primary transition-colors">
                  System Status
                </a>
              </li>
            </ul>
          </div>

          {/* Contact & Newsletter */}
          <div>
            <h3 className="text-xs font-semibold uppercase tracking-wider text-text-primary mb-4">Get Updates</h3>
            <p className="text-sm text-text-secondary mb-3 leading-snug">
              Subscribe to weekly threat analysis reports.
            </p>
            <form onSubmit={(e) => e.preventDefault()} className="flex flex-col space-y-2">
              <input
                type="email"
                placeholder="Enter email"
                className="px-3.5 py-2 text-sm rounded-lg border border-border bg-surface text-text-primary focus:outline-none focus:ring-2 focus:ring-primary/25 focus:border-primary w-full"
              />
              <button
                type="submit"
                className="w-full text-center py-2 text-sm font-semibold text-white bg-primary hover:bg-primary-dark transition-all rounded-lg shadow-sm"
              >
                Subscribe
              </button>
            </form>
          </div>
        </div>

        <div className="border-t border-border mt-10 pt-6 flex flex-col sm:flex-row justify-between items-center text-xs text-text-tertiary">
          <span>&copy; {new Date().getFullYear()} TruthGuard AI, Inc. All rights reserved.</span>
          <div className="flex space-x-4 mt-2 sm:mt-0">
            <a href="#" className="hover:text-text-secondary transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-text-secondary transition-colors">Terms of Service</a>
            <a href="#" className="hover:text-text-secondary transition-colors">Trust & Safety</a>
          </div>
        </div>
      </div>
    </footer>
  );
};
