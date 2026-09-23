# ClarityCXR

ClarityCXR is a multimodal healthcare AI workspace designed for clinicians and radiologists. It fuses chest imaging, clinical reports, lab results, and patient medical histories into a single interactive interface to accelerate diagnostic workflows.

## Table of Contents

- [Features](#features)
- [Requirements](#requirements)
- [Installation](#installation)
- [Configuration](#configuration)
- [Usage](#usage)
- [Project Structure](#project-structure)
- [Testing](#testing)

## Features

- **Multimodal Healthcare Integration:** Combines medical imaging analysis with clinical notes, lab values, prescriptions, and patient records.
- **Radiology Workspace:** Displays chest X-rays with preset visualization toggles (lungs, ribs, mediastinum), automated finding overlays, and AI summary reports.
- **Authentication & OAuth:** Built-in session management using Supabase SSR with Google and GitHub OAuth providers.
- **FastAPI Backend Stack:** Scalable Python backend setup supporting LangChain, vector storage (ChromaDB, FAISS), OCR (PyTesseract), document processing, and LLM providers (OpenAI, Google Generative AI, Groq).

## Requirements

- **Frontend:** Node.js runtime with [Bun](https://bun.sh/) `1.3.14` or higher.
- **Backend:** Python `3.10+` environment.
- **Database / Auth:** A [Supabase](https://supabase.com/) project for authentication and session management.

## Installation

### 1. Clone the repository and install frontend dependencies

```bash
cd frontend
bun install
```

### 2. Set up the Python backend environment

```bash
cd backend
python -m venv venv
source venv/bin/activate
pip install -r requirements.txt
```

## Configuration

Set up environment variables for the frontend application. Define the following variables in a `.env.local` file inside the `frontend/` directory:

```env
NEXT_PUBLIC_SUPABASE_URL=your_supabase_project_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
```

## Usage

### Development

Run the Next.js frontend development server:

```bash
cd frontend
bun run dev
```

Run the FastAPI backend service:

```bash
cd backend
uvicorn app:app --reload
```

### Production

Build the frontend application for production:

```bash
cd frontend
bun run build
```

Start the production frontend server:

```bash
cd frontend
bun run start
```

## Project Structure

```
├── .env.example
├── docker-compose.yml
├── backend/
│   ├── app.py
│   └── requirements.txt
└── frontend/
    ├── app/
    │   ├── auth/
    │   │   └── callback/
    │   ├── dashboard/
    │   ├── landing/
    │   ├── login/
    │   ├── layout.tsx
    │   ├── middleware.ts
    │   └── page.tsx
    ├── components/
    │   ├── ui/
    │   │   ├── badge.tsx
    │   │   ├── button.tsx
    │   │   ├── card.tsx
    │   │   ├── scroll-area.tsx
    │   │   ├── separator.tsx
    │   │   ├── sidebar.tsx
    │   │   └── tabs.tsx
    │   ├── github.tsx
    │   └── google.tsx
    ├── lib/
    │   └── utils.ts
    ├── utils/
    │   ├── auth.tsx
    │   └── supabase/
    ├── package.json
    └── tsconfig.json
```

## Testing

Run backend tests using `pytest`:

```bash
cd backend
pytest
```

Run frontend code linting:

```bash
cd frontend
bun run lint
```