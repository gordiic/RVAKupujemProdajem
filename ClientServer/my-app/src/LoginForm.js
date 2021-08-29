import React, { useState, useEffect } from "react";
import {
  Button,
  Stack,
  FormControl,
  InputGroup,
  InputLeftElement,
  Icon,
  Center,
  Input,
  Divider,
  FormHelperText,
  Alert,
  AlertIcon,
  Text,
  useForceUpdate,
} from "@chakra-ui/react";
import { InfoIcon, LockIcon } from "@chakra-ui/icons";
import axios from "axios";
import { login } from "./UserService";

const LoginForm = () => {
  let logs = [];
  const [message, setMessage] = useState("");
  const [person, setPerson] = useState({
    id: 0,
    ime: "",
    prezime: "",
    korisnickoIme: "",
    lozinka: "",
    email: "",
  });
  useEffect(() => {
    console.log("Odgovor apija ispod:");
    console.log(message);
    if (
      message !== "Netacna lozinka." &&
      message !== "Nepostojeci korisnik." &&
      message !== ""
    ) {
      setMessage("");
      console.log("uso");
      window.location.href = "./";
    }
  }, [message]);
  const handleChange = (e) => {
    const name = e.target.name; //atribut u tagu, da li je to email, godine ili ime
    const value = e.target.value;

    setPerson({ ...person, [name]: value }); //person su prazna polja ukoliko nije nista proslijedjeno na unosu
    console.log(person);
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    if (person.korisnickoIme && person.lozinka) {
      //sad treba poslati objekat serveru
      login(person).then((item) => {
        console.log("then");
        if (item === "Netacna lozinka." || item === "Nepostojeci korisnik.") {
          setMessage(item);
        } else {
          setMessage("ok");
          console.log(item);
          window.localStorage.setItem("user", JSON.stringify(item));
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
            poruka: "Uspjesno ste se ulogovali na sajt.",
          });

          window.localStorage.setItem("logs", JSON.stringify(logs));
        }
      });
      // setPerson({
      //   id: 0,
      //   ime: "",
      //   prezime: "",
      //   korisnickoIme: "",
      //   lozinka: "",
      //   email: "",
      // });
    }
  };
  return (
    <form action="submit">
      <Stack spacing={3}>
        <FormControl isRequired>
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
        <Button type="submit" onClick={handleSubmit}>
          Uloguj se
        </Button>
        <Center>
          {message && (
            <Alert status="error">
              <AlertIcon />
              {message}
            </Alert>
          )}
        </Center>
        <FormHelperText>Vasi podaci ostace privatni</FormHelperText>
      </Stack>
    </form>
  );
};

export default LoginForm;
