import React, { useState, useEffect } from "react";
import { get } from "./ItemService";
import Oglas from "./Oglas";
import Tabela from "./Tabela";
import {
  Stack,
  Box,
  TableCaption,
  Thead,
  Table,
  Tbody,
  Th,
  Tr,
  Tfoot,
  Button,
  Td,
} from "@chakra-ui/react";
// import {
//   PhoneIcon,
//   AddIcon,
//   WarningIcon,
//   ChevronDownIcon,
//   SearchIcon,
//   EmailIcon,
//   InfoIcon,
//   LockIcon,
// } from "@chakra-ui/icons";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { convertToObject } from "typescript";
const MojiOglasi = () => {
  const [user, setUser] = useState(JSON.parse(localStorage.getItem("user")));
  const [items2, setItems2] = useState([]);
  const [items, setItems] = useState([]);

  // useEffect(() => {
  //   setItems(localStorage.getItem("items"));
  // }, []);
  useEffect(() => {
    // if (items === null) {
    //   localStorage.setItem("items", JSON.stringify(get(user.id)));
    //   //setItems2(JSON.parse(localStorage.getItem("items")));
    //   items = items2;
    // } else {
    //   setItems2(JSON.parse(localStorage.getItem("items")));
    // }
    //const [user, setUser] = useState(localStorage.getItem("user"));

    console.log(items);
    ///if (items === null) {
    get(user.id)
      .then((item) => {
        console.log("then");
        setItems(item.data);
        console.log(item.data);
        localStorage.setItem("items", JSON.stringify(item.data));
      })
      .then(() => {});
    console.log(items);
    //  }
  }, []);
  return <Tabela i={items} />;
};

export default MojiOglasi;
