---
title: "Why I Built RepoSense: Analyzing GitHub Activity"
publishedAt: "2026-02-05"
summary: "Insights into building a tool for analyzing repository metrics, visualizing commit history, and ensuring code quality across multiple projects."
tags: ["Open Source", "Next.js", "Analytics", "GitHub API"]
---

Developers love data. We love optimized algorithms, fast databases, and clean code. But oddly, we often lack data on *how* we work. That's why I built **RepoSense**.

RepoSense is a visualization tool that connects to the GitHub API to provide deep insights into repository activity.

## The Problem

GitHub's default "Commits" view is linear. It tells you *what* happened, but not necessarily *how fast* or *by whom* in a way that helps identifying trends. I wanted a dashboard that could answer:
-   *Which days of the week are most productive?*
-   *Who are the "quiet heroes" refactoring huge chunks of code?*
-   *Is the project velocity accelerating or slowing down?*

## Fetching the Data

The GitHub API is powerful but has strict rate limits. To handle this, RepoSense implements an intelligent caching layer.
-   **Static Site Generation (SSG)**: For popular, public repos, we can preown the data.
-   **Client-Side Caching**: Using `swr` to cache API responses in the browser minimizes redundant requests.

## Visualizing Code

I used **Recharts** to turn raw JSON data into actionable insights.
-   **Heatmaps**: Visualizing commit density by day/hour (inspired by GitHub's contribution graph but more detailed).
-   **Punch Cards**: identifying peak commit times.

Building RepoSense forced me to dive deep into API design, authentication flows, and data visualization best practices. It's a tool I now use weekly to track my own open-source contributions.
