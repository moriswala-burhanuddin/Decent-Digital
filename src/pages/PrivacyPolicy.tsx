import React from 'react';

export default function PrivacyPolicy() {
    return (
        <div className="pt-32 pb-20 px-6 max-w-4xl mx-auto">
            <h1 className="text-4xl font-bold mb-8 dark:text-white">Privacy Policy</h1>
            <div className="prose dark:prose-invert max-w-none">
                <p>Last updated: {new Date().toLocaleDateString()}</p>
                <p>At Decent Digital, we take your privacy seriously. This Privacy Policy explains how we collect, use, and protect your personal information.</p>

                <h3>Information We Collect</h3>
                <p>We collect information you provide directly to us, such as when you fill out a contact form or subscribe to our newsletter.</p>

                <h3>How We Use Your Information</h3>
                <p>We use the information we collect to provide, maintain, and improve our services, to develop new ones, and to protect Decent Digital and our users.</p>

                <h3>Contact Us</h3>
                <p>If you have any questions about this Privacy Policy, please contact us at info@decentdigital.in.</p>
            </div>
        </div>
    );
}
