import type { Metadata } from "next";
import type { 
  MetadataConfig, 
  PageMetadata, 
  StructuredDataConfig 
} from "@/types/data";
import metadataConfig from "@/data/metadata.json";

/**
 * Get metadata configuration for a specific page
 * @param page - The page name (home, about, blog, contact, projects, layout)
 * @returns PageMetadata configuration
 */
export function getPageMetadata(page: keyof MetadataConfig["pages"]): PageMetadata {
  const config = metadataConfig as MetadataConfig;
  return config.pages[page];
}

/**
 * Get global metadata configuration
 * @returns GlobalMetadata configuration
 */
export function getGlobalMetadata() {
  const config = metadataConfig as MetadataConfig;
  return config.global;
}

/**
 * Get SEO configuration
 * @returns SEOConfig configuration
 */
export function getSEOConfig() {
  const config = metadataConfig as MetadataConfig;
  return config.seo;
}

/**
 * Get structured data configuration
 * @returns StructuredDataConfig
 */
export function getStructuredData(): StructuredDataConfig {
  const config = metadataConfig as MetadataConfig;
  return config.structured_data;
}

/**
 * Generate Next.js Metadata object from PageMetadata
 * @param pageMetadata - Page-specific metadata configuration
 * @returns Next.js Metadata object
 */
export function generateMetadata(pageMetadata: PageMetadata): Metadata {
  const globalConfig = getGlobalMetadata();
  
  return {
    metadataBase: new URL(globalConfig.domain),
    title: pageMetadata.title,
    description: pageMetadata.description,
    keywords: pageMetadata.keywords,
    openGraph: {
      title: pageMetadata.openGraph.title,
      description: pageMetadata.openGraph.description,
      url: pageMetadata.openGraph.url,
      siteName: pageMetadata.openGraph.siteName || globalConfig.siteName,
      images: pageMetadata.openGraph.images.map(img => ({
        url: img.url,
        width: img.width,
        height: img.height,
        alt: img.alt,
      })),
      locale: pageMetadata.openGraph.locale,
      type: (pageMetadata.openGraph.type || "website") as "website" | "article",
    },
    twitter: {
      card: pageMetadata.twitter.card as "summary" | "summary_large_image",
      title: pageMetadata.twitter.title,
      description: pageMetadata.twitter.description,
      images: pageMetadata.twitter.images,
    },
    alternates: pageMetadata.canonical ? {
      canonical: pageMetadata.canonical,
    } : undefined,
  };
}

/**
 * Merge metadata with override values
 * @param base - Base metadata object
 * @param override - Override metadata values
 * @returns Merged metadata object
 */
export function mergeMetadata(
  base: Metadata,
  override: Partial<Metadata>
): Metadata {
  return {
    ...base,
    ...override,
    openGraph: {
      ...base.openGraph,
      ...override.openGraph,
    },
    twitter: {
      ...base.twitter,
      ...override.twitter,
    },
    alternates: {
      ...base.alternates,
      ...override.alternates,
    },
  };
}

/**
 * Generate structured data JSON-LD script content
 * @param type - Type of structured data (person, website, organization, professional_service, faq)
 * @param data - Additional data to merge (optional)
 * @returns JSON string for structured data
 */
export function generateStructuredData(
  type: keyof StructuredDataConfig,
  data?: Record<string, unknown>
): string {
  const structuredData = getStructuredData();
  const baseData = structuredData[type];
  
  const finalData = data ? { ...baseData, ...data } : baseData;
  
  return JSON.stringify(finalData);
}

/**
 * Get metadata with fallback to default values
 * @param page - Page name
 * @returns PageMetadata with fallback
 */
export function getMetadataWithFallback(
  page: keyof MetadataConfig["pages"]
): PageMetadata {
  try {
    return getPageMetadata(page);
  } catch (error) {
    console.error(`Failed to load metadata for page: ${page}`, error);
    
    // Return default metadata as fallback
    const seoConfig = getSEOConfig();
    const globalConfig = getGlobalMetadata();
    
    return {
      title: seoConfig.defaultTitle,
      description: seoConfig.defaultDescription,
      keywords: seoConfig.keywords,
      openGraph: {
        title: seoConfig.defaultTitle,
        description: seoConfig.defaultDescription,
        url: globalConfig.domain,
        images: [{
          url: globalConfig.defaultImage,
          width: 800,
          height: 600,
          alt: `${globalConfig.author} - Portfolio`
        }]
      },
      twitter: {
        card: "summary_large_image",
        title: seoConfig.defaultTitle,
        description: seoConfig.defaultDescription,
        images: [globalConfig.defaultImage]
      },
      canonical: globalConfig.domain
    };
  }
}

/**
 * Validate metadata configuration
 * @param metadata - Metadata to validate
 * @returns Validation result
 */
export function validateMetadata(metadata: PageMetadata): {
  isValid: boolean;
  errors: string[];
} {
  const errors: string[] = [];
  
  if (!metadata.title || metadata.title.length < 10) {
    errors.push("Title must be at least 10 characters long");
  }
  
  if (!metadata.description || metadata.description.length < 50) {
    errors.push("Description must be at least 50 characters long");
  }
  
  if (!metadata.keywords || metadata.keywords.length === 0) {
    errors.push("Keywords array cannot be empty");
  }
  
  if (!metadata.openGraph?.title) {
    errors.push("OpenGraph title is required");
  }
  
  if (!metadata.twitter?.title) {
    errors.push("Twitter title is required");
  }
  
  return {
    isValid: errors.length === 0,
    errors
  };
}