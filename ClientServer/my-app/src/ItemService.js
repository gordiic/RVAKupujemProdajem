import axios from "axios";

export const uploadItem = (upload) => {
  let r;
  return axios
    .post("http://localhost:55647/item/uploadItem", upload)
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

export const get = (id) => {
  let r;
  return axios
    .get("http://localhost:55647/item/get?id=" + id)
    .then((response) => {
      console.log(response.data);
      return response;
    })
    .catch((err) => {
      console.log(err.data);
    });
};

export const getAllItems = () => {
  let r;
  return axios
    .get("http://localhost:55647/item/getAllItems")
    .then((response) => {
      console.log(response.data);
      return response;
    })
    .catch((err) => {
      console.log(err.data);
    });
};

export const changeItem = (upload) => {
  let r;
  return axios
    .post("http://localhost:55647/item/changeItem", upload)
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

export const deleteItem = (id) => {
  let r;
  return axios
    .get("http://localhost:55647/item/deleteItem?id=" + id)
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
