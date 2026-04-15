import React from "react";
import { FiMail, FiDownload } from "react-icons/fi";
import Btn from "@/components/global/Btn";

const BannerButtons: React.FC = () => (
  <div className="flex flex-wrap items-center gap-4">
    <Btn variant="primary" as="link" href="/contact">
      <FiMail aria-hidden="true" focusable="false" />
      Contact Me
    </Btn>

    <Btn variant="secondary" as="a" href="/resume.pdf">
      <FiDownload aria-hidden="true" focusable="false" />
      View Resume
    </Btn>
  </div>
);

export default BannerButtons;
