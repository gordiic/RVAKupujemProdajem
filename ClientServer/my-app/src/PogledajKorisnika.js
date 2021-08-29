import React, { useState, useEffect, useToast } from "react";
import { uploadOcjena } from "./OcjenaService";
import {
  Button,
  Stack,
  FormControl,
  InputGroup,
  InputLeftElement,
  Icon,
  Input,
  Alert,
  AlertIcon,
  Center,
  Text,
  Box,
  Divider,
  Lorem,
  Fade,
  ScaleFade,
  Slide,
  SlideFade,
  Select,
} from "@chakra-ui/react";
import { Collapse } from "@chakra-ui/transition";

import {
  PhoneIcon,
  AddIcon,
  WarningIcon,
  ChevronDownIcon,
  SearchIcon,
  EmailIcon,
  InfoIcon,
  LockIcon,
  StarIcon,
  ArrowRightIcon,
  ChatIcon,
} from "@chakra-ui/icons";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { convertToObject } from "typescript";
import { getUserById } from "./UserService";
const PogledajKorisnika = (id) => {
  let logs = JSON.parse(localStorage.getItem("logs"));
  const [unos, setUnos] = useState({
    komentar: "",
    brOcjene: 0,
    korisnickoIme: "",
    idKorisnika: 0,
    idKorisnikaOcijenjenog: 0,
  });
  const [user, setUser] = useState(JSON.parse(localStorage.getItem("user")));
  const [user2, setUser2] = useState({
    id: 0,
    ime: "",
    prezime: "",
    korisnickoIme: "",
    lozinka: "",
    email: "",
    uloga: "user",
    prosjecnaOcjena: 0,
    brOcjena: 0,
  });
  useEffect(() => {
    var string = id.location.search.replace(/[^0-9]/g, "");
    var param = parseInt(string, 10);
    getUserById(param)
      .then((item) => {
        setUser2(item.data);
        console.log(item.data);
      })
      .then(() => {
        if (user !== null) {
          setUnos({
            komentar: "",
            brOcjene: 0,
            korisnickoIme: user.korisnickoIme,
            idKorisnika: user.id,
            idKorisnikaOcijenjenog: param,
          });
        }
      });
  }, []);

  const handleChange = (e) => {
    const name = e.target.name; //atribut u tagu, da li je to email, godine ili ime
    console.log(e.target.name);
    const value = e.target.value;
    if (name === "brOcjene") {
      setUnos({ ...unos, [name]: parseInt(value) }); //person su prazna polja ukoliko nije nista proslijedjeno na unosu
    } else {
      setUnos({ ...unos, [name]: value }); //person su prazna polja ukoliko nije nista proslijedjeno na unosu
    }

    console.log(unos);
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    if (unos.prosjecnaOcjena !== "" && unos.komentar !== "") {
      uploadOcjena(unos).then((item) => {
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

      var suma = user2.prosjecnaOcjena * user2.brOcjena;
      suma += unos.brOcjene;
      var br = user2.brOcjena + 1;
      var prosjek = suma / br;
      setUser2({
        ...user2,
        ["prosjecnaOcjena"]: Math.round((prosjek + Number.EPSILON) * 100) / 100,
        ["brOcjena"]: br,
      });
      setUnos({ ...unos, ["komentar"]: "", ["brOcjene"]: 0 });
    }
  };

  return (
    <Box margin={4} borderRadius="lg" borderColor="gray.300" rounded="lg">
      <Stack direction="column">
        <Stack
          padding={2}
          border="1px"
          backgroundColor="red.500"
          borderColor="red"
          rounded="lg"
          alignItems="center"
        >
          <Text textColor="white">{user2.korisnickoIme}</Text>
        </Stack>
        <Stack padding={2} rounded="lg">
          <Text>{user2.ime}</Text>
          <Divider colorScheme="red" />
          <Text>{user2.prezime}</Text>
          <Divider />
          <Text>{user2.email}</Text>
          <Divider />
          <Stack direction="column" alignItems="center">
            <Text>Prosjecna ocjena korisnika</Text>
            <Stack direction="row">
              <Center>
                <Text>
                  {Math.round((user2.prosjecnaOcjena + Number.EPSILON) * 100) /
                    100}
                </Text>
                <StarIcon color="red" />
              </Center>
            </Stack>
          </Stack>
          {user !== null && user.korisnickoIme !== user2.korisnickoIme && (
            <Stack border="column" border="1px" rounded="lg" padding={2}>
              <form action="submit">
                <Text>Ocijeni korisnika:</Text>
                <Stack direction="row" alignItems="center">
                  <StarIcon color="red" />
                  <Select
                    placeholder="Ocjena"
                    name="brOcjene"
                    onChange={handleChange}
                  >
                    <option value={1}>1</option>
                    <option value={2}>2</option>
                    <option value={3}>3</option>
                    <option value={4}>4</option>
                    <option value={5}>5</option>
                  </Select>
                </Stack>
                <Stack direction="row" alignItems="center">
                  <ChatIcon color="red" />
                  <Input
                    type="text"
                    placeholder="Komentar"
                    onChange={handleChange}
                    name="komentar"
                    value={unos.komentar}
                  />
                </Stack>
                <Button
                  variant="solid"
                  colorScheme="red"
                  rightIcon={<ArrowRightIcon />}
                  onClick={handleSubmit}
                  width="100%"
                >
                  Ocijeni
                </Button>
              </form>
            </Stack>
          )}
        </Stack>
      </Stack>
    </Box>
  );
};

export default PogledajKorisnika;
