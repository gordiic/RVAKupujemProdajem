import axios from "axios";
import React from "react";

export const mojServis = async () => {
  let data;
  await axios
    .get(`https://localhost:44352/api/values`)
    .then((response) => response.data);
};
