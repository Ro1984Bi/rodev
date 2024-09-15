import { Form, message } from "antd";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { setLoading, hideLoading } from "../../redux/rootSlice";

function AdminContact() {
  const dispatch = useDispatch();
  const { portfolioData } = useSelector((state) => state.root);
  const onFinish = async (values) => {
    try {
      dispatch(setLoading());
      const res = await axios.post("/api/portfolio/update-contact", {
        ...values,
        _id: portfolioData.contacts._id,
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
        initialValues={portfolioData.contacts}
      >
        <Form.Item name={"name"} label="Name">
          <input placeholder="Name" />
        </Form.Item>
        <Form.Item name={"gender"} label="Gender">
          <input placeholder="Gender" />
        </Form.Item>

        <Form.Item name={"age"} label="Age">
          <input placeholder="Age" />
        </Form.Item>
        <Form.Item name={"email"} label="Email">
          <input placeholder="Email" />
        </Form.Item>
        <Form.Item name={"mobile"} label="Mobile">
          <input placeholder="Mobile" />
        </Form.Item>
        <Form.Item name={"address"} label="Address">
          <input placeholder="Address" />
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

export default AdminContact;
