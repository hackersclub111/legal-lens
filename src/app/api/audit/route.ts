import { NextRequest, NextResponse } from 'next/server';
import { AuditResponse } from '@/types/audit';
import { GoogleGenerativeAI } from '@google/generative-ai';

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY || '');

export async function POST(req: NextRequest) {
    try {
        const formData = await req.formData();
        const file = formData.get('file') as File;

        if (!file) {
            return NextResponse.json({ error: 'No file uploaded' }, { status: 400 });
        }

        if (!process.env.GEMINI_API_KEY) {
            console.warn('GEMINI_API_KEY missing, using mock data');
            return getMockResponse();
        }

        const prompt = `
      Act as THEMIS, a Senior Adversarial Legal Assistant & Public Defender. 
      Analyze the attached document (Image/PDF) for risks and legal discrepancies.
      
      Your goal is to PROTECT the user and identify "Simulation" scenarios where the user's rights are challenged.

      Return ONLY a JSON object in the following format:
      {
        "docType": "medical" | "lease" | "contract" | "other",
        "overallSeverity": number (0-100),
        "winProbability": number (0-100),
        "reasoningSteps": [string] (e.g. "Scanning for Usury Laws...", "Cross-referencing HIPAA..."),
        "simulations": [
          {
            "title": string (e.g. "Landlord vs Tenant"),
            "opponentArgument": string (The predatory argument from the other party),
            "themisCounter": string (The legal counter-argument or defense based on law/codes)
          }
        ],
        "issues": [
          {
            "id": string (unique),
            "title": string,
            "reasoning": string,
            "savings": number,
            "severity": number,
            "box": { "x": number, "y": number, "width": number, "height": number }
          }
        ]
      }
    `;

        // Use v1 for stability, using diagnosed available model
        const model = genAI.getGenerativeModel(
            { model: "gemini-2.0-flash" },
            { apiVersion: "v1" }
        );

        const buffer = await file.arrayBuffer();
        const base64Data = Buffer.from(buffer).toString('base64');

        // Robust mimeType handling
        let mimeType = file.type;
        if (!mimeType) {
            if (file.name.endsWith('.pdf')) mimeType = 'application/pdf';
            else if (file.name.endsWith('.png')) mimeType = 'image/png';
            else if (file.name.endsWith('.jpg') || file.name.endsWith('.jpeg')) mimeType = 'image/jpeg';
            else mimeType = 'image/jpeg'; // Default fallback
        }

        const result = await model.generateContent([
            prompt,
            {
                inlineData: {
                    data: base64Data,
                    mimeType: mimeType
                }
            }
        ]);

        const responseText = result.response.text();
        const jsonMatch = responseText.match(/\{[\s\S]*\}/);
        const data = jsonMatch ? JSON.parse(jsonMatch[0]) : JSON.parse(responseText);

        return NextResponse.json(data);
    } catch (error: any) {
        console.error('Audit API Error:', error);
        return NextResponse.json({
            error: 'Internal server error',
            details: error.message || 'Unknown error'
        }, { status: 500 });
    }
}

function getMockResponse() {
    const mockResponse: AuditResponse = {
        docType: 'lease',
        overallSeverity: 82,
        winProbability: 90,
        reasoningSteps: [
            "Identifying Jurisdiction: California...",
            "Scanning for Predatory Clauses...",
            "Checking Uniform Residential Landlord and Tenant Act (URLTA)...",
            "Analyzing Clause 4.2 Security Deposit Rules..."
        ],
        simulations: [
            {
                title: "Simulation: Landlord vs. Tenant",
                opponentArgument: "Clause 4.2 allows for non-refundable security deposits for cleaning fees regardless of condition.",
                themisCounter: "Under California Civil Code § 1950.5, all security deposits are technically refundable. Forfeiture clauses are void."
            }
        ],
        issues: [
            {
                id: 'ISS-001',
                title: 'Void Security Deposit Clause',
                reasoning: 'Non-refundable security deposits are prohibited by state law. Potential savings reflect typical fee recovery.',
                savings: 250,
                severity: 85,
                box: { x: 20, y: 15, width: 60, height: 8 },
            }
        ]
    };
    return NextResponse.json(mockResponse);
}
