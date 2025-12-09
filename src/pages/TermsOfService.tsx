import React from 'react';

export default function TermsOfService() {
    return (
        <div className="pt-32 pb-20 px-6 max-w-4xl mx-auto">
            <h1 className="text-4xl font-bold mb-8 dark:text-white">Terms of Service</h1>
            <div className="prose dark:prose-invert max-w-none">
                <p>Last updated: {new Date().toLocaleDateString()}</p>
                <p>Please read these Terms of Service carefully before using our website.</p>

                <h3>Agreement to Terms</h3>
                <p>By accessing our website, you agree to be bound by these Terms of Service and all applicable laws and regulations.</p>

                <h3>Intellectual Property</h3>
                <p>The content on this website, including text, graphics, logos, and images, is the property of Decent Digital and is protected by copyright laws.</p>

                <h3>Limitation of Liability</h3>
                <p>In no event shall Decent Digital be liable for any damages arising out of the use or inability to use the materials on Decent Digital's website.</p>
            </div>
        </div>
    );
}
