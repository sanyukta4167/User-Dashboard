import axios from "axios";

const API_URL = "https://jsonplaceholder.typicode.com/users";

export const fetchUsers = () => axios.get(API_URL);

export const deleteUser = (id) => axios.delete(`${API_URL}/${id}`);

export const updateUser = (id, updatedData) =>
  axios.put(`${API_URL}/${id}`, updatedData);
