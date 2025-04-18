import { useEffect } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { fetchSlider } from "../services/SliderService";
import { fetchWorkProcess } from "../services/WorkProcessService";
import { fetchProjects } from "../services/ProjectService";
import { fetchCategory, fetchServices } from "../services/ServiceService";
import { fetchHome } from "../services/HomeService";
import { fetchCounter } from "../services/CounterService";
import { fetchWhatWeDo } from "../services/WhatWeDoService";
import { handleFetchData as sliderRedux } from "../redux/SliderDataSlice";
import { handleFetchData as workProcessRedux } from "../redux/WorkProcessDataSlice";
import { handleFetchData as projectRedux } from "../redux/ProjectDataSlice";
import {
  handleFetchCategory,
  handleFetchData as serviceRedux,
} from "../redux/ServiceDataSlice";
import {
  handlePostBanner,
  handlePostCounter,
  handlePostWhatWeDo,
} from "../redux/AdminDataSlice";
import {
  getPortfolioBanner,
  getServiceBanner,
} from "../services/BannerService";
import {
  handleFetchPortfolioBannerData,
  handleFetchServiceBannerData,
} from "../redux/BannerDataSlice";

const RootModule = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
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

      // Category data
      fetchAndDispatchData(fetchCategory, handleFetchCategory);

      // Home banner data
      fetchAndDispatchData(fetchHome, handlePostBanner);

      // Counter data
      fetchAndDispatchData(fetchCounter, handlePostCounter);

      // What we do data
      fetchAndDispatchData(fetchWhatWeDo, handlePostWhatWeDo);

      // banner data
      fetchAndDispatchData(getServiceBanner, handleFetchServiceBannerData);
      fetchAndDispatchData(getPortfolioBanner, handleFetchPortfolioBannerData);
    };

    fetchAllData();
  }, [dispatch, navigate]);

  return <Outlet />;
};

export default RootModule;
