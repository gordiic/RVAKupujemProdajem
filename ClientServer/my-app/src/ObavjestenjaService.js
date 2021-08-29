import axios from "axios";
export const uploadObavjestenje = (notification) => {
  let r;
  return axios
    .post(
      "http://localhost:55647/obavjestenja/uploadObavjestenje",
      notification
    )
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

export const getObavjestenjaForUser = (id) => {
  let r;
  return axios
    .get("http://localhost:55647/obavjestenja/getObavjestenjaForUser?id=" + id)
    .then((response) => {
      console.log(response.data);
      return response;
    })
    .catch((err) => {
      console.log(err.data);
    });
};

export const ObrisiObavjestenje = (id) => {
  let r;
  return axios
    .get("http://localhost:55647/obavjestenja/obrisiObavjestenje?id=" + id)
    .then((response) => {
      console.log(response.data);
      return response;
    })
    .catch((err) => {
      console.log(err.data);
    });
};
