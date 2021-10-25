import axios from "axios";

const API_URL = "https://workers.aarsh.workers.dev";

const getPost = (id) => axios.get(`${API_URL}/post/${id}`);

const getPosts = () => axios.get(`${API_URL}/posts`);

const submitPost = (json) =>
  axios.post(`${API_URL}/posts`, json, {
    headers: {
      crossDomain: true,
      "Content-Type": "application/json",
    },
  });

const submitComment = (json) =>
  axios.post(`${API_URL}/comment`, json, {
    headers: {
      crossDomain: true,
      "Content-Type": "application/json",
    },
  });

export { getPost, getPosts, submitPost, submitComment };
