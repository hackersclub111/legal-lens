# Legal Lens (THEMIS) — AI-Powered Adversarial Legal Assistant & Document X-Ray Scanner

> **Legal Lens (THEMIS)** is an adversarial legal defense platform designed to protect users against predatory contracts, unfair medical bills, usurious lease clauses, and aggressive corporate agreements.

---

## 🌟 Key Features

1. **Document X-Ray Visual Feed**
   - High-fidelity visual document scanner with real-time bounding box overlays on scanned contracts, leases, and medical bills.
   - Highlights critical risk zones, predatory terms, and potential savings.

2. **THEMIS Adversarial Legal Engine**
   - Simulates opposing arguments and automatically formulates bulletproof counter-arguments citing applicable legal codes and regulations.
   - Computes win probability and overall severity score.

3. **Automated Dispute Letter Generation**
   - Generates formal legal dispute notices ready for dispatch to landlords, billing departments, or opposing parties.

4. **Multi-Modal AI Reasoning**
   - Powered by Gemini 2.0 Flash for low-latency visual analysis and structured JSON extraction.

---

## 🛠️ Tech Stack

- **Framework**: Next.js 16 (App Router)
- **UI & Styling**: React 19, Tailwind CSS v4, Framer Motion, Lucide React
- **AI / Vision**: `@google/generative-ai` (Gemini 2.0 Flash)
- **Language**: TypeScript

---

## 🚀 Getting Started

### 1. Environment Setup

Create a `.env.local` file in the root directory:

```env
GEMINI_API_KEY="your-gemini-api-key"
```

*(Note: If no API key is provided, the application gracefully operates in mock simulation mode).*

### 2. Install Dependencies

```bash
npm install
```

### 3. Run Development Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser.

---

## 📁 Project Architecture

```
Sentinel/
├── public/                 # Static assets and icons
├── src/
│   ├── app/
│   │   ├── api/audit/      # THEMIS Gemini audit route
│   │   ├── layout.tsx      # Application layout & metadata
│   │   ├── page.tsx        # Main application dashboard
│   │   └── globals.css     # Design tokens and styles
│   ├── components/
│   │   ├── XRayViewer.tsx  # Document visual overlay & scanner
│   │   ├── AdversarialEngine.tsx # Defense simulation engine
│   │   ├── UploadZone.tsx  # Drag & drop document uploader
│   │   ├── AuditSidebar.tsx# Detected issues & severity metrics
│   │   └── ActionModule.tsx# Formal dispute generation
│   ├── hooks/
│   │   └── useGeminiAudit.ts # Audit state & API handler
│   └── types/
│       └── audit.ts        # Structured audit response types
```
