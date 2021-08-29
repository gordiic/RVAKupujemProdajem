import React, { useState, useEffect } from "react";
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
  Tr,
  Td,
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
const Oglas = (props) => {
  const {
    cijena,
    fiksno,
    id,
    kategorija,
    mjestoGrad,
    naslov,
    nudimTrazim,
    prihvatamZamjenu,
    tekstOglasa,
    telefon,
    userId,
  } = props.oglas;
  return (
    <>
      <Td></Td>
      <Td>{naslov}</Td>
      <Td>{kategorija}</Td>
      <Td>{mjestoGrad}</Td>
      <Td>{cijena}</Td>
    </>
  );
};

export default Oglas;
