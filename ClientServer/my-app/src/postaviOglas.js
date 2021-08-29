import React, { useState, useEffect } from "react";
import { uploadItem, get } from "./ItemService";
import {
  Box,
  Flex,
  Image,
  useColorMode,
  Stack,
  Text,
  Tab,
  TabPanel,
  TabPanels,
  Tabs,
  TabList,
  Input,
  Select,
  Button,
  RadioGroup,
  Radio,
  Checkbox,
  Alert,
  Center,
  AlertIcon,
} from "@chakra-ui/react";
import {
  PhoneIcon,
  AddIcon,
  WarningIcon,
  ChevronDownIcon,
  SearchIcon,
  ArrowRightIcon,
} from "@chakra-ui/icons";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Kategorije from "./kategorije.json";
import Mjesta from "./mjesto.json";
const PostaviOglas = () => {
  let logs = JSON.parse(localStorage.getItem("logs"));

  const [user, setUser] = useState(JSON.parse(localStorage.getItem("user")));
  const { colorMode } = useColorMode();
  const [radio, setRadio] = React.useState("nudim");
  const [message, setMessage] = useState("");
  const [unos, setUnos] = useState({
    userId: user.id,
    userName: user.korisnickoIme,
    id: 0,
    naslov: "",
    kategorija: "",
    nudimTrazim: "nudim",
    cijena: 0,
    fiksno: false,
    prihvatamZamjenu: false,
    tekstOglasa: "",
    //dodajteSlike: "",
    mjestoGrad: "",
    telefon: "",
  });

  useEffect(() => {
    setUnos({ ...unos, ["nudimTrazim"]: radio });
    console.log(unos);
  }, [radio]);
  const handleChange = (e) => {
    const name = e.target.name; //atribut u tagu, da li je to email, godine ili ime
    console.log(e.target.name);
    if (name === "prihvatamZamjenu" || name === "fiksno") {
      const value = e.target.checked;
      setUnos({ ...unos, [name]: value }); //person su prazna polja ukoliko nije nista proslijedjeno na unosu
    } else {
      const value = e.target.value;
      setUnos({ ...unos, [name]: value }); //person su prazna polja ukoliko nije nista proslijedjeno na unosu
    }
    console.log(unos);
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    //get();

    if (
      unos.naslov === "" ||
      unos.kategorija === "" ||
      unos.nudimTrazim === "" ||
      unos.cijena === 0 ||
      unos.tekstOglasa === "" ||
      //unos.dodajteSlike === "" ||
      unos.mjestoGrad === "" ||
      unos.telefon === "" ||
      unos.grupa === ""
    ) {
      setMessage("Nisu uneseni svi parametri.");
    } else {
      // setUnos({ ...unos, ["userId"]: user.id });
      console.log(unos.userId);
      setMessage("");
      uploadItem(unos).then((item) => {
        logs = JSON.parse(localStorage.getItem("logs"));
        var date = new Date();
        logs.push({
          datum:
            date.getDate() +
            "/" +
            (date.getMonth() + 1) +
            "/" +
            date.getFullYear(),
          vrijeme:
            date.getHours() +
            "h " +
            date.getMinutes() +
            "m " +
            date.getSeconds() +
            "s",
          poruka: item,
        });

        window.localStorage.setItem("logs", JSON.stringify(logs));
        alert(item);
      });
      setRadio("nudim");
      setUnos({
        userId: user.id,
        userName: user.korisnickoIme,
        id: 0,
        naslov: "",
        kategorija: "",
        nudimTrazim: "nudim",
        cijena: 0,
        fiksno: false,
        prihvatamZamjenu: false,
        tekstOglasa: "",
        //dodajteSlike: "",
        mjestoGrad: "",
        telefon: "",
      });
    }
    console.log(unos);
  };

  return (
    <Box margin="4">
      <Flex>
        <Stack direction="column">
          <form action="submit">
            <Stack
              direction="row"
              border="1px"
              borderColor="gray.300"
              padding={2}
              borderRadius="lg"
            >
              <Text> Sta se oglasava?</Text>
              <Input
                type="text"
                name="naslov"
                id="naslov"
                value={unos.naslov}
                onChange={handleChange}
                placeholder="Naslov"
                variant="filled"
                textColor="black"
              />
            </Stack>
            <Stack
              direction="row"
              border="1px"
              borderColor="gray.300"
              padding={2}
              borderRadius="lg"
            >
              <Text>Kategorija</Text>
              <Select
                size="xs"
                placeholder="Odaberi"
                name="kategorija"
                onChange={handleChange}
              >
                {Kategorije.map((kategorija) => {
                  const { id, naziv } = kategorija;

                  return (
                    <option key={id} value={naziv}>
                      {naziv}
                    </option>
                  );
                })}
              </Select>
              <RadioGroup onChange={setRadio} value={radio}>
                <Stack direction="row">
                  <Radio value="trazim">Trazim</Radio>
                  <Radio value="nudim">Nudim</Radio>
                </Stack>
              </RadioGroup>
            </Stack>
            <Stack
              direction="row"
              border="1px"
              borderColor="gray.300"
              padding={2}
              borderRadius="lg"
            >
              <Text>Cijena</Text>
              <Input
                type="number"
                name="cijena"
                id="cijena"
                value={unos.cijena}
                onChange={handleChange}
                placeholder="Cijena"
                variant="filled"
                textColor="black"
              />
              <Checkbox
                name="fiksno"
                value={unos.fiksno}
                onChange={handleChange}
              >
                Fiksno
              </Checkbox>
            </Stack>
            <Stack
              direction="row"
              border="1px"
              borderColor="gray.300"
              padding={2}
              borderRadius="lg"
            >
              <Checkbox
                name="prihvatamZamjenu"
                value={unos.prihvatamZamjenu}
                onChange={handleChange}
              >
                Prihvatam zamjenu
              </Checkbox>
            </Stack>
            <Stack
              direction="row"
              border="1px"
              borderColor="gray.300"
              padding={2}
              borderRadius="lg"
            >
              <Text>Tekst oglasa</Text>
              <Input
                type="text"
                name="tekstOglasa"
                id="tekstOglasa"
                value={unos.tekstOglasa}
                onChange={handleChange}
                placeholder="Godina proizvodnje, stanje, napomena..."
                variant="filled"
                textColor="black"
              />
            </Stack>
            <Stack
              direction="row"
              border="1px"
              borderColor="gray.300"
              padding={2}
              borderRadius="lg"
            >
              <Input type="img" multiple />
            </Stack>
            <Stack
              direction="row"
              border="1px"
              borderColor="gray.300"
              padding={2}
              borderRadius="lg"
            >
              <Text>Mjesto/Grad</Text>
              <Select
                size="xs"
                placeholder="Odaberi"
                name="mjestoGrad"
                onChange={handleChange}
              >
                {Mjesta.map((mjesto) => {
                  const { id, naziv } = mjesto;

                  return (
                    <option key={id} value={naziv}>
                      {naziv}
                    </option>
                  );
                })}
              </Select>
            </Stack>
            <Stack
              direction="row"
              border="1px"
              borderColor="gray.300"
              padding={2}
              borderRadius="lg"
            >
              <Text>Telefon</Text>
              <Input
                type="text"
                name="telefon"
                id="telefon"
                value={unos.telefon}
                onChange={handleChange}
                placeholder="Telefon"
                variant="filled"
                textColor="black"
              ></Input>
            </Stack>
            <Stack
              border="1px"
              borderColor="gray.300"
              padding={2}
              borderRadius="lg"
            >
              <Button
                variant="solid"
                colorScheme="red"
                rightIcon={<ArrowRightIcon />}
                onClick={handleSubmit}
              >
                Postavite oglas
              </Button>
              <Center>
                {message && (
                  <Alert status="error">
                    <AlertIcon />
                    {message}
                  </Alert>
                )}
              </Center>
            </Stack>
          </form>
        </Stack>
      </Flex>
    </Box>
  );
};

export default PostaviOglas;
