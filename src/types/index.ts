export interface User {
  id: string;
  name: string;
  email: string;
  avatar?: string;
  role: 'user' | 'admin' | 'moderator';
  createdAt: string;
}

export interface VerificationHistoryItem {
  id: string;
  type: 'image' | 'video' | 'audio' | 'text';
  fileName: string;
  fileSize?: string;
  timestamp: string;
  authenticityScore: number;
  status: 'completed' | 'processing' | 'failed';
  riskLevel: 'low' | 'medium' | 'high' | 'critical';
}

export interface DeepfakeAnalysisResult {
  id: string;
  type: 'image' | 'video' | 'audio';
  fileName: string;
  fileSize: string;
  timestamp: string;
  authenticityScore: number;
  manipulationProbability: number;
  riskLevel: 'low' | 'medium' | 'high' | 'critical';
  faceAnalysis?: {
    skinTextureScore: number;
    eyeBlinkingConsistency: number;
    mouthMovementSync: number;
    landmarksDetected: number;
    anomalyDetails: string[];
  };
  voiceAnalysis?: {
    spectralAnomalyScore: number;
    syntheticFrequencyScore: number;
    naturalnessScore: number;
    anomalyDetails: string[];
  };
  metadataAnalysis: {
    cameraModel?: string;
    softwareUsed?: string;
    creationDate?: string;
    compressionDetails?: string;
    exifDataModified: boolean;
    anomaliesFound: string[];
  };
  explanation: string;
  certificateId: string;
}

export interface FactCheckResult {
  id: string;
  claim: string;
  verdict: 'verified' | 'partially-verified' | 'false';
  confidenceScore: number;
  evidenceSummary: string;
  sources: {
    title: string;
    url: string;
    credibilityRating: number;
    publisher: string;
    publishDate: string;
  }[];
  timestamp: string;
  category: string;
}

export interface MisinformationTopic {
  id: string;
  title: string;
  category: 'politics' | 'health' | 'technology' | 'finance' | 'environment';
  description: string;
  trendScore: number; // 0-100
  riskIndicator: 'low' | 'medium' | 'high' | 'critical';
  viralityIndex: number; // 0-100
  region: string;
  debunkedBy: string;
  relatedChecksCount: number;
  trendData: { date: string; value: number }[];
}

export interface DashboardStats {
  totalVerified: number;
  deepfakesDetected: number;
  factChecksCompleted: number;
  communityReports: number;
  verificationAccuracy: number;
  historicalData: {
    date: string;
    verified: number;
    deepfakes: number;
    factChecks: number;
  }[];
  contentTypeBreakdown: {
    name: string;
    value: number;
    color: string;
  }[];
  categoryDistribution: {
    category: string;
    count: number;
  }[];
}

export interface CommunityReport {
  id: string;
  title: string;
  url?: string;
  type: 'image' | 'video' | 'audio' | 'claim';
  description: string;
  votesAuthentic: number;
  votesFake: number;
  status: 'pending' | 'verified' | 'debunked';
  reportedBy: string;
  timestamp: string;
}
