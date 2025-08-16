import { FC } from "react";
import { FunFacts } from "@/types/data";
import SectionTitle from "@/components/global/SectionTitle";
import { FaChessKing } from "react-icons/fa";
import FunfactCard from "./FunfactCard";

type FunFactProps = { funFacts: FunFacts };

const FunFact: FC<FunFactProps> = ({ funFacts }) => {
  return (
    <section
      id="funfact"
      className="w-full py-16 md:py-24 px-6 bg-gradient-to-br from-primary-50 via-white to-primary-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
      <div className="max-w-7xl mx-auto">
        <SectionTitle
          title={funFacts.title}
          icon={
            <FaChessKing className="text-primary-600 dark:text-primary-400 text-3xl" />
          }>
          {funFacts.subtitle}
        </SectionTitle>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6 sm:overflow-x-auto">
          {funFacts.items.map((fact, index) => (
            <FunfactCard key={index} fact={fact} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default FunFact;
