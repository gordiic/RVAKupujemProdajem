import React, { useState } from "react";
import {
  Box,
  Flex,
  Image,
  useColorMode,
  Stack,
  Text,
  Input,
  Button,
  Select,
} from "@chakra-ui/react";
import {
  PhoneIcon,
  AddIcon,
  WarningIcon,
  ChevronDownIcon,
  SearchIcon,
} from "@chakra-ui/icons";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Kategorije from "./kategorije.json";

const IzborKategorije = () => {
  const { colorMode } = useColorMode();
  const [unos, setUnos] = useState({
    naslov: "",
    tip: "",
    kategorija: "",
    grupa: "",
  });
  const handleChange = (e) => {
    const name = e.target.name; //atribut u tagu, da li je to email, godine ili ime
    const value = e.target.value;

    setUnos({ ...unos, [name]: value }); //person su prazna polja ukoliko nije nista proslijedjeno na unosu
  };
  return (
    <Flex>
      <Stack direction="column">
        <Stack direction="row" border="1px" borderColor="gray.300" padding={2}>
          <Text>Sta se oglasava?</Text>
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
        <Stack direction="row" border="1px" borderColor="gray.300" padding={2}>
          <Text>Kategorija*</Text>
          <Select
            size="xs"
            placeholder="Kategorija"
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
        </Stack>
      </Stack>
    </Flex>
  );
};

export default IzborKategorije;
