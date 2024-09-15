import { useState } from "react";
import SectionTitle from "../../components/SectionTitle";
import { useSelector } from "react-redux";

function Projects() {
  const [selectedProject, setSelectedProject] = useState(0);
  const { portfolioData } = useSelector((state) => state.root);
  const { projects } = portfolioData;
  return (
    <div>
      <SectionTitle title="Projects" />

      <div className="flex py-10 gap-20 sm:flex-col">
        <div className=" flex flex-col gap-10 border-l- border-[#135e4c82] w-1/3 sm:flex-row sm:overflow-x-scroll sm:w-full">
          {projects.map((project, index) => (
            <div
              key={index}
              className=" cursor-pointer"
              onClick={() => setSelectedProject(index)}
            >
              <h1
                className={`text-xl p-5 ${
                  selectedProject === index
                    ? "text-tertiary border-tertiary border-l-4 -ml-[3px] bg-[#1a7f5a5f] py-3 sm:w-40"
                    : "text-white"
                }`}
              >
                {project.title}
              </h1>
            </div>
          ))}
        </div>
        <a href={projects[selectedProject].link} target="_blank">
          <div className=" flex items-center justify-center gap-10 sm:flex-col">
            <img
              src={projects[selectedProject].image}
              alt="project-image"
              className=" h-60 w-72"
            />
            <div className=" flex flex-col gap-5">
              <h1 className=" text-secondary text-xl">
                {projects[selectedProject].title}
              </h1>
              <p className=" text-white">
                {" "}
                {projects[selectedProject].description}{" "}
              </p>

              <p className=" text-white">
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Tempore
                quam natus sit nemo voluptate odit fuga? Blanditiis dignissimos
                sed voluptatum cupiditate cum quas non illum nemo voluptas
                fugit! Optio, error.
              </p>
            </div>
          </div>
        </a>
      </div>
    </div>
  );
}

export default Projects;
