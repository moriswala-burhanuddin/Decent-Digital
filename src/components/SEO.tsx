import { Helmet } from 'react-helmet-async';

interface SEOProps {
    title: string;
    description: string;
    keywords?: string;
    image?: string;
    url?: string;
    type?: 'website' | 'article' | 'profile';
    author?: string;
    publishedTime?: string;
    modifiedTime?: string;
    schema?: Record<string, any>;
}

export default function SEO({
    title,
    description,
    keywords,
    image = '/logo.png', // Default image
    url = typeof window !== 'undefined' ? window.location.href : '',
    type = 'website',
    author = 'Decent Digital',
    publishedTime,
    modifiedTime,
    schema
}: SEOProps) {
    const siteTitle = 'Decent Digital';
    const fullTitle = title === siteTitle ? title : `${title} | ${siteTitle}`;
    const fullImage = image.startsWith('http') ? image : `https://digital.decentinstitute.in${image}`;
    const fullUrl = url.startsWith('http') ? url : `https://digital.decentinstitute.in${url}`;

    // Base Schema (Organization)
    const organizationSchema = {
        '@context': 'https://schema.org',
        '@type': 'Organization',
        name: 'Decent Digital',
        url: 'https://digital.decentinstitute.in',
        logo: 'https://digital.decentinstitute.in/logo.png',
        contactPoint: {
            '@type': 'ContactPoint',
            telephone: '+91 98257 54652',
            contactType: 'customer service',
            areaServed: 'IN',
            availableLanguage: 'en'
        },
        sameAs: [
            'https://www.facebook.com/decentdigital',
            'https://www.instagram.com/decentdigital',
            'https://www.linkedin.com/company/decentdigital'
        ]
    };

    const structuredData = schema ? [organizationSchema, schema] : [organizationSchema];

    return (
        <Helmet>
            {/* Standard Metadata */}
            <title>{fullTitle}</title>
            <meta name="description" content={description} />
            {keywords && <meta name="keywords" content={keywords} />}
            <link rel="canonical" href={fullUrl} />
            <meta name="author" content={author} />

            {/* Open Graph / Facebook */}
            <meta property="og:type" content={type} />
            <meta property="og:title" content={fullTitle} />
            <meta property="og:description" content={description} />
            <meta property="og:image" content={fullImage} />
            <meta property="og:url" content={fullUrl} />
            <meta property="og:site_name" content={siteTitle} />
            {publishedTime && <meta property="article:published_time" content={publishedTime} />}
            {modifiedTime && <meta property="article:modified_time" content={modifiedTime} />}

            {/* Twitter */}
            <meta name="twitter:card" content="summary_large_image" />
            <meta name="twitter:creator" content="@decentdigital" />
            <meta name="twitter:title" content={fullTitle} />
            <meta name="twitter:description" content={description} />
            <meta name="twitter:image" content={fullImage} />

            {/* JSON-LD Structured Data */}
            <script type="application/ld+json">
                {JSON.stringify(structuredData)}
            </script>
        </Helmet>
    );
}
