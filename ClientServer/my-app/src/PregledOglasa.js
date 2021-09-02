import React, { useState, useEffect } from "react";
import Kategorije from "./kategorije.json";
import { changeItem } from "./ItemService";
import Mjesta from "./mjesto.json";
import {
  PhoneIcon,
  AddIcon,
  WarningIcon,
  ChevronDownIcon,
  SearchIcon,
  ArrowRightIcon,
} from "@chakra-ui/icons";
import {
  Box,
  Flex,
  Image,
  useColorMode,
  Stack,
  Text,
  Popover,
  PopoverContent,
  PopoverBody,
  Input,
  Select,
  Button,
  RadioGroup,
  Radio,
  Checkbox,
  Alert,
  Center,
  AlertIcon,
  PopoverTrigger,
  PopoverArrow,
  PopoverCloseButton,
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
import { uploadObavjestenje } from "./ObavjestenjaService";
import { getAllItems } from "./ItemService";
const PreledOglasa = (id) => {
  let logs = JSON.parse(localStorage.getItem("logs"));

  const [user, setUser] = useState(JSON.parse(localStorage.getItem("user")));
  const [item, setItem] = useState({
    userId: 0,
    userName: "",
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
  const [message, setMessage] = useState("");
  useEffect(() => {
    //var items = JSON.parse(localStorage.getItem("items"));
    var string = id.location.search.replace(/[^0-9]/g, "");
    console.log(string);
    var param = parseInt(string, 10);
    getAllItems()
      .then((item) => {
        console.log("then");

        for (let i = 0; i < item.data.length; i++) {
          if (item.data[i].id === param) {
            console.log(item.data[i].id);
            setItem(item.data[i]);
            console.log("aaaaaaaaaaaaa");
          }
        }
        console.log(item.data);
        localStorage.setItem("items", JSON.stringify(item.data));
      })
      .then(() => {});
  }, []);
  console.log(item);
  const [radio, setRadio] = React.useState(item.nudimTrazim);

  const handleChange = (e) => {
    if (!e.target) {
      console.log("usao");
      var val;
      if (document.getElementById("nudim").checked) {
        val = "nudim";
      } else {
        val = "trazim";
      }
      setRadio(val);
      console.log(val);
      setItem({ ...item, ["nudimTrazim"]: val });
    } else {
      const name = e.target.name; //atribut u tagu, da li je to email, godine ili ime
      if (name === "prihvatamZamjenu" || name === "fiksno") {
        const value = e.target.checked;
        setItem({ ...item, [name]: value }); //person su prazna polja ukoliko nije nista proslijedjeno na unosu
      } else {
        const value = e.target.value;
        setItem({ ...item, [name]: value }); //person su prazna polja ukoliko nije nista proslijedjeno na unosu
      }
      console.log(item);
    }
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    //get();

    if (
      item.naslov === "" ||
      item.kategorija === "" ||
      item.nudimTrazim === "" ||
      item.cijena === 0 ||
      item.tekstOglasa === "" ||
      //unos.dodajteSlike === "" ||
      item.mjestoGrad === "" ||
      item.telefon === "" ||
      item.grupa === ""
    ) {
      setMessage("Nisu uneseni svi parametri.");
    } else {
      setMessage("");
      changeItem(item).then((i) => {
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
          poruka: i,
        });
        window.localStorage.setItem("logs", JSON.stringify(logs));
        alert(i);
      });
      var items = JSON.parse(localStorage.getItem("items"));
      var string = id.location.search.replace(/[^0-9]/g, "");
      var param = parseInt(string, 10);

      var objIndex;
      for (let i = 0; i < items.length; i++) {
        if (items[i].id === param) {
          objIndex = i;
        }
      }
      items[objIndex].naslov = item.naslov;
      items[objIndex].kategorija = item.kategorija;
      items[objIndex].nudimTrazim = item.nudimTrazim;
      items[objIndex].cijena = item.cijena;
      items[objIndex].tekstOglasa = item.tekstOglasa;
      items[objIndex].mjestoGrad = item.mjestoGrad;
      items[objIndex].telefon = item.telefon;
      items[objIndex].grupa = item.grupa;
      localStorage.setItem("items", JSON.stringify(items));
    }
  };

  const kupiArtikal = () => {
    if (user === null) {
      window.location.href = "./login";
    } else {
      console.log(item);
      uploadObavjestenje({
        odkogaId: user.id,
        odkogaIme: user.korisnickoIme,
        userId: item.userId,
        komeIme: item.userName,
        opis: "zeli da kupi artikal",
        idArtikla: item.id,
      }).then((item) => {
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
        localStorage.setItem("logs", JSON.stringify(logs));

        alert(item);
      });
    }
  };
  return (
    <>
      {user !== null && (
        <>
          {user.id === item.userId && (
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
                      <Text> Naslov:</Text>
                      <Input
                        type="text"
                        name="naslov"
                        id="naslov"
                        value={item.naslov}
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
                          if (naziv === item.kategorija) {
                            return (
                              <option key={id} value={naziv} selected>
                                {naziv}
                              </option>
                            );
                          } else {
                            return (
                              <option key={id} value={naziv}>
                                {naziv}
                              </option>
                            );
                          }
                        })}
                      </Select>
                      <RadioGroup
                        onChange={handleChange}
                        name="nudimTrazim"
                        value={radio}
                      >
                        <Stack direction="row">
                          {/* {item.nudimTrazim === "trazim" && ( */}
                          <Radio id="trazim" value="trazim">
                            Trazim
                          </Radio>
                          <Radio id="nudim" value="nudim">
                            Nudim
                          </Radio>

                          {/* )} */}
                          {/* {item.nudimTrazim !== "trazim" && ( */}
                          {/* )} */}
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
                        value={item.cijena}
                        onChange={handleChange}
                        placeholder="Cijena"
                        variant="filled"
                        textColor="black"
                      />
                      {item.fiksno && (
                        <Checkbox
                          name="fiksno"
                          value={item.fiksno}
                          onChange={handleChange}
                          isChecked
                        >
                          Fiksno
                        </Checkbox>
                      )}
                      {!item.fiksno && (
                        <Checkbox
                          name="fiksno"
                          value={item.fiksno}
                          onChange={handleChange}
                        >
                          Fiksno
                        </Checkbox>
                      )}
                    </Stack>
                    <Stack
                      direction="row"
                      border="1px"
                      borderColor="gray.300"
                      padding={2}
                      borderRadius="lg"
                    >
                      {item.prihvatamZamjenu && (
                        <Checkbox
                          name="prihvatamZamjenu"
                          value={item.prihvatamZamjenu}
                          onChange={handleChange}
                          isChecked
                        >
                          Prihvatam zamjenu
                        </Checkbox>
                      )}
                      {!item.prihvatamZamjenu && (
                        <Checkbox
                          name="prihvatamZamjenu"
                          value={item.prihvatamZamjenu}
                          onChange={handleChange}
                        >
                          Prihvatam zamjenu
                        </Checkbox>
                      )}
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
                        value={item.tekstOglasa}
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
                      <Text>Mjesto/Grad</Text>
                      <Select
                        size="xs"
                        placeholder="Odaberi"
                        name="mjestoGrad"
                        onChange={handleChange}
                      >
                        {Mjesta.map((mjesto) => {
                          const { id, naziv } = mjesto;
                          if (item.mjestoGrad === naziv) {
                            return (
                              <option key={id} value={naziv} selected>
                                {naziv}
                              </option>
                            );
                          } else {
                            return (
                              <option key={id} value={naziv}>
                                {naziv}
                              </option>
                            );
                          }
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
                        value={item.telefon}
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
                        Izmijeni
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
          )}
        </>
      )}
      {user !== null && user.id !== item.userId && (
        <Box margin="4">
          <Flex>
            <Stack direction="column">
              <Stack shadow="large" direction="row">
                <Button
                  variant="solid"
                  colorScheme="red"
                  width="100%"
                  onClick={() =>
                    (window.location.href =
                      "./PogledajKorisnika?i=" + item.userId)
                  }
                >
                  Objavio: {item.userName}
                </Button>
              </Stack>
              <Stack
                direction="row"
                border="1px"
                borderColor="gray.300"
                padding={2}
                borderRadius="lg"
              >
                <Text> Naslov:</Text>
                <Text>{item.naslov}</Text>
              </Stack>
              <Stack
                direction="row"
                border="1px"
                borderColor="gray.300"
                padding={2}
                borderRadius="lg"
              >
                <Text>Kategorija:</Text>
                <Text>{item.kategorija}</Text>
              </Stack>
              <Stack
                direction="row"
                border="1px"
                borderColor="gray.300"
                padding={2}
                borderRadius="lg"
              >
                <Text>Nudim/Trazim:</Text>
                <Text>{item.nudimTrazim}</Text>
              </Stack>
              <Stack
                direction="row"
                border="1px"
                borderColor="gray.300"
                padding={2}
                borderRadius="lg"
              >
                <Text>Cijena</Text>
                <Text>{item.cijena}</Text>

                <Text>{item.fiksno}</Text>
              </Stack>
              <Stack
                direction="row"
                border="1px"
                borderColor="gray.300"
                padding={2}
                borderRadius="lg"
              >
                {item.prihvatamZamjenu && <Text>Prihvatam zamjenu</Text>}
                {!item.prihvatamZamjenu && <Text>Ne prihvatam zamjenu</Text>}
              </Stack>
              <Stack
                direction="row"
                border="1px"
                borderColor="gray.300"
                padding={2}
                borderRadius="lg"
              >
                <Popover>
                  <PopoverTrigger>
                    <Select size="xs" placeholder="Detaljnije"></Select>
                  </PopoverTrigger>
                  <PopoverContent>
                    <PopoverArrow />
                    <PopoverCloseButton />
                    {/* <PopoverHeader>Confirmation!</PopoverHeader> */}
                    <PopoverBody>
                      <Stack direction="row">
                        <Text>{item.tekstOglasa}</Text>
                      </Stack>
                    </PopoverBody>
                  </PopoverContent>
                </Popover>
              </Stack>

              <Stack
                direction="row"
                border="1px"
                borderColor="gray.300"
                padding={2}
                borderRadius="lg"
              >
                <Text>Mjesto/Grad: </Text>
                <Text>{item.mjestoGrad}</Text>
              </Stack>
              <Stack
                direction="row"
                border="1px"
                borderColor="gray.300"
                padding={2}
                borderRadius="lg"
              >
                <Text>Telefon</Text>
                <Text>{item.telefon}</Text>
              </Stack>
              <Button
                variant="solid"
                colorScheme="red"
                rightIcon={<ArrowRightIcon />}
                onClick={kupiArtikal}
              >
                Kupi artikal{" "}
              </Button>
            </Stack>
          </Flex>
        </Box>
      )}
      {user === null && (
        <Box margin="4">
          <Flex>
            <Stack direction="column">
              <Stack shadow="large" direction="row">
                <Button
                  variant="solid"
                  colorScheme="red"
                  width="100%"
                  onClick={() =>
                    (window.location.href =
                      "./PogledajKorisnika?i=" + item.userId)
                  }
                >
                  Objavio: {item.userName}
                </Button>
              </Stack>
              <Stack
                direction="row"
                border="1px"
                borderColor="gray.300"
                padding={2}
                borderRadius="lg"
              >
                <Text> Naslov:</Text>
                <Text>{item.naslov}</Text>
              </Stack>
              <Stack
                direction="row"
                border="1px"
                borderColor="gray.300"
                padding={2}
                borderRadius="lg"
              >
                <Text>Kategorija:</Text>
                <Text>{item.kategorija}</Text>
              </Stack>
              <Stack
                direction="row"
                border="1px"
                borderColor="gray.300"
                padding={2}
                borderRadius="lg"
              >
                <Text>Nudim/Trazim:</Text>
                <Text>{item.nudimTrazim}</Text>
              </Stack>
              <Stack
                direction="row"
                border="1px"
                borderColor="gray.300"
                padding={2}
                borderRadius="lg"
              >
                <Text>Cijena</Text>
                <Text>{item.cijena}</Text>

                <Text>{item.fiksno}</Text>
              </Stack>
              <Stack
                direction="row"
                border="1px"
                borderColor="gray.300"
                padding={2}
                borderRadius="lg"
              >
                {item.prihvatamZamjenu && <Text>Prihvatam zamjenu</Text>}
                {!item.prihvatamZamjenu && <Text>Ne prihvatam zamjenu</Text>}
              </Stack>
              <Stack
                direction="row"
                border="1px"
                borderColor="gray.300"
                padding={2}
                borderRadius="lg"
              >
                <Popover>
                  <PopoverTrigger>
                    <Select size="xs" placeholder="Detaljnije"></Select>
                  </PopoverTrigger>
                  <PopoverContent>
                    <PopoverArrow />
                    <PopoverCloseButton />
                    {/* <PopoverHeader>Confirmation!</PopoverHeader> */}
                    <PopoverBody>
                      <Stack direction="row">
                        <Text>{item.tekstOglasa}</Text>
                      </Stack>
                    </PopoverBody>
                  </PopoverContent>
                </Popover>
              </Stack>

              <Stack
                direction="row"
                border="1px"
                borderColor="gray.300"
                padding={2}
                borderRadius="lg"
              >
                <Text>Mjesto/Grad: </Text>
                <Text>{item.mjestoGrad}</Text>
              </Stack>
              <Stack
                direction="row"
                border="1px"
                borderColor="gray.300"
                padding={2}
                borderRadius="lg"
              >
                <Text>Telefon</Text>
                <Text>{item.telefon}</Text>
              </Stack>
              <Button
                variant="solid"
                colorScheme="red"
                rightIcon={<ArrowRightIcon />}
                onClick={kupiArtikal}
              >
                Kupi artikal{" "}
              </Button>
            </Stack>
          </Flex>
        </Box>
      )}
    </>
  );
};

export default PreledOglasa;
