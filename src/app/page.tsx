"use client";

import React, { useState } from 'react';
import { UploadZone } from '@/components/UploadZone';
import { XRayViewer } from '@/components/XRayViewer';
import { AdversarialEngine } from '@/components/AdversarialEngine';
import { ActionModule } from '@/components/ActionModule';
import { ActionAgentModal } from '@/components/ActionAgentModal';
import { useGeminiAudit } from '@/hooks/useGeminiAudit';
import { motion, AnimatePresence } from 'framer-motion';
import { Scale, ShieldCheck, Sword, ZapOff } from 'lucide-react';

export default function Home() {
  const { isScanning, results, performAudit } = useGeminiAudit();
  const [selectedIssueId, setSelectedIssueId] = useState<string | undefined>();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentFile, setCurrentFile] = useState<File | null>(null);

  const handleUpload = (file: File) => {
    setCurrentFile(file);
    performAudit(file);
  };

  const draftContent = React.useMemo(() => {
    if (!results) return "";
    return `
[THEMIS ADVERSARIAL DISPUTE]
Date: ${new Date().toLocaleDateString()}
Case ID: THM-${Math.random().toString(36).substr(2, 9).toUpperCase()}
Win Probability: ${results.winProbability}%

To Whom It May Concern,

This document serves as a formal dispute backed by the THEMIS Adversarial Legal Engine. 

Our analysis of the provided documentation for ${results.docType} purposes has revealed ${results.issues.length} critical legal discrepancies that violate state and federal regulations.

Key Adversarial Counters:
${results.simulations.map(s => `- ${s.title}: ${s.themisCounter}`).join('\n')}

We demand an immediate adjustment of the billable amounts. Failure to comply will result in further legal invocation of the cited codes.

Regards,
THEMIS Legal Defense
    `;
  }, [results]);

  return (
    <main className="h-screen bg-[#030712] text-slate-200 overflow-hidden flex flex-col font-sans">
      {/* Navigation / Header */}
      <header className="h-20 border-b border-white/5 glass px-12 flex items-center justify-between z-40">
        <div className="flex items-center space-x-4">
          <div className="w-11 h-11 bg-primary rounded-xl flex items-center justify-center shadow-[0_0_20px_rgba(59,130,246,0.5)]">
            <Scale className="w-6 h-6 text-white" />
          </div>
          <div>
            <h1 className="text-2xl font-black tracking-tight text-white leading-none">THEMIS</h1>
            <p className="text-[10px] text-primary uppercase tracking-[0.3em] font-black mt-1">Adversarial Legal Assistant</p>
          </div>
        </div>

        <div className="flex items-center space-x-8">
          <div className="flex flex-col items-end">
            <span className="text-[10px] text-muted-foreground uppercase font-bold tracking-widest leading-none">Status</span>
            <div className="flex items-center space-x-2 mt-1">
              <div className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse" />
              <span className="text-xs font-bold text-white uppercase tracking-tighter">AI Public Defender Active</span>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content Area */}
      <div className="flex-1 flex overflow-hidden p-8 gap-8">
        {/* Left Section: Document Viewer (The Evidence) */}
        <section className="flex-[3] flex flex-col min-w-0">
          <AnimatePresence mode="wait">
            {!results && !isScanning ? (
              <motion.div
                key="welcome"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95 }}
                className="flex-1 flex flex-col items-center justify-center"
              >
                <div className="text-center space-y-4 mb-12">
                  <h2 className="text-6xl font-black tracking-tighter text-white">
                    The AI Public Defender.
                  </h2>
                  <p className="text-slate-400 text-xl max-w-xl mx-auto leading-normal font-medium">
                    Audit Bills, Fight Contracts, Protect Your Rights.
                  </p>
                </div>
                <UploadZone onUpload={handleUpload} isScanning={isScanning} />
              </motion.div>
            ) : (
              <motion.div
                key="viewer"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="flex-1 flex flex-col relative"
              >
                <XRayViewer
                  file={currentFile}
                  issues={results?.issues || []}
                  isScanning={isScanning}
                  selectedIssueId={selectedIssueId}
                  onIssueClick={(id) => setSelectedIssueId(id)}
                />
              </motion.div>
            )}
          </AnimatePresence>
        </section>

        {/* Right Section: Adversarial Engine */}
        <aside className="flex-[1.5] flex flex-col min-w-[450px] space-y-6">
          <div className="flex-1 overflow-hidden">
            <AdversarialEngine results={results} isScanning={isScanning} />
          </div>

          <AnimatePresence>
            {results && !isScanning && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
              >
                <ActionModule results={results} onDraftClick={() => setIsModalOpen(true)} />
              </motion.div>
            )}
          </AnimatePresence>
        </aside>
      </div>

      <ActionAgentModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title="THEMIS Dispute Resolution"
        content={draftContent}
      />
    </main>
  );
}
