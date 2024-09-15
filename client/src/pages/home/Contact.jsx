import SectionTitle from "../../components/SectionTitle";
import { Player } from "@lottiefiles/react-lottie-player";
import { useSelector } from "react-redux";

function Contact() {
  const { portfolioData } = useSelector((state) => state.root);
  const { contacts } = portfolioData;
  return (
    <div>
      <SectionTitle title="Contact" />

      <div className="flex sm:flex-col items-center justify-between">
        <div className="flex flex-col gap-1">
          <p className=" text-tertiary"> {"{"} </p>
          {Object.keys(contacts).map(
            (key) =>
              key !== "_id" && (
                <h1 key={key} className=" ml-5">
                  <span className="text-tertiary"> {key} : </span>
                  <span className="text-tertiary"> {contacts[key]} </span>
                </h1>
              )
          )}
          <p className=" text-tertiary"> {"}"} </p>
        </div>
        <div className=" h-[400px]">
          <Player
            src="https://assets9.lottiefiles.com/packages/lf20_eroqjb7w.json"
            background="transparent"
            speed={1}
            loop
            autoplay
            style={{ height: "420px", width: "420px" }}
          />
        </div>
      </div>
    </div>
  );
}

export default Contact;
