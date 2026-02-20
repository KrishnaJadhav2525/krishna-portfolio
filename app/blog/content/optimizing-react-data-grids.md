---
title: "Rendering 50k+ Rows: Optimizing React Data Grids"
publishedAt: "2026-02-08"
summary: "Techniques for building high-performance data grids in React, focusing on virtualization, windowing, and memory management."
tags: ["React", "Performance", "Clean Code", "Frontend"]
---

Handling large datasets in the browser is a classic frontend engineering challenge. When you dump 50,000 DOM nodes into a page, the browser grinds to a halt. In my project **React Virtualized Data Grid**, I tackled this head-on.

Here is how I achieved 60 FPS scrolling with 50,000+ rows.

## 1. Virtualization (Windowing)

The golden rule of large lists: **Only render what users can see.**

If a user's screen can only fit 20 rows, there is no reason to render the other 49,980. Virtualization works by creating a "window" of visible items. As the user scrolls, we dynamically unmount rows that leave the viewport and mount new ones that enter.

I implemented a custom hook that calculates:
-   `scrollTop`: How far the user has scrolled.
-   `startIndex`: `scrollTop / rowHeight`
-   `endIndex`: `startIndex + visibleRowCount`

We then render absolute positioned divs for just the items between `startIndex` and `endIndex`. This keeps the DOM node count constant (e.g., ~25 nodes) regardless of whether the dataset has 100 or 1 million rows.

## 2. Memorization Everything

React.memo is your friend. In a data grid, a single cell update shouldn't re-render the entire table.

-   **Memoized Rows**: Each row component is wrapped in `React.memo`. It only re-renders if the data for *that specific index* changes.
-   **Stable Callbacks**: Functions passed to rows (like `onRowClick`) must be stable. `useCallback` ensures that passing a function prop doesn't break the row's memoization.

## 3. Passive Event Listeners

Scroll events fire rapidly. Attaching heavy logic to the `onScroll` event listener is a performance killer. I used **passive event listeners** and requestAnimationFrame to throttle updates, ensuring the UI thread remains unblocked for smooth compositing.

Building this grid taught me that performance isn't an afterthought—it's an architectural decision.
