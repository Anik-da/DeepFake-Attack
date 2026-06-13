# 🛡️ TruthGuard AI — Enterprise Deepfake Detection & Fact-Checking Platform

### 🌐 Live Production Application: **[https://deepfake-attack.web.app](https://deepfake-attack.web.app)**

TruthGuard AI is a state-of-the-art integrity verification portal designed for digital forensics investigators and intelligence analysts. Built on a resilient **FastAPI** backend and a highly polished, responsive **Next.js** (React) frontend, it offers real-time analysis tools to identify deepfakes and cross-examine online misinformation.

---

## 🎯 Key Capabilities

*   **🛡️ Multi-Modal Forensic Sandbox (`/verify`)**:
    *   Upload images, audio recordings, or videos for deep neural scan.
    *   **Live circular scanning progress indicator** and a **detailed investigation timeline checklist** that guides users through extraction phases in real time.
    *   **Real print-to-PDF Cryptographic Certificates**: Automatically opens print-optimized layouts so investigators can save formal cryptographic authenticity reports.
*   **🤖 AI Claim Fact-Checking (`/fact-check`)**:
    *   Powered by Google's local **Gemma-4-12B-IT** model with serverless cloud fallback (**Gemma-2-9B-IT**) via Hugging Face.
    *   Evaluates claims and returns structured, human-readable verdicts, confidence ratings, and official publisher sources (e.g., PIB Fact Check Desk, RBI Press Releases).
*   **📊 Calibration & Explainability Studio (`/dashboard/explainability`)**:
    *   Configurable Sensitivity and Noise-Reduction sliders.
    *   Real-time estimated KPIs (True/False Positive Rates, scanner throughput).
    *   Interactive Canvas-based raw signal wave visualizer.
*   **🔒 Auth-Gated Secure Routing**:
    *   Custom client-side **`RouteGuard`** prevents unauthenticated users from accessing restricted sections.
    *   Persistent Firebase user sessions allow users to log in once and stay logged in.
    *   **Partitioned User Histories**: Verification history and fact-checking searches are stored securely under user-specific collections (`users/{userId}/factchecks` and `users/{userId}/history`), guaranteeing privacy.

---

## ⚙️ Architecture & Technical Stack

*   **Frontend**: Next.js 16 (React), TypeScript, Tailwind CSS, Lucide icons, Firebase Client SDK (Auth, Firestore).
*   **Backend**: FastAPI, Uvicorn, Hugging Face `InferenceClient`, Requests, PyTorch, Wav2Vec2.
*   **AI Integration & Core Models**:
    *   📷 **Image Deepfake Detections**: `prithivMLmods/Deep-Fake-Detector-v2-Model`
        *   Used for frame-by-skin and texture-level anomaly scans, accessed via HF Inference API/Client using specific stream-headers.
    *   🎙️ **Audio Voice-Clone Detections**: `garystafford/wav2vec2-deepfake-voice-detector`
        *   A fine-tuned Wav2Vec2 audio classification model loaded locally using PyTorch and Hugging Face Transformers, evaluating spectral anomalies and vocal signatures.
    *   🎥 **Video Deepfake Detection & Analysis**: `Naman712/Deep-fake-detection`
        *   Model benchmarks utilized for detecting synthetic manipulations, temporal anomalies, and compression markers.
    *   ✍️ **Primary AI Claim Fact-Checking (Local)**: `google/gemma-4-12B-it`
        *   Loaded locally using `AutoModelForMultimodalLM` and `AutoProcessor` under PyTorch with automatic GPU/CPU device mapping for high-speed local inference.
    *   ⚡ **Fallback AI Claim Fact-Checking (Serverless)**: `google/gemma-2-9b-it`
        *   Serverless fallback instruction model accessed via Hugging Face InferenceClient for high-availability cloud redundancy.
*   **Database & Hosting**: Google Firebase (Firestore Database, Firebase Auth, Firebase Hosting).

---

## 🚀 Getting Started

### 1. Backend Setup (FastAPI)
1. Install Python requirements:
   ```bash
   pip install -r requirements.txt
   ```
2. Create a `.env.local` file in the project directory:
   ```env
   HF_TOKEN=your_huggingface_access_token
   ```
3. Run the FastAPI server:
   ```bash
   python server.py
   ```
   The backend will run at `http://127.0.0.1:8000`.

### 2. Frontend Setup (Next.js)
1. Install dependencies:
   ```bash
   npm install
   ```
2. Build the production bundle:
   ```bash
   npm run build
   ```
3. Start the dev server:
   ```bash
   npm run dev
   ```
   Open `http://localhost:3000` to preview locally.

---

## ☁️ Deployment

The frontend compiles to static export pages and is hosted directly on Firebase Hosting:
```bash
# Build the application
npm run build

# Deploy to Firebase Hosting
firebase deploy --only hosting
```

---

## 🛡️ Security & Environment Protections
*   All API keys and credentials are kept strictly out of git history.
*   `.env.local` is listed in the `.gitignore` to prevent leaking keys.
*   Route verification and account database is protected by Firebase Firestore rules.
