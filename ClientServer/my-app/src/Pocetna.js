import React, { useState, useEffect } from "react";
import { Box, Flex, Image, useColorMode, Stack } from "@chakra-ui/react";
import {
  PhoneIcon,
  AddIcon,
  WarningIcon,
  ChevronDownIcon,
  SearchIcon,
} from "@chakra-ui/icons";
import Pretrazivanje from "./Pretrazivanje";
import { getAllItems } from "./ItemService";
import Tabela from "./Tabela";

import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
const Pocetna = () => {
  const { colorMode } = useColorMode();
  const [items, setItems] = useState([]);
  const [items2, setItems2] = useState([]);
  const [pretraga, setPretraga] = useState({
    searchInd: false,
    search: "",
    kategorija: "",
    mjestoGrad: "",
    sortiraj: "",
    min: "0",
    max: "0",
    samoSaCijenom: true,
    besplatno: true,
    fiksno: true,
    mogucaZamjena: true,
  });
  useEffect(() => {
    console.log(items);
    getAllItems()
      .then((item) => {
        console.log("then");
        setItems(item.data);
        setItems2(item.data);
        console.log(item.data);
        localStorage.setItem("items", JSON.stringify(item.data));
      })
      .then(() => {});
    console.log(items);
  }, []);

  useEffect(() => {
    setItems2(items);
    if (pretraga.search && pretraga.searchInd) {
      var it = items;
      it = it.filter((x) =>
        x.naslov.toLowerCase().includes(pretraga.search.toLowerCase())
      );
      setItems2(it);
    } else if (pretraga.search === "" && pretraga.searchInd) {
      console.log(items);
    } else {
      console.log(pretraga);
      var it = items;
      if (pretraga.kategorija !== "") {
        console.log("uso");
        it = it.filter((x) => x.kategorija === pretraga.kategorija);
      }
      if (pretraga.mjestoGrad !== "") {
        it = it.filter((x) => x.mjestoGrad === pretraga.mjestoGrad);
      }
      if (pretraga.min !== "0" && pretraga.min !== "") {
        it = it.filter((x) => parseInt(x.cijena) >= parseInt(pretraga.min));
      }
      if (pretraga.max !== "0" && pretraga.max !== "") {
        it = it.filter((x) => parseInt(x.cijena) <= parseInt(pretraga.max));
      }
      if (pretraga.mogucaZamjena) {
        it = it.filter((x) => x.prihvatamZamjenu === true);
      }
      if (pretraga.fiksno) {
        console.log("usao u if");
        console.log(pretraga.fiksno);
        it = it.filter((x) => x.fiksno === true);
      }
      if (pretraga.sortiraj !== "") {
        if (pretraga.sortiraj === "skuplje") {
          it.sort((a, b) =>
            parseInt(a.cijena) < parseInt(b.cijena)
              ? 1
              : parseInt(b.cijena) < parseInt(a.cijena)
              ? -1
              : 0
          );
        } else if (pretraga.sortiraj === "jeftinije") {
          it.sort((a, b) =>
            parseInt(a.cijena) > parseInt(b.cijena)
              ? 1
              : parseInt(b.cijena) > parseInt(a.cijena)
              ? -1
              : 0
          );
        }
      }
      // setItems2(items);
      // if (pretraga.kategorija !== "") {
      //   console.log("uso");
      //   setItems2(items2.filter((x) => x.kategorija === pretraga.kategorija));
      // }
      // if (pretraga.mjestoGrad !== "") {
      //   setItems2(items2.filter((x) => x.mjestoGrad === pretraga.mjestoGrad));
      // }
      // if (pretraga.min !== "0" && pretraga.min !== "") {
      //   setItems2(
      //     items2.filter((x) => parseInt(x.cijena) >= parseInt(pretraga.min))
      //   );
      // }
      // if (pretraga.max !== "0" && pretraga.max !== "") {
      //   setItems2(
      //     items2.filter((x) => parseInt(x.cijena) <= parseInt(pretraga.max))
      //   );
      // }
      // if (pretraga.mogucaZamjena) {
      //   setItems2(items2.filter((x) => x.prihvatamZamjenu === true));
      // }
      // if (pretraga.fiksno) {
      //   console.log("usao u if");
      //   console.log(pretraga.fiksno);
      //   setItems2(items2.filter((x) => x.fiksno === true));
      // }
      // if (pretraga.sortiraj !== "") {
      //   if (pretraga.sortiraj === "skuplje") {
      //     items2.sort((a, b) =>
      //       parseInt(a.cijena) > parseInt(b.cijena)
      //         ? 1
      //         : parseInt(b.cijena) > parseInt(a.cijena)
      //         ? -1
      //         : 0
      //     );
      //   } else if (pretraga.sortiraj === "jeftinije") {
      //     items2.sort((a, b) =>
      //       parseInt(a.cijena) < parseInt(b.cijena)
      //         ? 1
      //         : parseInt(b.cijena) < parseInt(a.cijena)
      //         ? -1
      //         : 0
      //     );
      //   }
      // }
      setItems2(it);
    }
    console.log(items2);
  }, [pretraga]);
  return (
    <Flex>
      <Stack direction="column" alignContent="top">
        <Pretrazivanje fun={setPretraga} />
        <Tabela i={items2} />
      </Stack>
    </Flex>
  );
};

export default Pocetna;
