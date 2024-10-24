import axios from "axios";
const baseUrl = "/api/blogs";

let token = null;

const setToken = (newToken) => {
  token = `Bearer ${newToken}`;
};

const getBlogs = async () => {
  const response = await axios.get(baseUrl);
  return response.data;
};

const getBlog = async (id) => {
  const response = await axios.get(`${baseUrl}/${id}`);
  return response.data;
};

const createBlog = async (note) => {
  const response = await axios.post(baseUrl, note, {
    headers: { Authorization: token },
  });
  return response.data;
};

const updateBlog = async (id, note) => {
  const reponse = await axios.put(`${baseUrl}/${id}`, note, {
    headers: { Authorization: token },
  });
  return reponse.data;
};

const deleteBlog = async (id) => {
  const response = await axios.delete(`${baseUrl}/${id}`, {
    headers: { Authorization: token },
  });

  return response.data;
};

export default {
  getBlogs,
  getBlog,
  createBlog,
  updateBlog,
  deleteBlog,
  setToken,
};
