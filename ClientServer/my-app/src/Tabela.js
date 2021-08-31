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
  AlertDialog,
  AlertDialogBody,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogContent,
  AlertDialogOverlay,
} from "@chakra-ui/react";
import {
  PhoneIcon,
  AddIcon,
  WarningIcon,
  ChevronDownIcon,
  SearchIcon,
  EmailIcon,
  CopyIcon,
  ViewIcon,
  DeleteIcon,
} from "@chakra-ui/icons";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { convertToObject } from "typescript";
import PreledOglasa from "./PregledOglasa";
import { deleteItem, uploadItem } from "./ItemService";
const Tabela = (props) => {
  let logs = JSON.parse(localStorage.getItem("logs"));
  const [isOpen, setIsOpen] = React.useState({ opened: false, i: 0 });
  const onClose = () => setIsOpen({ opened: false, i: 0 });
  const cancelRef = React.useRef();

  const [user, setUser] = useState(JSON.parse(localStorage.getItem("user")));
  //const [user, setUser] = useState(localStorage.getItem("user"));
  //console.log(user.id);

  const pregled = (item) => {
    return <PreledOglasa />;
  };
  const kopirajItem = (props) => {
    console.log(props);
    uploadItem(props).then((item) => {
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
      window.location.href = "./";
    });
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
    <>
      <Box
        margin={4}
        padding={2}
        border="1px"
        borderRadius="lg"
        borderColor="gray.300"
        boxShadow="dark-lg"
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
                          colorScheme="red"
                          onClick={() =>
                            (window.location.href =
                              "./PregledOglasa?i=" + item.id)
                          }
                        >
                          <ViewIcon />
                        </Button>
                        {user !== null && (
                          <>
                            {user.uloga !== "admin" && (
                              <>
                                {user.id === item.userId && (
                                  <>
                                    <Button
                                      colorScheme="red"
                                      onClick={() => {
                                        setIsOpen({ opened: true, i: id });
                                      }}
                                    >
                                      <DeleteIcon />
                                    </Button>
                                    <Button
                                      colorScheme="red"
                                      onClick={() => {
                                        kopirajItem(item);
                                      }}
                                    >
                                      {" "}
                                      <CopyIcon />
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
                                  colorScheme="red"
                                  onClick={() => {
                                    setIsOpen({ opened: true, i: id });
                                  }}
                                >
                                  <DeleteIcon />
                                </Button>
                                <Button
                                  colorScheme="red"
                                  onClick={() => {
                                    kopirajItem(item);
                                  }}
                                >
                                  <CopyIcon />
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
      <AlertDialog
        isOpen={isOpen.opened}
        leastDestructiveRef={cancelRef}
        onClose={onClose}
      >
        <AlertDialogOverlay>
          <AlertDialogContent>
            <AlertDialogHeader fontSize="lg" fontWeight="bold">
              Obrisi artikal
            </AlertDialogHeader>

            <AlertDialogBody>
              Da li ste sigurni da zelite da obrisete artikal?
            </AlertDialogBody>

            <AlertDialogFooter>
              <Button ref={cancelRef} onClick={onClose}>
                Otkazi
              </Button>
              <Button
                colorScheme="red"
                onClick={() => {
                  obrisiItem(isOpen.i);
                }}
                ml={3}
              >
                Obrisi
              </Button>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialogOverlay>
      </AlertDialog>
    </>
  );
};

export default Tabela;
