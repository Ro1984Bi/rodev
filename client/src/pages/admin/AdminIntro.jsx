import { Form, message } from "antd";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { setLoading, hideLoading } from "../../redux/rootSlice";

function AdminIntro() {
  const dispatch = useDispatch();
  const { portfolioData } = useSelector((state) => state.root);
  const onFinish = async (values) => {
    try {
      dispatch(setLoading());
      const res = await axios.post("/api/portfolio/update-intro", {
        ...values,
        _id: portfolioData.intro._id,
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
        initialValues={portfolioData.intro}
      >
        <Form.Item name={"welcomeText"} label="Welcome Text">
          <input placeholder="Welcome Text" />
        </Form.Item>
        <Form.Item name={"firstName"} label="First Name">
          <input placeholder="First Name" />
        </Form.Item>
        <Form.Item name={"lastName"} label="Last Name">
          <input placeholder="Last Name" />
        </Form.Item>
        <Form.Item name={"title"} label="Title">
          <input placeholder="Title" />
        </Form.Item>
        <Form.Item name={"description"} label="Description">
          <textarea placeholder="Description" />
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

export default AdminIntro;
