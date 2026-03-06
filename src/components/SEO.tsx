import { Helmet } from "react-helmet-async";

interface SEOProps {
  title?: string;
  description?: string;
  keywords?: string;
  image?: string;
  url?: string;
  type?: string;
}

const SEO = ({
  title = "Nguyễn Gia Đạt - Frontend Developer & AI Enthusiast",
  description = "Lập trình viên Frontend chuyên nghiệp với kinh nghiệm về React, TypeScript, AI và Machine Learning. Founder của Ninja AI - chương trình đào tạo lập trình viên AI.",
  keywords = "frontend developer, react developer, typescript, AI, machine learning, ninja ai, web development, lập trình viên, Nguyễn Gia Đạt",
  image = "/favicon.png",
  url = "https://nguyengiadat.com",
  type = "website",
}: SEOProps) => {
  const siteTitle = title.includes("Nguyễn Gia Đạt")
    ? title
    : `${title} | Nguyễn Gia Đạt`;

  return (
    <Helmet>
      {/* Primary Meta Tags */}
      <title>{siteTitle}</title>
      <meta name="title" content={siteTitle} />
      <meta name="description" content={description} />
      <meta name="keywords" content={keywords} />
      <meta name="author" content="Nguyễn Gia Đạt" />
      <meta name="robots" content="index, follow" />
      <meta name="language" content="Vietnamese" />
      <meta name="revisit-after" content="7 days" />

      {/* Open Graph / Facebook */}
      <meta property="og:type" content={type} />
      <meta property="og:url" content={url} />
      <meta property="og:title" content={siteTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={image} />
      <meta property="og:site_name" content="Nguyễn Gia Đạt Portfolio" />
      <meta property="og:locale" content="vi_VN" />

      {/* Twitter */}
      <meta property="twitter:card" content="summary_large_image" />
      <meta property="twitter:url" content={url} />
      <meta property="twitter:title" content={siteTitle} />
      <meta property="twitter:description" content={description} />
      <meta property="twitter:image" content={image} />
      <meta name="twitter:creator" content="@nguyengiadat" />

      {/* Additional Meta Tags */}
      <meta name="theme-color" content="#22c55e" />
      <meta name="msapplication-TileColor" content="#22c55e" />
      <link rel="canonical" href={url} />

      {/* Structured Data */}
      <script type="application/ld+json">
        {JSON.stringify({
          "@context": "https://schema.org",
          "@type": "Person",
          name: "Nguyễn Gia Đạt",
          url: url,
          image: image,
          jobTitle: "Frontend Developer & AI Enthusiast",
          worksFor: {
            "@type": "Organization",
            name: "Ninja AI",
          },
          sameAs: [
            "https://github.com/nguyengiadat03",
            "https://www.facebook.com/nguyen.gia.at.773139",
            "https://linkedin.com/in/nguyengiadat",
          ],
          knowsAbout: [
            "Frontend Development",
            "React",
            "TypeScript",
            "Artificial Intelligence",
            "Machine Learning",
            "Web Development",
          ],
        })}
      </script>
    </Helmet>
  );
};

export default SEO;
