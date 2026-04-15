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
      className="w-full py-16 md:py-24 px-6 bg-primary-700 content-visibility-auto">
      <div className="max-w-7xl mx-auto">
        <div className="[&_h2]:!text-white [&_p]:!text-primary-100 [&_.bg-primary-50]:!bg-white/10 [&_.text-primary-600]:!text-white [&_.bg-primary-500]:!bg-white">
          <SectionTitle
            title={funFacts.title}
            icon={
              <FaChessKing className="text-white text-2xl" />
            }>
            {funFacts.subtitle}
          </SectionTitle>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6 sm:overflow-x-auto py-8 -my-8 px-4 -mx-4 sm:px-0 sm:-mx-0">
          {funFacts.items.map((fact, index) => (
            <FunfactCard key={index} fact={fact} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default FunFact;
