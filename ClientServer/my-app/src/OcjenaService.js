import axios from "axios";
export const uploadOcjena = (ocjena) => {
  console.log(ocjena);
  let r;
  return axios
    .post("http://localhost:55647/ocjena/uploadOcjena", ocjena)
    .then((response) => {
      const item = response.data;
      r = response.data;
      console.log(item);
      return item;
    })
    .catch((err) => {
      console.log(ocjena);
      console.log(r);
    });
};

export const getOcjeneForUser = (id) => {
  let r;
  return axios
    .get("http://localhost:55647/ocjena/getOcjeneForUser?id=" + id)
    .then((response) => {
      console.log(response.data);
      return response;
    })
    .catch((err) => {
      console.log(err.data);
    });
};
