import { useSelector } from "react-redux";
import SectionTitle from "../../components/SectionTitle";
import { useState } from "react";

function Experiences() {
  const [selectedPeriod, setSelectedPeriod] = useState(0);
  const { portfolioData } = useSelector((state) => state.root);
  const { experiences } = portfolioData;
  return (
    <div>
      <SectionTitle title="Experiences" />
      <div className="flex py-10 gap-20 sm:flex-col">
        <div className=" flex flex-col gap-10 border-l- border-[#135e4c82] w-1/3 sm:flex-row sm:overflow-x-scroll sm:w-full">
          {experiences.map((experience, index) => (
            <div
              key={index}
              className=" cursor-pointer"
              onClick={() => setSelectedPeriod(index)}
            >
              <h1
                className={`text-xl p-5 ${
                  selectedPeriod === index
                    ? "text-tertiary border-tertiary border-l-4 -ml-[3px] bg-[#1a7f5a5f] py-3 sm:w-40"
                    : "text-white"
                }`}
              >
                {experience.period}
              </h1>
            </div>
          ))}
        </div>
        <div className=" flex flex-col gap-5">
          <h1 className=" text-secondary text-xl">
            {experiences[selectedPeriod].title}
          </h1>
          <h1 className=" text-tertiary text-xl">
            {experiences[selectedPeriod].company}
          </h1>
          <p className=" text-white">
            {experiences[selectedPeriod].description}
          </p>
        </div>
      </div>
    </div>
  )
}

export default Experiences;
