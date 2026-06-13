# TruthGuard AI — Enterprise Deepfake Detection & Fact-Checking Platform

TruthGuard AI is a state-of-the-art integrity verification portal built with a FastAPI backend and a Next.js (React) frontend, providing real-time forensic diagnostics for images, videos, audio samples, and claim fact-checking.

## Features

- **🛡️ Forensic Media Sandbox (`/verify`)**: High-capacity upload workflow (up to 1GB files) supporting image, video, and audio deepfake analysis.
- **🤖 Gemma 2 9B Fact-Checker (`/fact-check`)**: Natural language claim check engine powered by Google's Gemma 2 9B model via Hugging Face Inference APIs, providing verdicts, confidence levels, and credibility attributions.
- **📊 Calibration & Explainability Studio (`/dashboard/explainability`)**: Interactive threshold configuration dashboard allowing real-time adjustments of sensitivity and noise-reduction coefficients, paired with an animated SVG/Canvas raw signal wave analyzer.
- **🚨 Viral Threat Alert Center**: Active misinformation threat tracking in the dashboard showing platform spread rate, shares volume, and automated audit redirects.
- **☁️ Firebase Firestore & Hosting Integration**: Fully persistent analysis database matching real-time user verification logs.

---

## Getting Started

### 1. Requirements & System Dependencies
Make sure you have Python 3.10+ and Node.js 18+ installed on your system.

### 2. Backend Installation (FastAPI)
1. Install Python requirements:
   ```bash
   pip install -r requirements.txt
   ```
2. Set your Hugging Face API Token in system environment variables or in `.env.local` in the project root:
   ```env
   HF_TOKEN=your_huggingface_access_token_here
   ```
3. Run the FastAPI server:
   ```bash
   python server.py
   ```
   The backend server will run at `http://127.0.0.1:8000`.

### 3. Frontend Installation (Next.js)
1. Install node packages:
   ```bash
   npm install
   ```
2. Build the static distribution:
   ```bash
   npm run build
   ```
3. Start local development server:
   ```bash
   npm run dev
   ```
   Open `http://localhost:3000` to preview.

---

## Deployment

The static Next.js frontend has been configured to build and deploy to Firebase Hosting:
```bash
# Deploy to Firebase hosting
npx firebase deploy --only hosting --project deepfake-attack
```
Live URL: **[https://deepfake-attack.web.app](https://deepfake-attack.web.app)**

---

## Security & Secrets Protection
This project is configured to keep all credentials secure:
* All Firebase and Hugging Face API keys are read dynamically from local environment variables.
* The `.gitignore` file strictly blocks all `.env` files, `.env.local`, Python virtual environments (`venv`), and build caches from being committed to version control.
