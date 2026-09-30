"use client";

import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Send, Copy, Check } from 'lucide-react';
import { cn } from '@/lib/utils';

interface ActionAgentModalProps {
    isOpen: boolean;
    onClose: () => void;
    title: string;
    content: string;
}

export function ActionAgentModal({ isOpen, onClose, title, content }: ActionAgentModalProps) {
    const [isCopied, setIsCopied] = React.useState(false);

    const copyToClipboard = () => {
        navigator.clipboard.writeText(content);
        setIsCopied(true);
        setTimeout(() => setIsCopied(false), 2000);
    };

    return (
        <AnimatePresence>
            {isOpen && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6">
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={onClose}
                        className="absolute inset-0 bg-black/80 backdrop-blur-sm"
                    />

                    <motion.div
                        initial={{ opacity: 0, scale: 0.9, y: 20 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.9, y: 20 }}
                        className="relative w-full max-w-3xl glass border border-primary/20 rounded-3xl shadow-2xl overflow-hidden flex flex-col max-h-[90vh]"
                    >
                        {/* Header */}
                        <div className="p-6 border-b border-border flex items-center justify-between bg-primary/5">
                            <div className="flex items-center space-x-3">
                                <div className="w-10 h-10 rounded-xl bg-primary/20 flex items-center justify-center">
                                    <span className="text-xl font-bold text-primary">A</span>
                                </div>
                                <div>
                                    <h2 className="text-xl font-bold tracking-tight">{title}</h2>
                                    <p className="text-xs text-muted-foreground uppercase tracking-widest">AI Action Agent Draft</p>
                                </div>
                            </div>
                            <button
                                onClick={onClose}
                                className="p-2 hover:bg-white/10 rounded-full transition-colors"
                            >
                                <X className="w-6 h-6 text-muted-foreground" />
                            </button>
                        </div>

                        {/* Content Area */}
                        <div className="flex-1 overflow-y-auto p-8 custom-scrollbar bg-black/20">
                            <div className="prose prose-invert max-w-none">
                                <div className="whitespace-pre-wrap font-sans text-sm leading-relaxed text-slate-300">
                                    {content}
                                </div>
                            </div>
                        </div>

                        {/* Footer */}
                        <div className="p-6 border-t border-border flex items-center justify-between bg-black/40">
                            <p className="text-xs text-muted-foreground italic">
                                Verified by Sentinel AI Engine v1.0. Drafting logic based on local regulations.
                            </p>
                            <div className="flex items-center space-x-3">
                                <button
                                    onClick={copyToClipboard}
                                    className="px-4 py-2 glass border-border hover:border-primary/50 text-sm font-medium rounded-xl flex items-center space-x-2 transition-all"
                                >
                                    {isCopied ? <Check className="w-4 h-4 text-green-400" /> : <Copy className="w-4 h-4" />}
                                    <span>{isCopied ? "Copied" : "Copy Draft"}</span>
                                </button>
                                <button
                                    className="px-6 py-2 bg-primary hover:bg-primary/90 text-white text-sm font-bold rounded-xl flex items-center space-x-2 shadow-lg shadow-primary/20 transition-all"
                                >
                                    <Send className="w-4 h-4" />
                                    <span>Send Dispute</span>
                                </button>
                            </div>
                        </div>
                    </motion.div>
                </div>
            )}
        </AnimatePresence>
    );
}
