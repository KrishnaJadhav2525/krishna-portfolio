---
title: "Automating Venture Capital Scouting with Llama 3 & Jina AI"
publishedAt: "2026-02-15"
summary: "How I built a VC intelligence platform that scrapes startup websites and enriches data using local LLMs (Llama 3 via Groq) for free."
tags: ["Next.js", "Llama 3", "Jina AI", "Web Scraping", "Groq"]
---

Venture Capital relies heavily on data, but finding and analyzing early-stage startups is often a manual, tedious process. I wanted to see if I could automate the "top of funnel" scouting process using modern AI tools—without spending a fortune on enterprise data subscriptions.

The result is **Venture Scout**, a platform that turns a simple website URL into a comprehensive investment memo.

## The Architecture

The core philosophy was "High Performance, Low Cost."
-   **Frontend**: Next.js 14 (App Router) for a responsive UI.
-   **Scraper**: Jina AI Reader (`r.jina.ai`) to turn complex websites into LLM-friendly markdown.
-   **Intelligence**: Llama 3 (via Groq) for high-speed extraction and analysis.

## The "Enrichment" Engine

The killer feature of this app is the **Enrichment Button**. Here's what happens when you click it:

1.  **Fetcher**: The app sends the startup's URL to Jina AI. Jina bypasses common blockers and returns clean, readable markdown of the landing page.
2.  **Analyzer**: This markdown is sent to Groq. Because Groq's inference is insanely fast (hundreds of tokens/sec), we can use a large model like Llama 3 70B to analyze the entire page content in under 2 seconds.
3.  **Extractor**: The LLM extracts key structured data:
    -   Value Proposition
    -   Target Market
    -   Business Model (B2B/B2C)
    -   Pricing Strategy
4.  **Display**: The UI updates instantly, populating the dashboard with these insights.

## Why Groq + Llama 3?

Speed. In a user-facing application, waiting 10 seconds for GPT-4 is a bad experience. Groq delivers Llama 3 responses almost instantly, making the "Live Enrichment" feel truly real-time.

Combines with Jina AI's ability to read almost any web page, this tool becomes a powerful weapon for anyone doing market research or competitive analysis.
