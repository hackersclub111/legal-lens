"use client";

import React from 'react';
import { AuditIssue } from '@/types/audit';
import { DocumentOverlay } from './DocumentOverlay';

interface XRayViewerProps {
    file: File | null;
    issues: AuditIssue[];
    isScanning: boolean;
    selectedIssueId?: string;
    onIssueClick: (id: string) => void;
}

export function XRayViewer({ file, issues, isScanning, selectedIssueId, onIssueClick }: XRayViewerProps) {
    const [imageUrl, setImageUrl] = React.useState<string | null>(null);

    React.useEffect(() => {
        if (file) {
            const url = URL.createObjectURL(file);
            setImageUrl(url);
            return () => URL.revokeObjectURL(url);
        }
    }, [file]);

    if (!file || !imageUrl) return null;

    return (
        <div className="relative w-full aspect-[3/4] max-w-4xl mx-auto rounded-3xl overflow-hidden glass border border-primary/20 bg-black/40 shadow-2xl">
            <div className="absolute inset-0 flex items-center justify-center p-8">
                <div className="relative w-full h-full flex items-center justify-center">
                    <img
                        src={imageUrl}
                        alt="Audited Document"
                        className="max-w-full max-h-full object-contain rounded-lg opacity-80"
                    />

                    <DocumentOverlay
                        issues={issues}
                        selectedIssueId={selectedIssueId}
                        onIssueClick={onIssueClick}
                    />

                    {isScanning && (
                        <div className="absolute inset-0 pointer-events-none">
                            <div className="scanner-line" />
                        </div>
                    )}
                </div>
            </div>

            <div className="absolute top-4 left-4 glass px-4 py-2 rounded-xl border border-primary/30 flex items-center space-x-2">
                <div className="w-2 h-2 rounded-full bg-primary animate-pulse" />
                <span className="text-xs font-mono uppercase tracking-widest text-primary/80">X-Ray Feed Active</span>
            </div>
        </div>
    );
}
