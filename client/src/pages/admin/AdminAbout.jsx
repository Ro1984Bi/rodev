import { Form, message } from "antd";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { setLoading, hideLoading } from "../../redux/rootSlice";

function AdminAbout() {
  const dispatch = useDispatch();
  const { portfolioData } = useSelector((state) => state.root);
  const onFinish = async (values) => {
    try {
      const tempSkills = values.skills.split(",");
      values.skills = tempSkills;
      dispatch(setLoading());
      const res = await axios.post("/api/portfolio/update-about", {
        ...values,
        _id: portfolioData.abouts._id,
      });
      dispatch(hideLoading());
      if (res.data.success) {
        message.success(res.data.message);
      } else {
        message.error(res.data.message);
      }
    } catch (error) {
      dispatch(hideLoading());
      message.error(error.message);
    }
  };
  return (
    <div>
      <Form
        onFinish={onFinish}
        layout="vertical"
        initialValues={{
          ...portfolioData.abouts,
          skills: portfolioData.abouts.skills.join(" , "),
        }}
      >
        <Form.Item name={"lottieUrl"} label="Lottie Url">
          <input placeholder="Lottie Url" />
        </Form.Item>
        <Form.Item name={"description1"} label="Description 1">
          <textarea placeholder="Description 1" />
        </Form.Item>
        <Form.Item name={"description2"} label="Description 2">
          <textarea placeholder="Description 2" />
        </Form.Item>
        <Form.Item name={"skills"} label="Skills">
          <textarea placeholder="Skills" />
        </Form.Item>
        

        <div className="flex justify-end w-full">
          <button
            className=" px-10 py-2 bg-primary text-white rounded-md"
            type="submit"
          >
            Save
          </button>
        </div>
      </Form>
    </div>
  );
}

export default AdminAbout;
