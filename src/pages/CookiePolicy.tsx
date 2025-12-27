import React from 'react';
import SEO from '../components/SEO';

export default function CookiePolicy() {
    return (
        <div className="pt-32 pb-20 px-6 max-w-4xl mx-auto">
            <SEO title="Cookie Policy" description="Cookie Policy for Decent Digital." />
            <h1 className="text-4xl font-bold mb-8 dark:text-white">Cookie Policy</h1>
            <div className="prose dark:prose-invert max-w-none">
                <p>Last updated: {new Date().toLocaleDateString()}</p>
                <p>This Cookie Policy explains how Decent Digital uses cookies and similar technologies.</p>

                <h3>What are Cookies?</h3>
                <p>Cookies are small text files that are stored on your device when you visit a website. They help the website function properly and provide usage information.</p>

                <h3>How We Use Cookies</h3>
                <p>We use cookies to understand how you use our website and to improve your experience. This includes remembering your preferences and settings.</p>

                <h3>Managing Cookies</h3>
                <p>You can control and manage cookies through your browser settings. However, disabling cookies may affect the functionality of our website.</p>
            </div>
        </div>
    );
}
