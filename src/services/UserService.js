import http from "../http-common";

const getAll = () => {
  return http.get("/users");
};

const get = id => {
  return http.get(`/users/${id}`);
};

const create = data => {
  return http.post("/users", data);
};

const update = (id, data) => {
  return http.put(`/users/${id}`, data);
};

const remove = id => {
  return http.delete(`/users/${id}`);
};

const removeAll = () => {
  return http.delete(`/users`);
};

const findByUsername = userName => {
  return http.get(`/users?userName=${userName}`);
};

const UserService = {
  getAll,
  get,
  create,
  update,
  remove,
  removeAll,
  findByUsername
};

export default UserService;