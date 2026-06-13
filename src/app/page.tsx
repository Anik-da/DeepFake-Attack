'use client';

import React from 'react';
import { Hero } from '../components/home/Hero';
import { Features } from '../components/home/Features';
import { DashboardPreview } from '../components/home/DashboardPreview';
import { SocialProof } from '../components/home/SocialProof';

export default function HomePage() {
  return (
    <>
      <Hero />
      <Features />
      <DashboardPreview />
      <SocialProof />
    </>
  );
}
