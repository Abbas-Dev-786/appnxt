import { useEffect } from 'react'
import { Outlet } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { fetchSlider } from '../services/SliderService'
import { fetchWorkProcess } from '../services/WorkProcessService'
import { fetchProjects } from '../services/ProjectService'
import { fetchServices } from '../services/ServiceService'
import { fetchHome } from '../services/HomeService'
import { fetchCounter } from '../services/CounterService'
import { fetchWhatWeDo } from '../services/WhatWeDoService'
import { handleFetchData as sliderRedux } from '../redux/SliderDataSlice'
import { handleFetchData as workProcessRedux } from '../redux/WorkProcessDataSlice'
import { handleFetchData as projectRedux } from '../redux/ProjectDataSlice'
import { handleFetchData as serviceRedux } from '../redux/ServiceDataSlice'
import { handlePostBanner, handlePostCounter, handlePostWhatWeDo } from '../redux/AdminDataSlice'


const RootModule = () => {

  const dispatch = useDispatch()


  useEffect(() => {

    // Function to fetch all initial data
    const fetchInitialData = async () => {
      try {
        // Fetch all data in parallel using Promise.all
        const [
          sliderRes,
          workProcessRes,
          projectsRes,
          servicesRes,
          homeRes,
          counterRes,
          whatWeDoRes
        ] = await Promise.all([
          fetchSlider(),
          fetchWorkProcess(),
          fetchProjects(),
          fetchServices(),
          fetchHome(),
          fetchCounter(),
          fetchWhatWeDo()
        ]);

        // Dispatch all successful responses
        if (sliderRes?.success) dispatch(sliderRedux(sliderRes.data));
        if (workProcessRes?.success) dispatch(workProcessRedux(workProcessRes.data));
        if (projectsRes?.success) dispatch(projectRedux(projectsRes.data));
        if (servicesRes?.success) dispatch(serviceRedux(servicesRes.data));
        if (homeRes?.success) dispatch(handlePostBanner(homeRes.data));
        if (counterRes?.success) dispatch(handlePostCounter(counterRes.data));
        if (whatWeDoRes?.success) dispatch(handlePostWhatWeDo(whatWeDoRes.data));

      } catch (error) {
        console.error('Error fetching initial data:', error);
      }
    };

    fetchInitialData();
  }, [dispatch]);

  return (
    <Outlet />
  )
}

export default RootModule