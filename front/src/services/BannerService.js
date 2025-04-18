import { API_URL } from "../util/API_URL";
import axios from "axios";

const getServiceBanner = async () => {
  const response = await axios.get(`${API_URL}/banners/projects`);
  return response.data;
};

const getPortfolioBanner = async () => {
  const response = await axios.get(`${API_URL}/banners/services`);
  return response.data;
};

export { getServiceBanner, getPortfolioBanner };
