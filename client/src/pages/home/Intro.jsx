import { useSelector } from "react-redux";
import Axios from "axios";
import FileDownload from "js-file-download";

function Intro() {
    
  const downloadFile = (e) => { 
    e.preventDefault();
    Axios({
      url: "http://localhost:5000/download",
      method: "GET",
      responseType: "blob",
    }).then((response) => { 
      console.log(response);
      FileDownload(response.data, "resume.pdf");
    });
  }

  const { loading, portfolioData } = useSelector((state) => state.root);
  const { intro } = portfolioData;
  const { firstName, lastName, welcomeText, description, title} = intro;
  return (
    <div className=" h-[80vh] bg-primary flex flex-col items-start justify-center gap-8 py-10">
      <h1 className=" text-white"> {welcomeText || ""} </h1>
      <h1 className=" text-7xl sm:text-3xl text-secondary font-semibold">
        {" "}
        {firstName || ""} {lastName || ""}{" "}
      </h1>
      <h1 className=" text-white text-7xl sm:text-3xl font-semibold">
        {title || ""}
      </h1>
      <p className=" text-white w-2/3">{description || ""}</p>
      <button className=" border-2 border-tertiary text-tertiary px-10 py-3 rounded" onClick={(e)=>downloadFile(e)}>
        Download CV
      </button>
    </div>
  );
}

export default Intro;
