# Deployment & Environment Variables Guide

## 1. Issue Explanation
Your frontend was connecting to `localhost` because the environment variable `VITE_API_URL` was not correctly set or detected in your deployed Netlify environment.

I have updated the code to automatically default to your production backend (`https://decentdigital.pythonanywhere.com/api`) when the app is built for production, even if the environment variable is missing. However, it is best practice to explicitly set it.

## 2. How to Set Environment Variables in Netlify
To ensure your frontend always connects to the correct backend, follow these steps:

1.  **Log in to Netlify** and go to your site dashboard (`decentdigital`).
2.  Click on **Site configuration** in the top menu.
3.  On the left sidebar, click on **Environment variables**.
4.  Click **Add a variable** (or "New variable").
5.  Add the following key and value:
    *   **Key:** `VITE_API_URL`
    *   **Value:** `https://decentdigital.pythonanywhere.com/api`
    *   **Scope:** Select "All scopes" (Build, Deploy, Runtime).
6.  **Important:** After saving, you must **Trigger a new deploy** for the changes to take effect.
    *   Go to the **Deploys** tab.
    *   Click **Trigger deploy** > **Clear cache and deploy site**.

## 3. Local Development
For your local machine, ensure you have a `.env` file in your `project` folder with:

```
VITE_API_URL=http://localhost:8000/api
```

This ensures that when you run `npm run dev` locally, it connects to your local Django server.
