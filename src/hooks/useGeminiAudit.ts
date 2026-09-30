import { useState } from 'react';
import { AuditResponse } from '../types/audit';

export function useGeminiAudit() {
    const [isScanning, setIsScanning] = useState(false);
    const [results, setResults] = useState<AuditResponse | null>(null);
    const [error, setError] = useState<string | null>(null);

    const performAudit = async (file: File) => {
        setIsScanning(true);
        setError(null);

        try {
            const formData = new FormData();
            formData.append('file', file);

            const response = await fetch('/api/audit', {
                method: 'POST',
                body: formData,
            });

            if (!response.ok) {
                throw new Error('Failed to audit document');
            }

            const data: AuditResponse = await response.json();
            setResults(data);
        } catch (err) {
            setError(err instanceof Error ? err.message : 'An unknown error occurred');
        } finally {
            setIsScanning(false);
        }
    };

    const reset = () => {
        setResults(null);
        setError(null);
        setIsScanning(false);
    };

    return {
        isScanning,
        results,
        error,
        performAudit,
        reset,
    };
}
