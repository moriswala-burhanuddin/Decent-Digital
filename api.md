# 🤖 Novaworks AI - API & Model Documentation

This document documents the Artificial Intelligence infrastructure powering the **Novaworks AI** chat page (`NovaworksAiPage.tsx`) and the backend `NovaworksChatView`.

## 🏗️ API Architecture

Your system uses a **Dual-Engine Architecture** for maximum reliability and intelligence. It attempts to use the fastest engine first (Groq) and falls back to a free/experimental engine (OpenRouter) if the first fails.

### 1. Primary Engine: **Groq**
*   **Provider**: [Groq Cloud](https://console.groq.com/)
*   **Why it's used**: Groq is famous for its **LPUs (Language Processing Units)**, which make it the fastest AI inference engine in the world. It provides near-instant responses, which is crucial for a "real-time" chat feel.
*   **Model Used**: `llama-3.3-70b-versatile`
    *   **Intelligence**: This is a massive 70-billion parameter model from Meta (Facebook). It is comparable to GPT-4 in many reasoning tasks.
    *   **Role**: It handles the heavy lifting of complex coding advice, architectural planning, and "Ultra-Premium" code generation.

### 2. Fallback Engine: **OpenRouter**
*   **Provider**: [OpenRouter](https://openrouter.ai/)
*   **Why it's used**: OpenRouter is an aggregator that lets you access many models with one API key. It is used here as a backup safety net.
*   **Model Used**: `google/gemini-2.0-flash-exp:free`
    *   **Intelligence**: This is Google's latest experimental efficient model. It has a massive context window and strong reasoning.
    *   **Role**: Steps in if Groq is down, out of credits, or unreachable.

---

## 💰 Pricing Analysis: Is it Free?

### Currently Configured Models

1.  **Google Gemini 2.0 Flash (via OpenRouter)**
    *   **Current Status**: **FREE** (`:free` suffix).
    *   **Details**: Google often releases "Experimental" (`exp`) models for free to gather developer feedback.
    *   **Future Cost**: ⚠️ **Likely to change.** Experimental models eventually are retired or replaced by paid production versions. However, OpenRouter usually hosts other free models (like `meta-llama/llama-3-8b-instruct:free`) that you can switch to easily in `api_views.py`.

2.  **Llama 3.3 70B (via Groq)**
    *   **Current Status**: **Very Low Cost / Free Tier**.
    *   **Details**: Groq has had a very generous free beta period. Even their paid tier is extremely competitive (often cheaper than OpenAI).
    *   **Future Cost**: You may need to pay if you exceed their free tier limits (tokens per minute/day).

### Do you need to pay in the future?

**Short Answer:** **Probably, but very little.**

*   **If you stick to the `:free` model on OpenRouter**: You might enjoy free usage for a long time, but you are subject to rate limits (queues) and the model might be deprecated.
*   **If you want Stability**: You should add $5-$10 to OpenRouter or Groq credentials. This amount typically lasts a **very long time** for a single user or small startup because API costs are `per million tokens`.
    *   *Example*: $5 might buy you ~5-10 million words of generated code on cheaper models.

---

## 🔧 Technical Implementation Details

The logic is located in `backend/store/api_views.py`:

```python
# 1. Try Groq (Llama 3.3 70B)
try:
    response = requests.post("https://api.groq.com/openai/v1/chat/completions", ...)
    # ...
except:
    # 2. If Groq fails, Try OpenRouter (Gemini 2.0 Flash)
    response = requests.post("https://openrouter.ai/api/v1/chat/completions", ...)
```

### The "Brain" (System Prompt)
We also upgraded the **System Prompt** (the instructions given to the AI) to ensure it acts like a "Senior Architect". This serves as a hidden "instruction layer" that forces the generic models to provide improved, specific outputs for your project.
