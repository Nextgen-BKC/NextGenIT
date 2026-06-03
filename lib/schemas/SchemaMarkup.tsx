export function SchemaMarkup() {
  const organizationSchema = {
    "@context": "https://schema.org",
    "@type": "Organization",
    "name": "Itclub Butwal Kalika Campus",
    "url": "https://itclub.butwalkalikacampus.edu.np",
    "logo": "https://itclub.butwalkalikacampus.edu.np/logo.png",
    "description": "IT Club at Kalika Campus, Butwal - Learn programming, web development, and advance your IT skills",
    "address": {
      "@type": "PostalAddress",
      "addressLocality": "Butwal",
      "addressRegion": "Nepal",
      "postalCode": "32900",
      "addressCountry": "NP"
    },
    "sameAs": [
      "https://facebook.com/itclub-butwal",
      "https://linkedin.com/company/itclub-butwal"
    ]
  };

  const educationalOrganizationSchema = {
    "@context": "https://schema.org",
    "@type": "EducationalOrganization",
    "name": "Itclub Butwal Kalika Campus",
    "url": "https://itclub.butwalkalikacampus.edu.np",
    "description": "Learn IT skills and programming at our community",
    "educationalLevel": "Undergraduate",
    "alumniOf": "Kalika Campus"
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(organizationSchema),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(educationalOrganizationSchema),
        }}
      />
    </>
  );
}
