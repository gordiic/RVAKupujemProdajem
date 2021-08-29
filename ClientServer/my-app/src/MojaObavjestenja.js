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
  List,
  ListItem,
  ListIcon,
  MdCheckCircle,
  MdSettings,
  IconButton,
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
import {
  getObavjestenjaForUser,
  uploadObavjestenje,
  ObrisiObavjestenje,
} from "./ObavjestenjaService";
const MojaObavjestenja = () => {
  const [user, setUser] = useState(JSON.parse(localStorage.getItem("user")));
  const [items, setItems] = useState([]);
  let logs = JSON.parse(localStorage.getItem("logs"));
  useEffect(() => {
    console.log(user);
    getObavjestenjaForUser(user.id)
      .then((item) => {
        console.log("then");
        setItems(item.data);
        console.log(item.data);
      })
      .then(() => {});
    console.log(items);
    //  }
  }, []);

  const Odobri = (props) => {
    console.log(props);
    if (user === null) {
      window.location.href = "./login";
    } else {
      uploadObavjestenje({
        odkogaId: user.id,
        odkogaIme: user.korisnickoIme,
        komeId: props.odkogaId,
        komeIme: props.odkogaIme,
        opis: "odobrava kupovinu artikla|" + props.id,
        idArtikla: props.idArtikla,
      }).then((item) => {
        logs = JSON.parse(localStorage.getItem("logs"));
        console.log("then");
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
        window.location.href = "./MojaObavjestenja";
      });
    }
  };

  const Odbij = (props) => {
    if (user === null) {
      window.location.href = "./login";
    } else {
      uploadObavjestenje({
        odkogaId: user.id,
        odkogaIme: user.korisnickoIme,
        komeId: props.odkogaId,
        komeIme: props.odkogaIme,
        opis: "odbija kupovinu artikla|" + props.id,
        idArtikla: props.idArtikla,
      }).then((item) => {
        console.log("then");
        alert(item);
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
          poruka: item + " korisniku " + props.odkogaIme,
        });

        window.localStorage.setItem("logs", JSON.stringify(logs));
        window.location.href = "./MojaObavjestenja";
      });
    }
  };
  const Obrisi = (props) => {
    ObrisiObavjestenje(props.id).then((item) => {
      console.log("then");
      alert(item.data);
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
        poruka: item.data,
      });

      window.localStorage.setItem("logs", JSON.stringify(logs));
      window.location.href = "./MojaObavjestenja";
    });
  };

  return (
    <Box margin={4} borderRadius="lg" borderColor="gray.300" rounded="lg">
      <Stack direction="column">
        {items.length === 0 && <Text>Nema obavjestenja</Text>}
        <List spacing={3}>
          {items.map((item) => {
            const {
              id,
              odkogaId,
              odkogaIme,
              komeId,
              komeIme,
              opis,
              idArtikla,
            } = item;
            return (
              <ListItem>
                <Stack
                  direction="row"
                  alignItems="center"
                  borderBottom="1px"
                  rounded="lg"
                  boxShadow="xl"
                >
                  <Text>Korisnik </Text>{" "}
                  <Text textColor="red.500">{item.odkogaIme}</Text>
                  <Text> {item.opis}</Text>
                  {item.opis.includes("zeli da kupi artikal") && (
                    <>
                      <Button
                        variant="solid"
                        colorScheme="red"
                        rightIcon={<ArrowRightIcon />}
                        onClick={() => Odobri(item)}
                        marginLeft="2"
                      >
                        Odobri
                      </Button>
                      <Button
                        variant="solid"
                        colorScheme="red"
                        rightIcon={<ArrowRightIcon />}
                        onClick={() => Odbij(item)}
                        marginLeft="2"
                      >
                        Odbij
                      </Button>
                    </>
                  )}
                  {item.opis.includes("odobrava kupovinu artikla") && (
                    <>
                      <Button
                        variant="solid"
                        colorScheme="red"
                        rightIcon={<ArrowRightIcon />}
                        onClick={() => Obrisi(item)}
                      >
                        Obrisi
                      </Button>
                    </>
                  )}
                  {item.opis.includes("odbija kupovinu artikla") && (
                    <>
                      <Button
                        variant="solid"
                        colorScheme="red"
                        rightIcon={<ArrowRightIcon />}
                        onClick={() => Obrisi(item)}
                      >
                        Obrisi
                      </Button>
                    </>
                  )}
                </Stack>
              </ListItem>
            );
          })}
        </List>
      </Stack>
    </Box>
  );
};

export default MojaObavjestenja;
