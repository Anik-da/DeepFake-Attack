import { DeepfakeAnalysisResult, FactCheckResult, MisinformationTopic, DashboardStats, CommunityReport, VerificationHistoryItem } from '../types';

export const mockHistory: VerificationHistoryItem[] = [
  {
    id: 'TG-98210',
    type: 'image',
    fileName: 'political_rally_speech.jpg',
    fileSize: '2.4 MB',
    timestamp: '2026-06-12 14:32',
    authenticityScore: 12,
    status: 'completed',
    riskLevel: 'critical',
  },
  {
    id: 'TG-98209',
    type: 'video',
    fileName: 'ceo_announcement_final.mp4',
    fileSize: '48.1 MB',
    timestamp: '2026-06-11 09:15',
    authenticityScore: 94,
    status: 'completed',
    riskLevel: 'low',
  },
  {
    id: 'TG-98208',
    type: 'audio',
    fileName: 'voice_recording_leak.mp3',
    fileSize: '8.4 MB',
    timestamp: '2026-06-10 18:45',
    authenticityScore: 35,
    status: 'completed',
    riskLevel: 'high',
  },
  {
    id: 'TG-98207',
    type: 'image',
    fileName: 'climate_protest_crowd.png',
    fileSize: '1.8 MB',
    timestamp: '2026-06-09 11:20',
    authenticityScore: 88,
    status: 'completed',
    riskLevel: 'low',
  },
  {
    id: 'TG-98206',
    type: 'video',
    fileName: 'interview_clip_leak.mp4',
    fileSize: '12.3 MB',
    timestamp: '2026-06-08 16:05',
    authenticityScore: 52,
    status: 'completed',
    riskLevel: 'medium',
  }
];

export const mockDeepfakeAnalyses: { [key: string]: DeepfakeAnalysisResult } = {
  'political_rally_speech.jpg': {
    id: 'TG-98210',
    type: 'image',
    fileName: 'political_rally_speech.jpg',
    fileSize: '2.4 MB',
    timestamp: '2026-06-12 14:32',
    authenticityScore: 12,
    manipulationProbability: 88,
    riskLevel: 'critical',
    faceAnalysis: {
      skinTextureScore: 23,
      eyeBlinkingConsistency: 0, // Not applicable for image, but 0 indicates issues in video or static textures
      mouthMovementSync: 15,
      landmarksDetected: 68,
      anomalyDetails: [
        'Inconsistent lighting and shadow orientation on the nose and cheek regions.',
        'Double edge artifacts detected around the jawline, indicating splicing.',
        'Unnatural skin texture blending near the hairline.'
      ]
    },
    metadataAnalysis: {
      softwareUsed: 'Adobe Photoshop 2025 (Modified)',
      creationDate: '2026-06-11T20:30:15Z',
      exifDataModified: true,
      anomaliesFound: [
        'EXIF Software tags indicate image manipulation history.',
        'Camera sensor noise signature (PRNU) does not match throughout the image.'
      ]
    },
    explanation: 'The face in this image has been digitally replaced onto another body. Inconsistencies in facial lighting relative to the background light source, along with structural splicing boundaries around the jaw, confirm with 88% probability that this is a Face-Swap deepfake.',
    certificateId: 'TG-CERT-772910'
  },
  'ceo_announcement_final.mp4': {
    id: 'TG-98209',
    type: 'video',
    fileName: 'ceo_announcement_final.mp4',
    fileSize: '48.1 MB',
    timestamp: '2026-06-11 09:15',
    authenticityScore: 94,
    manipulationProbability: 6,
    riskLevel: 'low',
    faceAnalysis: {
      skinTextureScore: 92,
      eyeBlinkingConsistency: 96,
      mouthMovementSync: 94,
      landmarksDetected: 136,
      anomalyDetails: []
    },
    metadataAnalysis: {
      cameraModel: 'Sony ILCE-7M4',
      softwareUsed: 'DaVinci Resolve',
      creationDate: '2026-06-11T08:05:00Z',
      exifDataModified: false,
      anomaliesFound: []
    },
    explanation: 'No synthetic manipulation detected. Structural elements, audio-to-lip synchrony, blinking patterns, and compression structures conform fully with camera-original recordings. This content is verified as authentic.',
    certificateId: 'TG-CERT-772909'
  },
  'voice_recording_leak.mp3': {
    id: 'TG-98208',
    type: 'audio',
    fileName: 'voice_recording_leak.mp3',
    fileSize: '8.4 MB',
    timestamp: '2026-06-10 18:45',
    authenticityScore: 35,
    manipulationProbability: 65,
    riskLevel: 'high',
    voiceAnalysis: {
      spectralAnomalyScore: 72,
      syntheticFrequencyScore: 68,
      naturalnessScore: 32,
      anomalyDetails: [
        'Absence of natural micro-tremors and physiological breathing pauses.',
        'Synthetic spectral signature detected in the 3.5kHz frequency band.',
        'Inconsistent background ambient noise floor transitions.'
      ]
    },
    metadataAnalysis: {
      softwareUsed: 'Unknown / Web Tool',
      exifDataModified: true,
      anomaliesFound: ['Metadata stripped. No encoder or recorder details present.']
    },
    explanation: 'The audio exhibits characteristic signatures of Text-to-Speech (TTS) voice cloning. Robotic transitions, absence of organic breath patterns, and synthetic frequency spikes suggest this recording was generated using an advanced AI voice cloning model trained on target speaker voice samples.',
    certificateId: 'TG-CERT-772908'
  }
};

export const mockFactChecks: FactCheckResult[] = [
  {
    id: 'FC-101',
    claim: 'Government announces mandatory nationwide curfew starting next Monday due to new cyber security emergency.',
    verdict: 'false',
    confidenceScore: 98,
    evidenceSummary: 'The Ministry of Internal Affairs and cyber security agencies have released statements confirming that no such curfews are planned. The viral post originated from a satirical blog and was shared out of context. No official decrees have been published on the government gazette.',
    sources: [
      {
        title: 'Ministry of Security Official Clarification Statement',
        url: 'https://example.com/govt-debunk-curfew',
        credibilityRating: 95,
        publisher: 'Government Press Bureau',
        publishDate: '2026-06-12'
      },
      {
        title: 'Fact Check: Fake Curfew Warning Circulates Online',
        url: 'https://example.com/reuters-curfew-factcheck',
        credibilityRating: 92,
        publisher: 'Reuters Fact Check',
        publishDate: '2026-06-12'
      }
    ],
    timestamp: '2026-06-12 16:40',
    category: 'politics'
  },
  {
    id: 'FC-102',
    claim: 'Scientists discover new herbal extract that completely cures diabetes in 48 hours without side effects.',
    verdict: 'false',
    confidenceScore: 99,
    evidenceSummary: 'Clinical endocrinologists and the World Health Organization (WHO) state that there is no medical cure for diabetes that works in 48 hours. The study referenced in social media posts was done on isolated cells in vitro using highly toxic doses of an unrefined plant compound, and was never trialed on humans or approved by medical bodies.',
    sources: [
      {
        title: 'Endocrine Society Clinical Guidelines on Diabetes Management',
        url: 'https://example.com/diabetes-science-truth',
        credibilityRating: 98,
        publisher: 'Journal of Clinical Endocrinology',
        publishDate: '2026-05-20'
      },
      {
        title: 'WHO Statement on Internet Diabetes Miracle Cures',
        url: 'https://example.com/who-warning-cures',
        credibilityRating: 99,
        publisher: 'World Health Organization',
        publishDate: '2026-05-18'
      }
    ],
    timestamp: '2026-06-10 11:10',
    category: 'health'
  },
  {
    id: 'FC-103',
    claim: 'Major social media networks will begin charging users $9.99 per month starting July 1st unless you copy-paste this statement.',
    verdict: 'false',
    confidenceScore: 100,
    evidenceSummary: 'This is a recurring chain letter hoax dating back to 2012. Copypasting a statement does not grant legal exemption or change a platform service agreement. Meta, X, and ByteDance have confirmed that standard user accounts remain free, and no copy-paste waiver exists.',
    sources: [
      {
        title: 'Hoax Check: Copy-Paste Disclaimer is Legally Meaningless',
        url: 'https://example.com/hoax-disclaimer',
        credibilityRating: 94,
        publisher: 'Snopes',
        publishDate: '2026-06-08'
      }
    ],
    timestamp: '2026-06-08 09:30',
    category: 'technology'
  },
  {
    id: 'FC-104',
    claim: 'Central Bank plans to phase out physical cash completely by December 2026 to transition to a digital currency.',
    verdict: 'partially-verified',
    confidenceScore: 85,
    evidenceSummary: 'While the Central Bank is actively trialing a Central Bank Digital Currency (CBDC) for interbank settlements and wholesale payments, there is no official plan or legislative framework to phase out physical banknotes or cash by 2026. The cash supply will continue to coexist with digital tokens for the foreseeable future.',
    sources: [
      {
        title: 'Future of Money: Central Bank Digital Currency Pilot Program Report',
        url: 'https://example.com/cbdc-central-bank',
        credibilityRating: 99,
        publisher: 'Central Bank Press Office',
        publishDate: '2026-04-15'
      }
    ],
    timestamp: '2026-06-07 14:15',
    category: 'finance'
  }
];

export const mockTrackerTopics: MisinformationTopic[] = [
  {
    id: 'TOPIC-01',
    title: 'Synthetic Curfew Rumors',
    category: 'politics',
    description: 'Viral audio clips and posts falsely claiming a military-enforced nationwide curfew starting next week.',
    trendScore: 88,
    riskIndicator: 'critical',
    viralityIndex: 94,
    region: 'North America / EU',
    debunkedBy: 'Ministry of Security, Associated Press',
    relatedChecksCount: 14,
    trendData: [
      { date: 'June 07', value: 10 },
      { date: 'June 08', value: 25 },
      { date: 'June 09', value: 45 },
      { date: 'June 10', value: 65 },
      { date: 'June 11', value: 95 },
      { date: 'June 12', value: 88 }
    ]
  },
  {
    id: 'TOPIC-02',
    title: 'Miracle Diabetes Herbal Cure',
    category: 'health',
    description: 'Ads selling expensive root extracts claiming to eliminate type 2 diabetes overnight.',
    trendScore: 72,
    riskIndicator: 'high',
    viralityIndex: 78,
    region: 'Global',
    debunkedBy: 'WHO, Mayo Clinic',
    relatedChecksCount: 8,
    trendData: [
      { date: 'June 07', value: 40 },
      { date: 'June 08', value: 45 },
      { date: 'June 09', value: 50 },
      { date: 'June 10', value: 62 },
      { date: 'June 11', value: 75 },
      { date: 'June 12', value: 72 }
    ]
  },
  {
    id: 'TOPIC-03',
    title: 'AI CEO Video Deepfake',
    category: 'technology',
    description: 'Manipulated video of a major tech CEO announcing bankruptcy and sudden stock liquidation.',
    trendScore: 92,
    riskIndicator: 'critical',
    viralityIndex: 97,
    region: 'Global / Financial Markets',
    debunkedBy: 'TruthGuard AI, Bloomberg, SEC',
    relatedChecksCount: 3,
    trendData: [
      { date: 'June 07', value: 2 },
      { date: 'June 08', value: 12 },
      { date: 'June 09', value: 48 },
      { date: 'June 10', value: 85 },
      { date: 'June 11', value: 98 },
      { date: 'June 12', value: 92 }
    ]
  },
  {
    id: 'TOPIC-04',
    title: 'Central Bank Cash Ban Hoax',
    category: 'finance',
    description: 'False articles claiming physical money will become illegal currency by the end of this year.',
    trendScore: 61,
    riskIndicator: 'medium',
    viralityIndex: 65,
    region: 'EU / UK',
    debunkedBy: 'European Central Bank, Bank of England',
    relatedChecksCount: 6,
    trendData: [
      { date: 'June 07', value: 55 },
      { date: 'June 08', value: 58 },
      { date: 'June 09', value: 60 },
      { date: 'June 10', value: 62 },
      { date: 'June 11', value: 64 },
      { date: 'June 12', value: 61 }
    ]
  },
  {
    id: 'TOPIC-05',
    title: 'Geo-Engineering Climate Control Claims',
    category: 'environment',
    description: 'Conspiracy theories suggesting current heatwaves are fully engineered through satelite beams.',
    trendScore: 49,
    riskIndicator: 'medium',
    viralityIndex: 58,
    region: 'Global',
    debunkedBy: 'NASA, Climate Feedback',
    relatedChecksCount: 11,
    trendData: [
      { date: 'June 07', value: 30 },
      { date: 'June 08', value: 35 },
      { date: 'June 09', value: 41 },
      { date: 'June 10', value: 46 },
      { date: 'June 11', value: 52 },
      { date: 'June 12', value: 49 }
    ]
  }
];

export const mockDashboardStats: DashboardStats = {
  totalVerified: 1248920,
  deepfakesDetected: 348912,
  factChecksCompleted: 87102,
  communityReports: 12940,
  verificationAccuracy: 99.85,
  historicalData: [
    { date: 'Jan', verified: 85000, deepfakes: 21000, factChecks: 6200 },
    { date: 'Feb', verified: 92000, deepfakes: 24000, factChecks: 6800 },
    { date: 'Mar', verified: 110000, deepfakes: 31000, factChecks: 7500 },
    { date: 'Apr', verified: 118000, deepfakes: 32000, factChecks: 8100 },
    { date: 'May', verified: 135000, deepfakes: 41000, factChecks: 9000 },
    { date: 'Jun', verified: 154000, deepfakes: 48000, factChecks: 9800 }
  ],
  contentTypeBreakdown: [
    { name: 'Images', value: 45, color: '#3b82f6' },
    { name: 'Videos', value: 30, color: '#818cf8' },
    { name: 'Audio', value: 15, color: '#22d3ee' },
    { name: 'Text / Claims', value: 10, color: '#6366f1' }
  ],
  categoryDistribution: [
    { category: 'Politics', count: 420 },
    { category: 'Health', count: 280 },
    { category: 'Finance', count: 190 },
    { category: 'Technology', count: 150 },
    { category: 'Environment', count: 80 }
  ]
};

export const mockCommunityReports: CommunityReport[] = [
  {
    id: 'CR-501',
    title: 'Leaked recording of Prime Minister talking about electoral manipulation',
    type: 'audio',
    description: 'This high-profile clip surfaced on social media this morning. The voice sounds like the PM but the phrasing is highly unusual.',
    votesAuthentic: 18,
    votesFake: 214,
    status: 'debunked',
    reportedBy: 'journalism_hub',
    timestamp: '2 hours ago'
  },
  {
    id: 'CR-502',
    title: 'Image of a major city engulfed in sudden digital neon storm',
    type: 'image',
    description: 'Shared widely on Reddit. Users claiming this is a real photograph of an extreme weather phenomenon in East Asia.',
    votesAuthentic: 140,
    votesFake: 35,
    status: 'pending',
    reportedBy: 'curious_mind_88',
    timestamp: '4 hours ago'
  },
  {
    id: 'CR-503',
    title: 'Video of a robotic delivery drone saving a child from traffic',
    type: 'video',
    description: 'Looks incredibly realistic but the physics of the child falling and the drone motion feel slightly pre-computed.',
    votesAuthentic: 95,
    votesFake: 120,
    status: 'pending',
    reportedBy: 'factchecker_pro',
    timestamp: '6 hours ago'
  }
];

export const viralAlerts = [
  {
    id: 'VA-001',
    title: 'Election Speech Deepfake Video',
    description: 'A synthetic video of a political candidate making inflammatory statements is rapidly spreading across social media platforms.',
    severity: 'critical' as const,
    platform: 'Twitter/X',
    shares: '2.4M',
    detectedAt: '2 hours ago',
    mediaType: 'video',
    trustScore: 14,
  },
  {
    id: 'VA-002',
    title: 'Celebrity Crypto Endorsement Clip',
    description: 'AI-generated video of a major celebrity endorsing a cryptocurrency scheme. Voice analysis indicates cloning.',
    severity: 'high' as const,
    platform: 'YouTube',
    shares: '890K',
    detectedAt: '5 hours ago',
    mediaType: 'video',
    trustScore: 22,
  },
  {
    id: 'VA-003',
    title: 'Fake Emergency Broadcast Audio',
    description: 'Synthetic audio mimicking an official emergency broadcast system warning of a fabricated natural disaster.',
    severity: 'critical' as const,
    platform: 'WhatsApp',
    shares: '1.1M',
    detectedAt: '8 hours ago',
    mediaType: 'audio',
    trustScore: 8,
  },
  {
    id: 'VA-004',
    title: 'Manipulated Satellite Imagery',
    description: 'Altered satellite photos claiming to show military movements near a disputed border region.',
    severity: 'high' as const,
    platform: 'Telegram',
    shares: '340K',
    detectedAt: '12 hours ago',
    mediaType: 'image',
    trustScore: 29,
  },
  {
    id: 'VA-005',
    title: 'Cloned CEO Voice Phishing Call',
    description: 'AI-cloned voice of a Fortune 500 CEO used in a sophisticated social engineering attack targeting employees.',
    severity: 'medium' as const,
    platform: 'Phone/VoIP',
    shares: 'N/A',
    detectedAt: '1 day ago',
    mediaType: 'audio',
    trustScore: 18,
  },
];

export const modelMetrics = {
  faceSwap: { probability: 92, label: 'Face Swap Detection', description: 'Analyzes facial geometry, skin texture consistency, and boundary artifacts around face regions.' },
  voiceClone: { probability: 88, label: 'Voice Clone Detection', description: 'Evaluates spectral patterns, pitch consistency, and voice print matching against known signatures.' },
  frameConsistency: { probability: 34, label: 'Frame Consistency', description: 'Measures temporal coherence between consecutive frames, detecting generation artifacts and blending anomalies.' },
  metadataIntegrity: { probability: 21, label: 'Metadata Integrity', description: 'Validates EXIF data, codec information, and file headers against expected patterns for genuine media.' },
  lipSync: { probability: 85, label: 'Lip-Sync Analysis', description: 'Correlates mouth movements with audio phonemes using temporal alignment scoring.' },
  eyeBlink: { probability: 67, label: 'Eye Blink Pattern', description: 'Detects unnatural blink rates and patterns that deviate from physiological norms.' },
};

