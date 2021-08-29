import React, { useState } from "react";
import {
  Box,
  Flex,
  Image,
  Input,
  Button,
  Stack,
  useColorMode,
  Select,
  Option,
  Popover,
  PopoverTrigger,
  PopoverArrow,
  PopoverCloseButton,
  PopoverBody,
  PopoverHeader,
  PopoverContent,
  Text,
  Checkbox,
} from "@chakra-ui/react";
import {
  PhoneIcon,
  AddIcon,
  WarningIcon,
  ChevronDownIcon,
  SearchIcon,
} from "@chakra-ui/icons";

import Kategorije from "./kategorije.json";
import Mjesta from "./mjesto";
const Pretrazivanje = (props) => {
  const { colorMode } = useColorMode();
  const [pretraga, setPretraga] = useState("");

  const handleChange = (e) => {
    const name = e.target.name; //atribut u tagu, da li je to email, godine ili ime
    const value = e.target.value;
    console.log(value);
    setPretraga(value); //person su prazna polja ukoliko nije nista proslijedjeno na unosu
    console.log(pretraga);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(pretraga);
    //if (pretraga) {
    //sad treba poslati objekat serveru
    props.fun({
      searchInd: true,
      search: pretraga,
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
    setPretraga("");
    //window.location.href = "./Pocetna";
    // }
  };
  ////////////////////////////////////////////////////////////////
  const [pretraga2, setPretraga2] = useState({
    kategorija: "",
    mjestoGrad: "",
    sortiraj: "",
    min: "0",
    max: "0",
    samoSaCijenom: false,
    besplatno: false,
    fiksno: false,
    mogucaZamjena: false,
  });
  const handleChange2 = (e) => {
    const name = e.target.name; //atribut u tagu, da li je to email, godine ili ime
    const value = e.target.value;
    if (
      name === "samoSaCijenom" ||
      name === "besplatno" ||
      name === "fiksno" ||
      name === "mogucaZamjena"
    ) {
      setPretraga2({ ...pretraga2, [name]: e.target.checked }); //person su prazna polja ukoliko nije nista proslijedjeno na unosu
      console.log(pretraga2);
    } else {
      setPretraga2({ ...pretraga2, [name]: value }); //person su prazna polja ukoliko nije nista proslijedjeno na unosu
      console.log(pretraga2);
    }
  };
  const handleSubmit2 = (e) => {
    e.preventDefault();
    console.log(pretraga2.dogovor);
    props.fun({
      searchInd: false,
      search: "",
      kategorija: pretraga2.kategorija,
      mjestoGrad: pretraga2.mjestoGrad,
      sortiraj: pretraga2.sortiraj,
      min: pretraga2.min,
      max: pretraga2.max,
      samoSaCijenom: pretraga2.samoSaCijenom,
      besplatno: pretraga2.besplatno,
      fiksno: pretraga2.fiksno,
      mogucaZamjena: pretraga2.mogucaZamjena,
    });
  };
  return (
    <Box margin={4} w="100%">
      <Stack direction="column">
        <form action="submit">
          <Stack direction="row" padding={2}>
            <Input
              type="text"
              name="pretraga"
              id="pretraga"
              value={pretraga}
              onChange={handleChange}
              variant="filled"
              placeholder="Prakticno sve..."
              bgColor={colorMode === "dark" ? "gray.600" : "gray.200"}
            />
            <Button
              type="submit"
              onClick={handleSubmit}
              colorScheme="blue"
              variant="solid"
              alignSelf="end"
              rightIcon={<SearchIcon />}
            >
              Trazi
            </Button>
          </Stack>
        </form>
        <form action="submit">
          <Stack direction="row" padding={2}>
            <Select
              size="xs"
              placeholder="Kategorija"
              name="kategorija"
              onChange={handleChange2}
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
            <Select
              size="xs"
              placeholder="Mjesto/Grad"
              name="mjestoGrad"
              onChange={handleChange2}
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
            <Popover>
              <PopoverTrigger>
                <Select size="xs" placeholder="Cijena/Zamjena"></Select>
              </PopoverTrigger>
              <PopoverContent>
                <PopoverArrow />
                <PopoverCloseButton />
                {/* <PopoverHeader>Confirmation!</PopoverHeader> */}
                <PopoverBody>
                  <Stack direction="row">
                    <Text>Min:</Text>
                    <Input
                      type="number"
                      name="min"
                      id="min"
                      value={pretraga2.min}
                      onChange={handleChange2}
                      variant="filled"
                      placeholder="Min"
                      bgColor={colorMode === "dark" ? "gray.600" : "gray.200"}
                    />
                    <Text>Max:</Text>
                    <Input
                      type="number"
                      name="max"
                      id="max"
                      value={pretraga2.max}
                      onChange={handleChange2}
                      variant="filled"
                      placeholder="Max"
                      bgColor={colorMode === "dark" ? "gray.600" : "gray.200"}
                    />
                  </Stack>
                  <Stack direction="row">
                    <Checkbox
                      name="fiksno"
                      id="fiksno"
                      checked={pretraga2.fiksno.value}
                      onChange={handleChange2}
                    >
                      Fiksno
                    </Checkbox>
                  </Stack>
                  <Stack direction="row">
                    <Checkbox
                      name="mogucaZamjena"
                      id="mogucaZamjena"
                      checked={pretraga2.mogucaZamjena.value}
                      onChange={handleChange2}
                    >
                      Moguca zamjena
                    </Checkbox>
                    <Button
                      onClick={() => {
                        setPretraga2({
                          min: "0",
                          max: "0",
                          samoSaCijenom: true,
                          besplatno: true,
                          dogovor: true,
                          mogucaZamjena: true,
                        });
                      }}
                    >
                      Ponisti
                    </Button>
                  </Stack>
                </PopoverBody>
              </PopoverContent>
            </Popover>
            <Select
              name="sortiraj"
              size="xs"
              placeholder="Sortiraj"
              onChange={handleChange2}
            >
              <option value="jeftinije">Jeftinije</option>
              <option value="skuplje">Skuplje</option>
              {/* <option value="novije">Novije oglase</option>
              <option value="popularnije">Popularnije</option> */}
            </Select>
            <Box>
              <Button
                type="submit"
                onClick={handleSubmit2}
                colorScheme="blue"
                variant="solid"
                alignSelf="end"
                rightIcon={<SearchIcon />}
              >
                Trazi
              </Button>
            </Box>
          </Stack>
        </form>
      </Stack>
    </Box>
  );
};

export default Pretrazivanje;
