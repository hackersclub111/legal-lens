"use client";

import React from 'react';
import { FileText, ShieldAlert, Scale, PenTool, ExternalLink } from 'lucide-react';
import { AuditResponse } from '@/types/audit';
import { cn } from '@/lib/utils';

interface ActionModuleProps {
    results: AuditResponse | null;
    onDraftClick: () => void;
}

export function ActionModule({ results, onDraftClick }: ActionModuleProps) {
    if (!results) return null;

    const actions = {
        medical: [
            { label: "Generate HIPAA Verification Letter", icon: ShieldAlert },
            { label: "Draft 'Surprise Billing' Dispute", icon: PenTool, primary: true }
        ],
        lease: [
            { label: "Draft Lease Amendment", icon: PenTool, primary: true },
            { label: "Cite Tenant Law Code", icon: Scale }
        ],
        contract: [
            { label: "Draft Termination Notice", icon: ShieldAlert },
            { label: "Request Clause Modification", icon: PenTool, primary: true }
        ],
        other: [
            { label: "Draft Standard Dispute", icon: PenTool, primary: true },
            { label: "Legal Consultation Request", icon: ExternalLink }
        ]
    };

    const currentActions = actions[results.docType] || actions.other;

    return (
        <div className="glass p-4 rounded-3xl border border-primary/20 flex items-center justify-between bg-black/40">
            <div className="flex items-center space-x-2 px-2">
                <Scale className="w-4 h-4 text-primary" />
                <span className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground">Action Engine Ready</span>
            </div>

            <div className="flex items-center space-x-3">
                {currentActions.map((action, i) => (
                    <button
                        key={i}
                        onClick={action.primary ? onDraftClick : undefined}
                        className={cn(
                            "px-4 py-2 rounded-xl text-xs font-bold flex items-center space-x-2 transition-all shadow-lg",
                            action.primary
                                ? "bg-primary text-white hover:bg-primary/90 shadow-primary/20"
                                : "glass border-border hover:border-primary/50 text-slate-300"
                        )}
                    >
                        <action.icon className="w-3 h-3" />
                        <span>{action.label}</span>
                    </button>
                ))}
            </div>
        </div>
    );
}
