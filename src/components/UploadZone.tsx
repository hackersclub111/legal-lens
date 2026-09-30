"use client";

import React, { useCallback, useState } from 'react';
import { Upload, FileText, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { cn } from '@/lib/utils';

interface UploadZoneProps {
    onUpload: (file: File) => void;
    isScanning: boolean;
}

export function UploadZone({ onUpload, isScanning }: UploadZoneProps) {
    const [dragActive, setDragActive] = useState(false);
    const [selectedFile, setSelectedFile] = useState<File | null>(null);

    const handleDrag = useCallback((e: React.DragEvent) => {
        e.preventDefault();
        e.stopPropagation();
        if (e.type === "dragenter" || e.type === "dragover") {
            setDragActive(true);
        } else if (e.type === "dragleave") {
            setDragActive(false);
        }
    }, []);

    const handleDrop = useCallback((e: React.DragEvent) => {
        e.preventDefault();
        e.stopPropagation();
        setDragActive(false);

        if (e.dataTransfer.files && e.dataTransfer.files[0]) {
            const file = e.dataTransfer.files[0];
            setSelectedFile(file);
            onUpload(file);
        }
    }, [onUpload]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        e.preventDefault();
        if (e.target.files && e.target.files[0]) {
            const file = e.target.files[0];
            setSelectedFile(file);
            onUpload(file);
        }
    };

    const clearFile = () => {
        setSelectedFile(null);
    };

    return (
        <div className="w-full max-w-2xl mx-auto p-6">
            <div
                className={cn(
                    "relative group border-2 border-dashed rounded-3xl p-12 transition-all duration-300 ease-in-out glass",
                    dragActive ? "border-primary scale-[1.02] shadow-[0_0_30px_rgba(59,130,246,0.3)]" : "border-border",
                    selectedFile ? "border-primary/50" : "hover:border-primary/50"
                )}
                onDragEnter={handleDrag}
                onDragLeave={handleDrag}
                onDragOver={handleDrag}
                onDrop={handleDrop}
            >
                <input
                    type="file"
                    id="file-upload"
                    className="hidden"
                    accept="image/*,application/pdf"
                    onChange={handleChange}
                />

                <div className="flex flex-col items-center justify-center text-center space-y-4">
                    <AnimatePresence mode="wait">
                        {!selectedFile ? (
                            <motion.div
                                key="empty"
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: -10 }}
                                className="flex flex-col items-center"
                            >
                                <div className="w-16 h-16 rounded-2xl bg-primary/10 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
                                    <Upload className="w-8 h-8 text-primary" />
                                </div>
                                <h3 className="text-xl font-semibold mb-2">Initialize Scanner</h3>
                                <p className="text-muted-foreground max-w-xs">
                                    Drop your legal document or medical bill here to begin AI-powered auditing
                                </p>
                                <label
                                    htmlFor="file-upload"
                                    className="mt-6 px-6 py-2 bg-primary text-white rounded-xl cursor-pointer hover:bg-primary/90 transition-colors shadow-lg shadow-primary/20"
                                >
                                    Browse Files
                                </label>
                            </motion.div>
                        ) : (
                            <motion.div
                                key="file"
                                initial={{ opacity: 0, scale: 0.9 }}
                                animate={{ opacity: 1, scale: 1 }}
                                className="flex flex-col items-center"
                            >
                                <div className="relative">
                                    <div className="w-20 h-20 rounded-2xl bg-primary/20 flex items-center justify-center mb-4">
                                        <FileText className="w-10 h-10 text-primary" />
                                    </div>
                                    {isScanning && (
                                        <div className="scanner-line" />
                                    )}
                                    {!isScanning && (
                                        <button
                                            onClick={(e) => {
                                                e.stopPropagation();
                                                clearFile();
                                            }}
                                            className="absolute -top-2 -right-2 p-1 bg-destructive text-white rounded-full shadow-lg"
                                        >
                                            <X className="w-4 h-4" />
                                        </button>
                                    )}
                                </div>
                                <h3 className="text-lg font-medium">{selectedFile.name}</h3>
                                <p className="text-sm text-primary animate-pulse mt-2">
                                    {isScanning ? "Deep Scanning in progress..." : "Document Synchronized"}
                                </p>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>
            </div>
        </div>
    );
}
