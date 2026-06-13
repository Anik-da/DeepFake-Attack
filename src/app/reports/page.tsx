'use client';

import React, { useState, useEffect } from 'react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { BarChart3, Users, Flame, AlertTriangle, ShieldCheck, ThumbsUp, ThumbsDown, MessageSquare, PlusCircle, CheckCircle, Info } from 'lucide-react';
import { mockTrackerTopics, mockCommunityReports } from '../../lib/mockData';
import { MisinformationTopic, CommunityReport } from '../../types';
import { db } from '../../lib/firebase';
import { 
  collection, 
  addDoc, 
  onSnapshot, 
  updateDoc, 
  doc, 
  increment, 
  query, 
  orderBy, 
  setDoc 
} from 'firebase/firestore';

export default function ReportsTrackerPage() {
  const [topics, setTopics] = useState<MisinformationTopic[]>(mockTrackerTopics);
  const [communityReports, setCommunityReports] = useState<CommunityReport[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<'all' | 'politics' | 'health' | 'technology' | 'finance' | 'environment'>('all');
  
  // Submit new report states
  const [showSubmitModal, setShowSubmitModal] = useState(false);
  const [newTitle, setNewTitle] = useState('');
  const [newType, setNewType] = useState<'image' | 'video' | 'audio' | 'claim'>('claim');
  const [newDesc, setNewDesc] = useState('');

  // Real-time Firestore sync
  useEffect(() => {
    const q = query(collection(db, 'communityReports'), orderBy('timestamp', 'desc'));
    const unsubscribe = onSnapshot(q, async (querySnapshot) => {
      const reports: CommunityReport[] = [];
      querySnapshot.forEach((doc) => {
        reports.push({ id: doc.id, ...doc.data() } as CommunityReport);
      });

      if (querySnapshot.empty) {
        // Seed default reports if database collection is empty
        for (const report of mockCommunityReports) {
          await setDoc(doc(db, 'communityReports', report.id), report);
        }
      } else {
        setCommunityReports(reports);
      }
    });

    return () => unsubscribe();
  }, []);
  
  // Handle voting via Firestore increment
  const handleVote = async (id: string, type: 'authentic' | 'fake') => {
    try {
      const docRef = doc(db, 'communityReports', id);
      if (type === 'authentic') {
        await updateDoc(docRef, { votesAuthentic: increment(1) });
      } else {
        await updateDoc(docRef, { votesFake: increment(1) });
      }
    } catch (error) {
      console.error('Error voting in Firestore:', error);
    }
  };

  // Handle submit report to Firestore
  const handleNewReportSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTitle.trim()) return;

    const added = {
      title: newTitle,
      type: newType,
      description: newDesc,
      votesAuthentic: 0,
      votesFake: 0,
      status: 'pending',
      reportedBy: 'anonymous_user',
      timestamp: new Date().toISOString().replace('T', ' ').substring(0, 16)
    };

    try {
      await addDoc(collection(db, 'communityReports'), added);
      setShowSubmitModal(false);
      setNewTitle('');
      setNewDesc('');
    } catch (error) {
      console.error('Error submitting report to Firestore:', error);
    }
  };

  const getRiskColor = (level: string) => {
    switch (level) {
      case 'low': return 'text-success bg-success/10 border-success/20';
      case 'medium': return 'text-warning bg-warning/10 border-warning/20';
      case 'high': return 'text-danger bg-danger/10 border-danger/20';
      case 'critical': return 'text-danger bg-danger/15 border-danger/35';
      default: return 'text-text-secondary bg-surface-2 border-border';
    }
  };

  const filteredTopics = selectedCategory === 'all'
    ? topics
    : topics.filter(t => t.category === selectedCategory);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-10 gap-4">
        <div>
          <h1 className="font-display font-black text-3xl text-text-primary tracking-tight">Misinformation Tracker</h1>
          <p className="text-xs sm:text-sm text-text-secondary mt-1">
            Stay updated with viral online rumors, deepfakes, and public verification campaigns across multiple categories.
          </p>
        </div>
        <button
          onClick={() => setShowSubmitModal(true)}
          className="px-4 py-2.5 text-xs font-bold text-white bg-primary hover:bg-primary-dark rounded-xl shadow-sm flex items-center space-x-1.5 transition-all"
        >
          <PlusCircle className="w-4 h-4" />
          <span>Report Suspicious Content</span>
        </button>
      </div>

      {/* Category selector */}
      <div className="flex border-b border-border pb-3 mb-8 space-x-2 overflow-x-auto">
        {(['all', 'politics', 'health', 'technology', 'finance', 'environment'] as const).map((cat) => (
          <button
            key={cat}
            onClick={() => setSelectedCategory(cat)}
            className={`text-xs font-bold uppercase tracking-wider px-3.5 py-1.5 rounded-lg transition-colors whitespace-nowrap ${
              selectedCategory === cat 
                ? 'text-primary bg-primary-50 dark:bg-primary-100/10' 
                : 'text-text-secondary hover:text-text-primary hover:bg-surface-2'
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* Left Side: Topic trend list */}
        <div className="lg:col-span-7 space-y-6">
          <h3 className="text-sm font-bold text-text-primary uppercase tracking-wider mb-4 flex items-center space-x-2">
            <Flame className="w-4.5 h-4.5 text-danger animate-pulse" />
            <span>Active Misinformation Campaigns</span>
          </h3>

          <div className="space-y-4">
            {filteredTopics.map((topic) => (
              <div key={topic.id} className="rounded-2xl border border-border bg-surface p-5 sm:p-6 shadow-sm space-y-4">
                
                {/* Header info */}
                <div className="flex justify-between items-start gap-4">
                  <div className="space-y-1">
                    <div className="flex items-center space-x-2">
                      <span className="text-[10px] font-bold text-text-tertiary uppercase font-mono">{topic.id} • {topic.category}</span>
                      <span className={`text-[8px] font-bold px-1.5 py-0.5 rounded border uppercase ${getRiskColor(topic.riskIndicator)}`}>
                        {topic.riskIndicator} Risk
                      </span>
                    </div>
                    <h4 className="text-base font-bold text-text-primary leading-snug">{topic.title}</h4>
                  </div>
                  <div className="text-right">
                    <span className="text-[9px] uppercase text-text-tertiary font-bold block">Virality Index</span>
                    <span className="text-lg font-extrabold text-danger font-mono block mt-0.5">{topic.viralityIndex}/100</span>
                  </div>
                </div>

                {/* Description */}
                <p className="text-xs text-text-secondary leading-relaxed">{topic.description}</p>

                {/* Graph Trend */}
                <div className="pt-2">
                  <span className="text-[9px] uppercase font-bold text-text-tertiary tracking-wider block mb-2">Trend Velocity (Last 6 Days)</span>
                  <div className="h-24 w-full">
                    <ResponsiveContainer width="100%" height="100%">
                      <AreaChart data={topic.trendData}>
                        <defs>
                          <linearGradient id={`grad-${topic.id}`} x1="0" y1="0" x2="0" y2="1">
                            <stop offset="5%" stopColor="#ef4444" stopOpacity={0.15}/>
                            <stop offset="95%" stopColor="#ef4444" stopOpacity={0}/>
                          </linearGradient>
                        </defs>
                        <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="var(--border)" />
                        <XAxis dataKey="date" stroke="var(--text-tertiary)" fontSize={9} tickLine={false} />
                        <YAxis stroke="var(--text-tertiary)" fontSize={9} tickLine={false} axisLine={false} width={15} />
                        <Tooltip />
                        <Area type="monotone" dataKey="value" stroke="#ef4444" fillOpacity={1} fill={`url(#grad-${topic.id})`} strokeWidth={1.5} />
                      </AreaChart>
                    </ResponsiveContainer>
                  </div>
                </div>

                {/* Meta details footer */}
                <div className="border-t border-border/60 pt-3 flex flex-wrap justify-between items-center text-[10px] text-text-tertiary gap-2">
                  <span>Target Region: <strong>{topic.region}</strong></span>
                  <span>Debunked by: <strong className="text-primary">{topic.debunkedBy}</strong></span>
                  <span className="bg-surface-2 px-2 py-0.5 rounded border border-border">
                    {topic.relatedChecksCount} Related Fact Checks
                  </span>
                </div>

              </div>
            ))}

            {filteredTopics.length === 0 && (
              <div className="rounded-2xl border border-border bg-surface-2 p-10 text-center">
                <Info className="w-10 h-10 text-text-tertiary mx-auto mb-4" />
                <h3 className="text-sm font-bold text-text-primary">No Active Campaigns</h3>
                <p className="text-xs text-text-secondary mt-2">
                  There are no verified misinformation reports under the selected filter.
                </p>
              </div>
            )}
          </div>
        </div>

        {/* Right Side: Community Crowdsourcing */}
        <div className="lg:col-span-5 space-y-6">
          
          <div className="rounded-2xl border border-border bg-surface p-5 sm:p-6 shadow-sm">
            <h3 className="text-sm font-bold text-text-primary uppercase tracking-wider mb-4 flex items-center space-x-2">
              <Users className="w-4.5 h-4.5 text-primary" />
              <span>Community Verification Queue</span>
            </h3>

            <p className="text-xs text-text-secondary mb-5 leading-relaxed">
              Help catalog digital trust. Review submitted claims, links, or clips and vote authentic or fake.
            </p>

            <div className="space-y-4">
              {communityReports.map((report) => {
                const totalVotes = report.votesAuthentic + report.votesFake;
                const authenticPercentage = totalVotes > 0 ? Math.round((report.votesAuthentic / totalVotes) * 100) : 0;
                
                return (
                  <div key={report.id} className="p-4 rounded-xl border border-border bg-surface-2 space-y-3">
                    
                    {/* Title */}
                    <div className="flex justify-between items-start gap-3">
                      <div>
                        <span className="text-[9px] font-mono font-bold text-text-tertiary">{report.id} • Reported by @{report.reportedBy}</span>
                        <h5 className="text-xs font-bold text-text-primary mt-0.5 leading-snug">{report.title}</h5>
                      </div>
                      <span className={`text-[8px] font-bold px-1.5 py-0.5 rounded border uppercase whitespace-nowrap ${
                        report.status === 'verified' 
                          ? 'text-success bg-success/10 border-success/20' 
                          : report.status === 'debunked' 
                            ? 'text-danger bg-danger/10 border-danger/20'
                            : 'text-warning bg-warning/10 border-warning/20'
                      }`}>
                        {report.status}
                      </span>
                    </div>

                    <p className="text-[11px] text-text-secondary leading-snug">{report.description}</p>

                    {/* Votes meter */}
                    {totalVotes > 0 && (
                      <div className="space-y-1">
                        <div className="flex justify-between text-[9px] font-bold text-text-tertiary">
                          <span>Authentic ({report.votesAuthentic})</span>
                          <span>Fake ({report.votesFake})</span>
                        </div>
                        <div className="w-full bg-border rounded-full h-1.5 overflow-hidden flex">
                          <div className="h-full bg-success" style={{ width: `${authenticPercentage}%` }} />
                          <div className="h-full bg-danger" style={{ width: `${100 - authenticPercentage}%` }} />
                        </div>
                      </div>
                    )}

                    {/* Actions */}
                    <div className="flex space-x-2 pt-1 border-t border-border/40">
                      <button
                        onClick={() => handleVote(report.id, 'authentic')}
                        className="flex-1 py-1 px-2.5 rounded-lg border border-border bg-surface hover:bg-success/5 hover:border-success/30 transition-colors text-[10px] font-bold text-text-secondary hover:text-success flex items-center justify-center space-x-1.5"
                      >
                        <ThumbsUp className="w-3.5 h-3.5" />
                        <span>Authentic</span>
                      </button>
                      <button
                        onClick={() => handleVote(report.id, 'fake')}
                        className="flex-1 py-1 px-2.5 rounded-lg border border-border bg-surface hover:bg-danger/5 hover:border-danger/30 transition-colors text-[10px] font-bold text-text-secondary hover:text-danger flex items-center justify-center space-x-1.5"
                      >
                        <ThumbsDown className="w-3.5 h-3.5" />
                        <span>Manipulated</span>
                      </button>
                    </div>

                  </div>
                );
              })}
            </div>
          </div>

        </div>

      </div>

      {/* Submit Suspicious Modal Overlay */}
      {showSubmitModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={() => setShowSubmitModal(false)} />
          <div className="relative rounded-2xl border border-border bg-surface p-6 sm:p-7 shadow-xl max-w-lg w-full z-10 animate-scale-in">
            <h3 className="font-display font-bold text-lg text-text-primary mb-1">Report Suspicious Content</h3>
            <p className="text-xs text-text-secondary mb-4 leading-relaxed">
              Add a viral article, audio transcript, or link that you suspect contains deepfake manipulation or false statements.
            </p>

            <form onSubmit={handleNewReportSubmit} className="space-y-4">
              <div>
                <label className="text-[10px] uppercase font-bold text-text-secondary block mb-1">Claim Title / Headline</label>
                <input
                  type="text"
                  required
                  value={newTitle}
                  onChange={(e) => setNewTitle(e.target.value)}
                  placeholder="e.g. Video of robotic delivery drone saving child..."
                  className="w-full px-3.5 py-2.5 text-xs rounded-lg border border-border bg-surface text-text-primary focus:outline-none focus:ring-2 focus:ring-primary/20"
                />
              </div>

              <div>
                <label className="text-[10px] uppercase font-bold text-text-secondary block mb-1">Content Type</label>
                <select
                  value={newType}
                  onChange={(e) => setNewType(e.target.value as any)}
                  className="w-full px-3.5 py-2.5 text-xs rounded-lg border border-border bg-surface text-text-primary focus:outline-none focus:ring-2 focus:ring-primary/20"
                >
                  <option value="claim">Text Claim / Headline</option>
                  <option value="image">Image Attachment</option>
                  <option value="video">Video Clip</option>
                  <option value="audio">Audio Voice Recording</option>
                </select>
              </div>

              <div>
                <label className="text-[10px] uppercase font-bold text-text-secondary block mb-1">Detailed Description</label>
                <textarea
                  value={newDesc}
                  onChange={(e) => setNewDesc(e.target.value)}
                  rows={3}
                  placeholder="Provide context, links, or specific lines that seem simulated..."
                  className="w-full px-3.5 py-2.5 text-xs rounded-lg border border-border bg-surface text-text-primary focus:outline-none focus:ring-2 focus:ring-primary/20"
                />
              </div>

              <div className="flex space-x-3 pt-2">
                <button
                  type="submit"
                  className="flex-1 py-2.5 text-center text-xs font-bold text-white bg-primary hover:bg-primary-dark rounded-xl shadow-sm transition-all"
                >
                  Submit Incident
                </button>
                <button
                  type="button"
                  onClick={() => setShowSubmitModal(false)}
                  className="px-4 py-2.5 text-xs font-bold text-text-secondary border border-border hover:bg-surface-2 rounded-xl"
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
}
