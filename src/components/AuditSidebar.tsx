"use client";

import React from 'react';
import { ShieldCheck, Target, Banknote, PenTool } from 'lucide-react';
import { AuditIssue, AuditResponse } from '@/types/audit';
import { AuditIssueCard } from './AuditIssueCard';
import { motion } from 'framer-motion';

interface AuditSidebarProps {
    results: AuditResponse | null;
    selectedIssueId?: string;
    onIssueClick: (id: string) => void;
    onActionClick: () => void;
}

export function AuditSidebar({ results, selectedIssueId, onIssueClick, onActionClick }: AuditSidebarProps) {
    if (!results) return null;

    const totalSavings = results.issues.reduce((acc, issue) => acc + issue.savings, 0);

    return (
        <div className="flex flex-col h-full space-y-6">
            <div className="glass p-6 rounded-3xl border border-primary/20 space-y-6">
                <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                        <div className="p-2 bg-primary/10 rounded-xl">
                            <ShieldCheck className="w-5 h-5 text-primary" />
                        </div>
                        <div>
                            <h2 className="text-xl font-bold tracking-tight">Audit Report</h2>
                            <p className="text-xs text-muted-foreground uppercase tracking-widest">Active Analysis Session</p>
                        </div>
                    </div>
                    <div className="text-right">
                        <div className="text-2xl font-black text-primary">{results.issues.length}</div>
                        <div className="text-[10px] text-muted-foreground uppercase font-bold">Issues Found</div>
                    </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                    <div className="bg-secondary/50 p-4 rounded-2xl border border-border">
                        <div className="flex items-center space-x-2 text-muted-foreground mb-1">
                            <Target className="w-3 h-3" />
                            <span className="text-[10px] uppercase font-bold">Severity Score</span>
                        </div>
                        <div className="text-xl font-bold text-destructive">{results.overallSeverity}/100</div>
                    </div>
                    <div className="bg-green-400/5 p-4 rounded-2xl border border-green-500/20">
                        <div className="flex items-center space-x-2 text-green-400/80 mb-1">
                            <Banknote className="w-3 h-3" />
                            <span className="text-[10px] uppercase font-bold">Total Savings</span>
                        </div>
                        <div className="text-xl font-bold text-green-400">${totalSavings}</div>
                    </div>
                </div>

                <button
                    onClick={onActionClick}
                    className="w-full py-3 bg-primary hover:bg-primary/90 text-white rounded-2xl font-bold flex items-center justify-center space-x-2 transition-all shadow-lg shadow-primary/20 group"
                >
                    <PenTool className="w-4 h-4 group-hover:rotate-12 transition-transform" />
                    <span>Draft Dispute Letter</span>
                </button>
            </div>

            <div className="flex-1 overflow-y-auto pr-2 custom-scrollbar">
                <div className="space-y-1 mb-4">
                    <h3 className="text-xs font-bold text-muted-foreground uppercase tracking-widest px-2">Detailed Findings</h3>
                </div>

                {results.issues.map((issue) => (
                    <AuditIssueCard
                        key={issue.id}
                        issue={issue}
                        isSelected={selectedIssueId === issue.id}
                        onClick={() => onIssueClick(issue.id)}
                    />
                ))}

                {results.issues.length === 0 && (
                    <div className="flex flex-col items-center justify-center py-12 text-center glass border-dashed rounded-3xl opacity-50">
                        <ShieldCheck className="w-8 h-8 mb-2 text-muted-foreground" />
                        <p className="text-sm">No critical risks detected in current view</p>
                    </div>
                )}
            </div>
        </div>
    );
}
