import { useEffect } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import Sidebar from "../component/shared/Sidebar/Sidebar";
import Header from "../component/shared/Header/Header";
import { useDispatch } from "react-redux";
import { fetchSlider } from "../services/SliderService";
import { fetchWorkProcess } from "../services/WorkProcessService";
import { fetchProjects } from "../services/ProjectService";
import { fetchServices } from "../services/ServiceService";
import { fetchHome } from "../services/HomeService";
import { fetchCounter } from "../services/CounterService";
import { fetchWhatWeDo } from "../services/WhatWeDoService";
import { handleFetchData as sliderRedux } from "../redux/SliderDataSlice";
import { handleFetchData as workProcessRedux } from "../redux/WorkProcessDataSlice";
import { handleFetchData as projectRedux } from "../redux/ProjectDataSlice";
import { handleFetchData as serviceRedux } from "../redux/ServiceDataSlice";
import {
  handlePostBanner,
  handlePostCounter,
  handlePostWhatWeDo,
} from "../redux/AdminDataSlice";

const RootModule = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    if (!localStorage.getItem("ddlj")) {
      navigate("/signin");
      return;
    }

    // Individual fetch functions with error handling
    const fetchAndDispatchData = async (fetchFn, dispatchFn) => {
      try {
        const response = await fetchFn();
        if (response?.data) {
          dispatch(dispatchFn(response.data));
        }
      } catch (error) {
        console.error(`Error fetching data:`, error);
      }
    };

    // Fetch all data independently
    const fetchAllData = () => {
      // Slider data
      fetchAndDispatchData(fetchSlider, sliderRedux);

      // Work process data
      fetchAndDispatchData(fetchWorkProcess, workProcessRedux);

      // Projects data
      fetchAndDispatchData(fetchProjects, projectRedux);

      // Services data
      fetchAndDispatchData(fetchServices, serviceRedux);

      // Home banner data
      fetchAndDispatchData(fetchHome, handlePostBanner);

      // Counter data
      fetchAndDispatchData(fetchCounter, handlePostCounter);

      // What we do data
      fetchAndDispatchData(fetchWhatWeDo, handlePostWhatWeDo);
    };

    fetchAllData();
  }, [dispatch, navigate]);

  return (
    <div className="main-layout">
      <Sidebar />
      <main className="main-content position-relative max-height-vh-100 h-100 border-radius-lg">
        <Header />
        <Outlet />
      </main>
    </div>
  );
};

export default RootModule;
