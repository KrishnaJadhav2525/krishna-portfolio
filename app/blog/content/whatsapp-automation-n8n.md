---
title: "Mastering WhatsApp Automation with n8n and PostgreSQL"
publishedAt: "2026-02-12"
summary: "A guide to building a smart WhatsApp agent that manages availability, handling sleep modes and busy statuses automatically."
tags: ["Automation", "n8n", "WhatsApp API", "PostgreSQL", "Workflow"]
---

We've all been there—messages pinging at 2 AM, or getting distracted by chats when you're in deep work mode. I decided to solve this by building a **Smart WhatsApp Agent** that manages my availability for me.

This isn't just a simple auto-reply bot; it's a state-aware system powered by **n8n** and **PostgreSQL**.

## How It Works

The system is built on a few core concepts:

### 1. State Management (PostgreSQL)
A stateless bot is a dumb bot. My agent needs to know:
-   *Am I asleep?*
-   *Am I in 'Deep Work' mode?*
-   *Who is allowed to bypass these modes?*

I use a simple PostgreSQL database to store this state. One table tracks my current status (`status_id`, `status_text`, `updated_at`), and another tracks "VIP" contacts who can reach me anytime.

### 2. The Workflow (n8n)
n8n orchestrates everything. The webhook listens for incoming WhatsApp messages via the WhatsApp Business API.

**Logic Flow:**
1.  **Incoming Message**: Webhook triggers.
2.  **Check Status**: Query PostgreSQL to get my current state.
3.  **Decision Tree**:
    -   If `Status == Available`: Let the notification through.
    -   If `Status == Sleeping`: Send an auto-reply ("I'm sleeping, will reply tomorrow") and mute the notification.
    -   If `Status == Busy`: Check if sender is VIP. If yes, notify. If no, auto-reply ("In deep work, catch you later").

### 3. Control Interface
I didn't want to write SQL queries to change my status. I built a simple lightweight frontend (or you could use a Telegram bot) that sends a command to n8n to update my status row in Postgres.

## Why n8n?

n8n is the perfect glue for this. It handles the API webhooks, the database logic, and the conditional branching visually. It turns a complex logic problem into a flowchart that I can debug and modify in seconds.

Now, I sleep peacefully knowing my agent is guarding my notifications.
