import Header from "../../components/Header";

import { Tabs } from "antd";
import AdminIntro from "./AdminIntro";
import AdminAbout from "./AdminAbout";
import { useSelector } from "react-redux";
import AdminExperience from "./AdminExperience";
import AdminProject from "./AdminProject";
import AdminContact from "./AdminContact";
import { useEffect } from "react";
const { TabPane } = Tabs;

function AdminPage() {
  const { portfolioData } = useSelector((state) => state.root);

  useEffect(() => {
    if (!localStorage.getItem("token")) {
      window.location.href = "/login";
    }
  }, []);

  return (
    <div>
      <Header />
      <div className=" flex gap-10 items-center px-5 py-2 justify-between">
        <div className="flex gap-10 items-center">
          <h1 className=" text-3xl text-primary">Admin Dashboard</h1>
          <div className=" w-60 h-[1px] bg-gray-500"></div>
        </div>
        <h1
          className="underline text-primary text-xl cursor-pointer"
          onClick={() => {
            localStorage.removeItem("token");
            window.location.href = "/login";
          }}
        >
          Logout
        </h1>
      </div>

      {portfolioData && (
        <div className=" px-5 pb-10">
          <Tabs defaultActiveKey="1">
            <TabPane tab="Intro" key="1">
              <AdminIntro />
            </TabPane>
            <TabPane tab="About" key="2">
              <AdminAbout />
            </TabPane>
            <TabPane tab="Experience" key="3">
              <AdminExperience />
            </TabPane>
            <TabPane tab="Projects" key="4">
              <AdminProject />
            </TabPane>
            <TabPane tab="Contact" key="5">
              <AdminContact />
            </TabPane>
          </Tabs>
        </div>
      )}
    </div>
  );
}

export default AdminPage;
