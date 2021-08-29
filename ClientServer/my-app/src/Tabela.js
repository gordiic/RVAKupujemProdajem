import React, { useState, useEffect } from "react";
import { get } from "./ItemService";
import Oglas from "./Oglas";

import {
  Stack,
  Box,
  TableCaption,
  Thead,
  Table,
  Tbody,
  Th,
  Tr,
  Tfoot,
  Button,
  Td,
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
import PreledOglasa from "./PregledOglasa";
import { deleteItem } from "./ItemService";
const Tabela = (props) => {
  let logs = JSON.parse(localStorage.getItem("logs"));

  const [user, setUser] = useState(JSON.parse(localStorage.getItem("user")));
  //const [user, setUser] = useState(localStorage.getItem("user"));
  //console.log(user.id);

  const pregled = (item) => {
    return <PreledOglasa />;
  };
  const obrisiItem = (props) => {
    console.log(props);
    deleteItem(props).then((item) => {
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
      window.location.href = "./";
    });
  };
  return (
    <Box
      margin={4}
      border="1px"
      padding={2}
      borderRadius="lg"
      borderColor="gray.300"
    >
      <Stack border={1}>
        <Table variant="striped" colorScheme="messenger">
          {props.i.length === 0 && (
            <TableCaption>Nema objavljenih pozivoda</TableCaption>
          )}
          {props.i.length !== 0 && (
            <TableCaption>Objavljeni proizvodi</TableCaption>
          )}
          <Thead>
            <Tr>
              <Th></Th>
              <Th>Naslov</Th>
              <Th isNumeric>Kategorija</Th>
              <Th>mjesto/Grad</Th>
              <Th>Cijena</Th>
            </Tr>
          </Thead>
          <Tbody>
            {props.i.map((item) => {
              const {
                userId,
                id,
                naslov,
                kategorija,
                nudimTrazim,
                cijena,
                fiksno,
                prihvatamZamjenu,
                tekstOglasa,
                //dodajteSlike: "",
                mjestoGrad,
                telefon,
              } = item;
              return (
                <Tr>
                  <Oglas key={id} oglas={item} />
                  <Td>
                    <Stack direction="row">
                      <Button
                        onClick={() =>
                          (window.location.href =
                            "./PregledOglasa?i=" + item.id)
                        }
                      >
                        Pogledaj
                      </Button>
                      {user !== null && (
                        <>
                          {user.uloga !== "admin" && (
                            <>
                              {user.id === item.userId && (
                                <>
                                  <Button
                                    onClick={() => {
                                      obrisiItem(id);
                                    }}
                                  >
                                    Obrisi
                                  </Button>
                                </>
                              )}
                            </>
                          )}
                        </>
                      )}
                      {user !== null && (
                        <>
                          {user.uloga === "admin" && (
                            <>
                              <Button
                                onClick={() => {
                                  obrisiItem(id);
                                }}
                              >
                                Obrisi
                              </Button>
                            </>
                          )}
                        </>
                      )}
                    </Stack>
                  </Td>
                </Tr>
              );
            })}
          </Tbody>
          <Tfoot>
            <Tr>
              <Th></Th>
              <Th>Naslov</Th>
              <Th isNumeric>Kategorija</Th>
              <Th>mjesto/Grad</Th>
              <Th>Cijena</Th>
            </Tr>
          </Tfoot>
        </Table>
      </Stack>
    </Box>
  );
};

export default Tabela;
