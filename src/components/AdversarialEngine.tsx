"use client";

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Shield, Swords, AlertTriangle, CheckCircle2, Loader2, Scale, Gavel } from 'lucide-react';
import { AuditResponse, Simulation } from '@/types/audit';
import { cn } from '@/lib/utils';

interface AdversarialEngineProps {
    results: AuditResponse | null;
    isScanning: boolean;
}

export function AdversarialEngine({ results, isScanning }: AdversarialEngineProps) {
    const [currentStep, setCurrentStep] = useState(0);

    useEffect(() => {
        if (isScanning) {
            setCurrentStep(0);
            const interval = setInterval(() => {
                setCurrentStep((prev) => (prev < 4 ? prev + 1 : prev));
            }, 800);
            return () => clearInterval(interval);
        }
    }, [isScanning]);

    if (!isScanning && !results) return null;

    return (
        <div className="flex flex-col h-full space-y-6">
            {/* Header: Identity */}
            <div className="glass p-6 rounded-3xl border border-primary/20">
                <div className="flex items-center space-x-3 mb-4">
                    <div className="p-2 bg-primary/10 rounded-xl">
                        <Scale className="w-5 h-5 text-primary" />
                    </div>
                    <div>
                        <h2 className="text-xl font-bold tracking-tight">Deep Think Counsel</h2>
                        <p className="text-[10px] text-muted-foreground uppercase tracking-widest font-bold">THEMIS Adversarial Engine v3.0</p>
                    </div>
                </div>

                {/* Phase 1: Reasoning Stream */}
                <div className="space-y-3">
                    {isScanning ? (
                        <div className="space-y-2">
                            {[
                                "Initializing Legal Core...",
                                "Scanning for Predatory Clauses...",
                                "Identifying Jurisdiction & Case Law...",
                                "Simulating Adversarial Scenarios...",
                                "Neutralizing Risk Vectors..."
                            ].map((step, i) => (
                                <motion.div
                                    key={i}
                                    initial={{ opacity: 0, x: -10 }}
                                    animate={{
                                        opacity: i <= currentStep ? 1 : 0.3,
                                        x: 0,
                                        color: i === currentStep ? '#3b82f6' : i < currentStep ? '#94a3b8' : '#475569'
                                    }}
                                    className="flex items-center space-x-2 text-xs font-mono"
                                >
                                    {i < currentStep ? <CheckCircle2 className="w-3 h-3 text-green-500" /> : <Loader2 className={cn("w-3 h-3 animate-spin", i === currentStep ? "text-primary" : "opacity-0")} />}
                                    <span>{step}</span>
                                </motion.div>
                            ))}
                        </div>
                    ) : (
                        <div className="space-y-2">
                            {results?.reasoningSteps.map((step, i) => (
                                <div key={i} className="flex items-center space-x-2 text-xs font-mono text-muted-foreground">
                                    <CheckCircle2 className="w-3 h-3 text-green-500" />
                                    <span>{step}</span>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </div>

            <AnimatePresence>
                {!isScanning && results && (
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="flex-1 space-y-6 overflow-y-auto pr-2 custom-scrollbar"
                    >
                        {/* Phase 2: The Simulation */}
                        <div className="space-y-4">
                            <h3 className="text-xs font-bold text-muted-foreground uppercase tracking-widest px-2 flex items-center">
                                <Swords className="w-3 h-3 mr-2" />
                                Adversarial Simulation
                            </h3>

                            {results.simulations.map((sim, i) => (
                                <div key={i} className="glass rounded-3xl overflow-hidden border border-border">
                                    <div className="bg-white/5 p-4 border-b border-border">
                                        <h4 className="text-sm font-bold flex items-center">
                                            <Gavel className="w-4 h-4 mr-2 text-primary" />
                                            {sim.title}
                                        </h4>
                                    </div>
                                    <div className="p-4 space-y-4">
                                        <div className="bg-destructive/5 p-3 rounded-2xl border border-destructive/20">
                                            <span className="text-[10px] uppercase font-bold text-destructive mb-1 block">Opponent Argument</span>
                                            <p className="text-xs text-slate-300 italic">"{sim.opponentArgument}"</p>
                                        </div>
                                        <div className="bg-primary/5 p-3 rounded-2xl border border-primary/30">
                                            <span className="text-[10px] uppercase font-bold text-primary mb-1 block">Themis Counter-Argument</span>
                                            <p className="text-xs text-slate-200 font-medium">{sim.themisCounter}</p>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>

                        {/* Phase 3: The Verdict */}
                        <div className="glass p-6 rounded-3xl border-2 border-primary/20 bg-primary/5">
                            <h3 className="text-xs font-bold text-primary uppercase tracking-widest mb-4 flex items-center">
                                <Shield className="w-3 h-3 mr-2" />
                                Final Verdict
                            </h3>
                            <div className="grid grid-cols-2 gap-4">
                                <div className="space-y-1">
                                    <span className="text-[10px] text-muted-foreground uppercase font-bold">Risk Level</span>
                                    <div className={cn(
                                        "text-2xl font-black",
                                        results.overallSeverity > 70 ? "text-destructive" : "text-yellow-500"
                                    )}>
                                        {results.overallSeverity > 70 ? "CRITICAL" : "ELEVATED"}
                                    </div>
                                </div>
                                <div className="space-y-1">
                                    <span className="text-[10px] text-muted-foreground uppercase font-bold">Win Probability</span>
                                    <div className="text-2xl font-black text-green-400">
                                        {results.winProbability}%
                                    </div>
                                </div>
                            </div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}
