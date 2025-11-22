# ContextCore Project Documentation

## 1. Project Overview
**Name:** ContextCore (Internal: ContextVisionCode)
**Purpose:** A specialized tool for "Context Engineering" applied to software development. It allows users to ingest entire codebases or code snippets, generating a "Deep Context" representation that enables Large Language Models (LLMs) to understand the project holistically.
**Core Value Proposition:** overcoming the "lost in the middle" phenomenon and context window limits by structuring code data effectively for AI consumption.

## 2. System Architecture

### 2.1 Backend (Node.js + Express)
- **Framework:** Express.js server.
- **Database & Storage:** Supabase (PostgreSQL for metadata, Storage for large XML context files).
- **AI Engine:** Google Gemini 2.5 Flash (via `@google/generative-ai`).
- **Key Components:**
    - **`server.js`**: Main entry point, handles API routes for ingestion, chat, and payments.
    - **`workers/ingestion.js`**: The core "Context Engine". It handles:
        1.  **Cloning/Unzipping**: Fetches code from Git URLs or ZIP uploads.
        2.  **Filtering**: Uses `fast-glob` to ignore non-essential files (binaries, locks, `node_modules`).
        3.  **XML Packing**: Concatenates all valid source code files into a single structured XML document (`<repository><file path="...">content</file>...</repository>`).
        4.  **Graph Generation**: Sends a truncated version (1M chars) of the context to Gemini to generate a visualization (Nodes/Edges JSON) of the project architecture.
    - **`routes/snippet.js`**: Specialized handler for code snippets. It asks Gemini to "hallucinate" a deep context XML analysis (metadata, architecture, insights) based on a single snippet, treating it as a full project.

### 2.2 Frontend (React + Next.js)
- **Framework:** Next.js with TypeScript.
- **Styling:** TailwindCSS (implied by `globals.css` and class names).
- **Key Pages:**
    - **Dashboard**: Lists projects, shows status.
    - **Chat Interface**: Streams responses from the backend, maintaining conversation history.
    - **Graph View**: Renders the architecture graph generated during ingestion.

## 3. Current "Context Engineering" Implementation
The current system uses a **"Brute Force XML Packing"** strategy:
1.  **Format:** XML is used as the container format.
2.  **Selection:** All text-based files (minus ignores) are included.
3.  **Ordering:** Alphabetical/Directory order (via `fast-glob`).
4.  **Context Loading:** The *entire* generated XML is loaded into the system prompt for every chat message.
    - *System Prompt:* "Você é o ContextCore. Use o XML abaixo como memória total do código..."

## 4. Limitations & Challenges
1.  **Context Window Efficiency:** Loading the full XML for every request is token-heavy and expensive. It relies entirely on Gemini's large context window (2M tokens), but efficiency drops as size increases.
2.  **Naive Packing:** No intelligent ranking or summarization of files. A `utils.js` is treated with the same weight as `core_logic.js`.
3.  **Graph Truncation:** The architecture graph generation is capped at 1,000,000 characters. Large repos will have incomplete visualizations.
4.  **Rate Limits:** The system implements retry logic with exponential backoff for Gemini API (429 errors), but heavy loads still pose a risk.

## 5. Goals for Improvement (Why we are researching)
We aim to evolve from "Brute Force Packing" to **"Smart Context Engineering"**.
- **Repomix:** We are investigating tools like Repomix to replace our custom `ingestion.js`. We want to know if its packing strategies (token counting, formatting, security filtering) are superior.
- **RAG vs. Long Context:** We want to determine if we should stick to "Long Context" (current approach) or implement a Hybrid RAG (Retrieval-Augmented Generation) system to fetch only relevant parts of the XML.
- **Context Optimization:** How to structure the data (XML vs Markdown vs JSON) to maximize LLM reasoning capabilities?

## 6. Technical Stack Summary
- **Runtime:** Node.js
- **Frontend:** Next.js, React, Lucide Icons, Framer Motion.
- **Backend:** Express, Supabase Client, Google Generative AI SDK.
- **Tools:** `simple-git`, `adm-zip`, `fast-glob`.
