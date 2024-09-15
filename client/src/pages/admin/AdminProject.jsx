import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Form, message, Modal } from "antd";
import axios from "axios";
import { hideLoading, reloadData, setLoading } from "../../redux/rootSlice";

function AdminProject() {
  const dispatch = useDispatch();
  const { portfolioData } = useSelector((state) => state.root);
  const { projects } = portfolioData;
  const [showEditModal, setShowEditModal] = useState(false);
  const [selectedItemForEdit, setSelectedItemForEdit] = useState(null);
  const [type, setType] = useState("add");
  const [form] = Form.useForm();

  const onFinish = async (values) => {
    try {
      const tempTechnologies = values?.technologies?.split(",") || [];
      values.technologies = tempTechnologies;
      dispatch(setLoading());
      let res;
      if (selectedItemForEdit) {
        res = await axios.post("/api/portfolio/update-project", {
          ...values,
          _id: selectedItemForEdit._id,
        });
      } else {
        res = await axios.post("/api/portfolio/add-project", values);
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
      const res = await axios.post("/api/portfolio/delete-project", {
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
          Add Project
        </button>
      </div>
      <div className=" grid grid-cols-3 gap-5 mt-5 sm:grid-cols-1">
        {projects.map((project, index) => (
          <div
            key={index}
            className=" shadow border p-5 border-gray-400 flex flex-col gap-5"
          >
            <h1 className=" text-primary font-bold text-xl">{project.title}</h1>
            <hr />
            <img
              src={project.image}
              alt="project image"
              className=" h-60 w-80"
            />

            <h1>Description : {project.description}</h1>

            <div className=" flex justify-end gap-5 mt-5">
              <button
                className=" bg-red-500 text-white px-5 py-2"
                onClick={() => onDelete(project)}
              >
                Delete
              </button>
              <button
                className=" bg-primary text-white px-5 py-2"
                onClick={() => {
                  setSelectedItemForEdit(project);
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
          title={selectedItemForEdit ? "Edit Project" : "Add Project"}
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
            initialValues={
              // eslint-disable-next-line no-constant-binary-expression
              {
                ...selectedItemForEdit,
                technologies: selectedItemForEdit?.technologies?.join(" , "),
              } || {}
            }
          >
            <Form.Item label="Title" name={"title"}>
              <input placeholder="Title" />
            </Form.Item>
            <Form.Item label="Image" name={"image"}>
              <input placeholder="Image" />
            </Form.Item>

            <Form.Item label="Description" name={"description"}>
              <textarea placeholder="Description" />
            </Form.Item>
            <Form.Item label="Link" name={"link"}>
              <input placeholder="Link" />
            </Form.Item>
            <Form.Item label="Technologies" name={"technologies"}>
              <input placeholder="Technologies" />
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

export default AdminProject;
