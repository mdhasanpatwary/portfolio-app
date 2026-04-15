import { FC } from "react";
import type { Metadata } from "next";
import Tools from "@/components/tools/Tools";
import { tools } from "@/data";
import metadataConfig from "@/data/metadata.json";
import type { MetadataConfig } from "@/types/data";
import PageTitle from "@/components/global/PageTitle";
import { FaTools } from "react-icons/fa";

const typedMetadata = metadataConfig as MetadataConfig;
const toolsMetadata = typedMetadata.pages.tools;

export const metadata: Metadata = {
  title: toolsMetadata.title,
  description: toolsMetadata.description,
  keywords: toolsMetadata.keywords,
  openGraph: {
    title: toolsMetadata.openGraph.title,
    description: toolsMetadata.openGraph.description,
    url: toolsMetadata.alternates?.canonical || "https://patwary.vercel.app/tools",
  },
  alternates: {
    canonical: "/tools",
  },
};

const ToolsPage: FC = () => {
  return (
    <>
      <PageTitle
        title={tools.title}
        subtitle={tools.subtitle}
        icon={<FaTools className="text-primary-600 dark:text-primary-400 text-3xl" />}
        breadcrumb={[{ label: "Home", href: "/" }, { label: "Tools" }]}
      />
      <Tools toolsData={tools} />
    </>
  );
};

export default ToolsPage;
