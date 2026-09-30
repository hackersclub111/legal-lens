"use client";

import React from 'react';
import { AlertCircle, TrendingDown, Info, ChevronRight } from 'lucide-react';
import { AuditIssue } from '@/types/audit';
import { cn } from '@/lib/utils';
import { motion } from 'framer-motion';

interface AuditIssueCardProps {
    issue: AuditIssue;
    isSelected?: boolean;
    onClick: () => void;
}

export function AuditIssueCard({ issue, isSelected, onClick }: AuditIssueCardProps) {
    return (
        <motion.div
            whileHover={{ x: 4 }}
            onClick={onClick}
            className={cn(
                "p-4 rounded-2xl cursor-pointer transition-all duration-300 border mb-3",
                isSelected
                    ? "glass-accent border-primary ring-1 ring-primary/30"
                    : "glass border-border hover:border-primary/40"
            )}
        >
            <div className="flex items-start justify-between mb-2">
                <div className="flex items-center space-x-2">
                    <div className={cn(
                        "w-2 h-2 rounded-full",
                        issue.severity > 70 ? "bg-destructive shadow-[0_0_8px_rgba(239,68,68,0.6)]" : "bg-yellow-500 shadow-[0_0_8px_rgba(234,179,8,0.6)]"
                    )} />
                    <h4 className="font-semibold text-sm tracking-tight">{issue.title}</h4>
                </div>
                <span className="text-xs font-mono text-muted-foreground">ID: {issue.id}</span>
            </div>

            <p className="text-xs text-muted-foreground line-clamp-2 mb-3 leading-relaxed">
                {issue.reasoning}
            </p>

            <div className="flex items-center justify-between mt-auto">
                <div className="flex items-center space-x-3">
                    <div className="flex items-center text-[10px] text-green-400 font-medium bg-green-400/10 px-2 py-0.5 rounded-full border border-green-400/20">
                        <TrendingDown className="w-3 h-3 mr-1" />
                        SAVE ${issue.savings}
                    </div>
                    <div className="flex items-center text-[10px] text-primary font-medium bg-primary/10 px-2 py-0.5 rounded-full border border-primary/20">
                        <Info className="w-3 h-3 mr-1" />
                        {issue.severity}% SEV
                    </div>
                </div>
                <ChevronRight className={cn(
                    "w-4 h-4 text-muted-foreground transition-transform",
                    isSelected && "rotate-90 text-primary"
                )} />
            </div>
        </motion.div>
    );
}
