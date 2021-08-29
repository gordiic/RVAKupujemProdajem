import React, { useState, useEffect } from "react";
import { changeAccount } from "./UserService";
import {
  Button,
  Stack,
  FormControl,
  InputGroup,
  InputLeftElement,
  Icon,
  Input,
  Divider,
  Alert,
  AlertIcon,
  Center,
  Text,
  Box,
} from "@chakra-ui/react";
import {
  PhoneIcon,
  AddIcon,
  WarningIcon,
  ChevronDownIcon,
  SearchIcon,
  EmailIcon,
  InfoIcon,
  LockIcon,
} from "@chakra-ui/icons";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { convertToObject } from "typescript";
const MojNalog = () => {
  let logs = JSON.parse(localStorage.getItem("logs"));

  const [person, setPerson] = useState(
    JSON.parse(localStorage.getItem("user"))
  );
  const [person2, setPerson2] = useState(person);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [lozinka2, setLozinka2] = useState("");

  useEffect(() => {
    console.log("Odgovor apija ispod:");
    console.log(message);
    if (message === "Azurirano.") {
      console.log("uso");
      alert(message);
      window.location.href = "./MojKp";
    }
  }, [message]);

  const handleChange = (e) => {
    const name = e.target.name; //atribut u tagu, da li je to email, godine ili ime
    const value = e.target.value;
    if (name === "lozinka2") {
      setLozinka2(value);
    } else {
      setPerson({ ...person, [name]: value }); //person su prazna polja ukoliko nije nista proslijedjeno na unosu
    }
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    if (
      person.ime &&
      person.lozinka &&
      person.prezime &&
      person.korisnickoIme &&
      person.email &&
      person.lozinka === lozinka2
    ) {
      changeAccount(person).then((item) => {
        console.log("then");
        setMessage(item);
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
      });
      localStorage.setItem("user", JSON.stringify(person));
      setLozinka2("");
      setError("");
    } else {
      setPerson(person2);
      setLozinka2("");

      if (person.lozinka !== lozinka2) {
        setError("Lozinke se ne poklapaju.");
      } else {
        setError("Unesite sve podatke.");
      }
    }
  };
  return (
    <Box
      margin={4}
      border="1px"
      padding={2}
      borderRadius="lg"
      borderColor="gray.300"
    >
      <Stack direction="row" border={1}>
        <form action="submit">
          <Stack spacing={3}>
            <FormControl isRequired>
              <Text fontSize="sm">Ime:</Text>
              <InputGroup>
                <InputLeftElement children={<Icon as={InfoIcon} />} />
                <Input
                  type="name"
                  name="ime"
                  id="ime"
                  value={person.ime}
                  onChange={handleChange}
                  placeholder="Ime"
                  variant="filled"
                  textColor="black"
                />
              </InputGroup>
            </FormControl>
            <FormControl isRequired>
              <Text fontSize="sm">Prezime:</Text>
              <InputGroup>
                <InputLeftElement children={<Icon as={InfoIcon} />} />
                <Input
                  type="name"
                  name="prezime"
                  id="prezime"
                  value={person.prezime}
                  onChange={handleChange}
                  placeholder="Prezime"
                  variant="filled"
                  textColor="black"
                />
              </InputGroup>
            </FormControl>
            <FormControl isRequired>
              <Text fontSize="sm">Korisnicko ime:</Text>
              <InputGroup>
                <InputLeftElement children={<Icon as={InfoIcon} />} />
                <Input
                  type="name"
                  name="korisnickoIme"
                  id="korisnickoIme"
                  value={person.korisnickoIme}
                  onChange={handleChange}
                  placeholder="Korisnicko ime"
                  variant="filled"
                  textColor="black"
                />
              </InputGroup>
            </FormControl>
            <FormControl isRequired>
              <Text fontSize="sm">Lozinka:</Text>
              <InputGroup>
                <InputLeftElement children={<Icon as={LockIcon} />} />
                <Input
                  type="password"
                  name="lozinka"
                  id="lozinka"
                  value={person.lozinka}
                  onChange={handleChange}
                  placeholder="Lozinka"
                  variant="filled"
                  textColor="black"
                />
              </InputGroup>
            </FormControl>
            <FormControl isRequired>
              <InputGroup>
                <InputLeftElement children={<Icon as={LockIcon} />} />
                <Input
                  type="password"
                  name="lozinka2"
                  id="lozinka2"
                  value={lozinka2}
                  onChange={handleChange}
                  placeholder="Potvrdi lozinku"
                  variant="filled"
                  textColor="black"
                />
              </InputGroup>
            </FormControl>
            <FormControl isRequired>
              <InputGroup>
                <InputLeftElement children={<Icon as={EmailIcon} />} />
                <Input
                  type="email"
                  name="email"
                  id="email"
                  value={person.email}
                  onChange={handleChange}
                  placeholder="Email"
                  variant="filled"
                  textColor="black"
                />
              </InputGroup>
            </FormControl>
            <Divider />
            <Button type="submit" onClick={handleSubmit}>
              Izmijeni
            </Button>
            <Center>
              {error && (
                <Alert status="error">
                  <AlertIcon />
                  {error}
                </Alert>
              )}
            </Center>
          </Stack>
        </form>
      </Stack>
    </Box>
  );
};

export default MojNalog;
