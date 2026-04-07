import { FC } from "react";
import type { Metadata } from "next";
import Tools from "@/components/tools/Tools";
import { tools } from "@/data";
import metadataConfig from "@/data/metadata.json";
import type { MetadataConfig } from "@/types/data";

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
    <div className="pt-20">
      <Tools toolsData={tools} />
    </div>
  );
};

export default ToolsPage;
