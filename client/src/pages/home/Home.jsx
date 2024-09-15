import { useSelector } from "react-redux";
import Header from "../../components/Header";
import About from "./About";
import Contact from "./Contact";
import Experiences from "./Experiences";
import Footer from "./Footer";
import Intro from "./Intro";
import LeftIcons from "./LeftIcons";
import Projects from "./Projects";

function Home() {
  const { portfolioData } = useSelector((state) => state.root);
  return (
    <div>
      <Header />
      {portfolioData && (
        <div className=" bg-primary px-40 sm:px-5">
          <Intro />
          <About />
          <Experiences />
          <Projects />
          <Contact />
          <Footer />
          <LeftIcons />
        </div>
      )}
    </div>
  );
}

export default Home;
