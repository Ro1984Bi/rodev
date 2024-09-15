import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Form, message, Modal } from "antd";
import axios from "axios";
import { hideLoading, reloadData, setLoading } from "../../redux/rootSlice";

function AdminExperience() {
  const dispatch = useDispatch();
  const { portfolioData } = useSelector((state) => state.root);
  const { experiences } = portfolioData;
  const [showEditModal, setShowEditModal] = useState(false);
  const [selectedItemForEdit, setSelectedItemForEdit] = useState(null);
  const [type, setType] = useState("add");
  const [form] = Form.useForm();

  const onFinish = async (values) => {
    try {
      dispatch(setLoading());
      let res;
      if (selectedItemForEdit) {
        res = await axios.post("/api/portfolio/update-experience", {
          ...values,
          _id: selectedItemForEdit._id,
        });
      } else {
        res = await axios.post("/api/portfolio/add-experience", values);
      }

      dispatch(hideLoading());
      if (res.data.success) {
        message.success(res.data.message);
        setShowEditModal(false);
        setSelectedItemForEdit(null);
        dispatch(hideLoading());
        dispatch(reloadData(true));
        form.resetFields();
      } else {
        message.error(res.data.message);
      }
    } catch (error) {
      dispatch(hideLoading());
      message.error(error.message);
    }
  };

  const onDelete = async (item) => {
    try {
      dispatch(setLoading());
      const res = await axios.post("/api/portfolio/delete-experience", {
        _id: item._id,
      });
      dispatch(hideLoading());
      if (res.data.success) {
        message.success(res.data.message);
        dispatch(hideLoading());

        dispatch(reloadData(true));
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
      <div className="flex justify-end">
        <button
          className=" bg-primary text-white px-5 py-2"
          onClick={() => {
            setShowEditModal(true);
            setSelectedItemForEdit(null);
          }}
        >
          Add Experience
        </button>
      </div>
      <div className=" grid grid-cols-4 gap-5 mt-5 sm:grid-cols-1">
        {experiences.map((experience, index) => (
          <div
            key={index}
            className=" shadow border p-5 border-gray-400 flex flex-col"
          >
            <h1 className=" text-primary font-bold text-xl">
              {experience.period}
            </h1>
            <hr />
            <h1>Company : {experience.company}</h1>

            <h1>Role : {experience.title}</h1>
            <h1>{experience.description}</h1>
            <div className=" flex justify-end gap-5 mt-5">
              <button
                className=" bg-red-500 text-white px-5 py-2"
                onClick={() => onDelete(experience)}
              >
                Delete
              </button>
              <button
                className=" bg-primary text-white px-5 py-2"
                onClick={() => {
                  setSelectedItemForEdit(experience);
                  setShowEditModal(true);
                  setType("edit");
                }}
              >
                Edit
              </button>
            </div>
          </div>
        ))}
      </div>
      {(type === "add" || selectedItemForEdit) && (
        <Modal
          visible={showEditModal}
          title={selectedItemForEdit ? "Edit Experience" : "Add Experience"}
          footer={null}
          onCancel={() => {
            setShowEditModal(false);
            setSelectedItemForEdit(null);
          }}
        >
          <Form
            form={form}
            layout="vertical"
            onFinish={onFinish}
            initialValues={selectedItemForEdit || {}}
          >
            <Form.Item label="Period" name={"period"}>
              <input placeholder="Period" />
            </Form.Item>
            <Form.Item label="Company" name={"company"}>
              <input placeholder="Company" />
            </Form.Item>
            <Form.Item label="Title" name={"title"}>
              <input placeholder="Title" />
            </Form.Item>
            <Form.Item label="Description" name={"description"}>
              <input placeholder="Description" />
            </Form.Item>
            <div className="flex">
              <button
                className=" border-primary text-primary px-5 py-2"
                onClick={() => {
                  setShowEditModal(false);
                }}
              >
                Cancel
              </button>
              <button className=" bg-primary text-white px-5 py-2">
                {selectedItemForEdit ? "Update" : "Add"}
              </button>
            </div>
          </Form>
        </Modal>
      )}
    </div>
  );
}

export default AdminExperience;
