import axios from "axios";
import { API_URL } from "../util/API_URL";

export const getBanners = async () => {
  const response = await axios.get(`${API_URL}/banners`);
  return response.data;
};

export const createBanner = async (formData) => {
  const response = await axios.post(`${API_URL}/banners`, formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
  return response.data;
};

export const updateBanner = async (id, formData) => {
  const response = await axios.post(`${API_URL}/banners/`, formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
  return response.data;
};

export const deleteBanner = async (id) => {
  const response = await axios.delete(`${API_URL}/banners/${id}`);
  return response.data;
};
