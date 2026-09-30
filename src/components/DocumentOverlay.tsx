"use client";

import React from 'react';
import { motion } from 'framer-motion';
import { AuditIssue } from '@/types/audit';
import { cn } from '@/lib/utils';

interface DocumentOverlayProps {
    issues: AuditIssue[];
    selectedIssueId?: string;
    onIssueClick: (id: string) => void;
}

export function DocumentOverlay({ issues, selectedIssueId, onIssueClick }: DocumentOverlayProps) {
    return (
        <div className="absolute inset-0 pointer-events-none">
            {issues.map((issue) => (
                <motion.div
                    key={issue.id}
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    whileHover={{ scale: 1.05, opacity: 1 }}
                    onClick={(e) => {
                        e.stopPropagation();
                        onIssueClick(issue.id);
                    }}
                    className={cn(
                        "audit-highlight pointer-events-auto",
                        selectedIssueId === issue.id && "border-white bg-red-500/40 ring-4 ring-red-500/20"
                    )}
                    style={{
                        left: `${issue.box.x}%`,
                        top: `${issue.box.y}%`,
                        width: `${issue.box.width}%`,
                        height: `${issue.box.height}%`,
                    }}
                >
                    <div className="absolute -top-6 left-0 bg-destructive text-white text-[10px] font-bold px-2 py-0.5 rounded uppercase tracking-wider whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity">
                        {issue.title}
                    </div>
                </motion.div>
            ))}
        </div>
    );
}
