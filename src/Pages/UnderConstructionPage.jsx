import React from "react";
import underContructionImage from "../assets/under_contruction.jpg";

const UnderConstructionPage = () => {
  return (
    <div className="flex items-center justify-center flex-col pt-3">
      <img
        src={underContructionImage}
        alt="Under Construction"
        className={` max-h-[55vh] image-animate`}
      />
      <h2 className="mt-8 text-2xl font-bold mt-10">Page Under Construction</h2>
      <p className="mt-4 mb-10 text-gray-600">
        Working on something awesome. Stay tuned!
      </p>
    </div>
  );
};

export default UnderConstructionPage;
