import axios from "axios";
export const register = (person) => {
  let r;
  return axios
    .post("http://localhost:55647/user/register", person)
    .then((response) => {
      const item = response.data;
      r = response.data;
      console.log(item);
      return item;
    })
    .catch((err) => {
      console.log(r);
    });
};

export const login = (person) => {
  let r;
  return axios
    .post("http://localhost:55647/user/login", person)
    .then((response) => {
      const item = response.data;
      r = response.data;
      console.log(item);
      return item;
    })
    .catch((err) => {
      console.log(r);
    });
};

export const changeAccount = (person) => {
  let r;
  return axios
    .post("http://localhost:55647/user/changeAccount", person)
    .then((response) => {
      const item = response.data;
      r = response.data;
      console.log(item);
      return item;
    })
    .catch((err) => {
      console.log(r);
    });
};

export const getUserById = (id) => {
  let r;
  return axios
    .get("http://localhost:55647/user/getUserById?id=" + id)
    .then((response) => {
      console.log(response.data);
      return response;
    })
    .catch((err) => {
      console.log(err.data);
    });
};

export const getAllUsers = () => {
  let r;
  return axios
    .get("http://localhost:55647/user/getAllUsers")
    .then((response) => {
      console.log(response.data);
      return response.data;
    })
    .catch((err) => {
      console.log(err.data);
    });
};

export const deleteUser = (id) => {
  let r;
  return axios
    .get("http://localhost:55647/user/deleteUser?id=" + id)
    .then((response) => {
      const item = response.data;
      r = response.data;
      console.log(item);
      return item;
    })
    .catch((err) => {
      console.log(err.data);
    });
};
