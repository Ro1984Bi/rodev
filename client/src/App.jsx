import { useEffect } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import axios from "axios";
import Home from "./pages/home/Home";
import Loader from "./components/Loader";
import { useDispatch, useSelector } from "react-redux";

import {
  hideLoading,
  setLoading,
  setPortfolioData,
  reloadData,
} from "./redux/rootSlice";
import AdminPage from "./pages/admin/AdminPage";
import LoginPage from "./pages/admin/LoginPage";

function App() {
  const { loading, portfolioData, reloadData } = useSelector(
    (state) => state.root
  );
  const dispatch = useDispatch();

  useEffect(() => {
    const getPortfolioData = async () => {
      try {
        dispatch(setLoading());
        const res = await axios.get("/api/portfolio/get-portfolio");
        dispatch(setPortfolioData(res.data));
        dispatch(reloadData());
        dispatch(hideLoading());
      } catch (error) {
        dispatch(hideLoading());
        console.log(error);
      }
    };
    if (!portfolioData) {
      getPortfolioData();
    }
  }, [dispatch, portfolioData, reloadData]);

  useEffect(() => {
    const getPortfolioData = async () => {
      try {
        dispatch(setLoading());
        const res = await axios.get("/api/portfolio/get-portfolio");
        dispatch(setPortfolioData(res.data));
        dispatch(hideLoading());
        dispatch(reloadData());
      } catch (error) {
        dispatch(hideLoading());
        console.log(error);
      }
    };
    if (reloadData) {
      getPortfolioData();
    }
  }, [dispatch, reloadData]);

  return (
    <BrowserRouter>
      {loading ? <Loader /> : null}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/admin" element={<AdminPage />} />
        <Route path="/login" element={<LoginPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
