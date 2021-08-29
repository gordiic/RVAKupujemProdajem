import React, { useState, useEffect } from "react";
import { register } from "./UserService";

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
} from "@chakra-ui/react";
import axios from "axios";

import { EmailIcon, InfoIcon, LockIcon, WarningIcon } from "@chakra-ui/icons";

const RegisterForm = () => {
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [person, setPerson] = useState({
    id: 0,
    ime: "",
    prezime: "",
    korisnickoIme: "",
    lozinka: "",
    email: "",
    uloga: "user",
  });
  const [lozinka2, setLozinka2] = useState("");

  useEffect(() => {
    console.log("Odgovor apija ispod:");
    console.log(message);
    if (message === "Uspjesno ste se registrovali.") {
      console.log("uso");
      alert(message);
      window.location.href = "./login";
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
    console.log(person);
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
      console.log(person);
      register(person).then((item) => {
        console.log("then");
        setMessage(item);
      });
      setPerson({
        id: 0,
        ime: "",
        prezime: "",
        korisnickoIme: "",
        lozinka: "",
        email: "",
        uloga: "user",
      });
      setLozinka2("");
      //setMessage(Register(person));
      //sad treba poslati objekat serveru
    } else {
      if (person.lozinka !== lozinka2) {
        setError("Lozinke se ne poklapaju.");
      }
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
          Registruj se
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
  );
};

export default RegisterForm;
