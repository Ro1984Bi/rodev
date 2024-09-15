import { message } from "antd";
import axios from "axios";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { hideLoading, setLoading } from "../../redux/rootSlice";

function LoginPage() {
  const [user, setUser] = useState({
    username: "",
    password: "",
  });
  const dispatch = useDispatch();

  const handleLogin = async () => {
    try {
      dispatch(setLoading());
      const res = await axios.post("/api/portfolio/admin-login", user);
      dispatch(hideLoading());
      if (res.data.success) {
        message.success(res.data.message);
        localStorage.setItem("token", JSON.stringify(res.data));
        window.location.href = "/admin";
      } else {
        message.error(res.data.message);
      }
    } catch (error) {
      message.error(error.message);
      dispatch(hideLoading());
    }
  };
  return (
    <div className=" flex justify-center items-center h-screen bg-primary">
      <div className="w-96 flex gap-5 shadow border border-gray-500 rounded-md p-5 flex-col bg-white">
        <h1 className="text-3xl text-center font-bold">Admin Login</h1>
        <hr />
        <input
          type="text"
          value={user.username}
          onChange={(e) => setUser({ ...user, username: e.target.value })}
          placeholder="Username"
        />
        <input
          type="password"
          value={user.password}
          onChange={(e) => setUser({ ...user, password: e.target.value })}
          placeholder="Password"
        />
        <button className=" bg-primary text-white p-2" onClick={handleLogin}>
          Login
        </button>
      </div>
    </div>
  );
}

export default LoginPage;
