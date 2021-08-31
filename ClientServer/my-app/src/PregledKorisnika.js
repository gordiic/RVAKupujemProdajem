import React, { useState, useEffect } from "react";
import {
  TableCaption,
  Thead,
  Text,
  Table,
  Tbody,
  Th,
  Tr,
  Tfoot,
  Button,
  Td,
  Stack,
  AlertDialog,
  AlertDialogBody,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogContent,
  AlertDialogOverlay,
  Box,
  IconButton,
  Flex,
} from "@chakra-ui/react";

import { StarIcon, WarningTwoIcon, ArrowRightIcon } from "@chakra-ui/icons";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { convertToObject } from "typescript";
import { getAllUsers, deleteUser } from "./UserService";
import { deleteItem } from "./ItemService";
const MojeOcjene = () => {
  let logs = JSON.parse(localStorage.getItem("logs"));
  const [user, setUser] = useState(JSON.parse(localStorage.getItem("user")));
  const [users, setUsers] = useState([]);
  const [isOpen, setIsOpen] = React.useState({ opened: false, ime: "", id: 0 });
  const onClose = () => setIsOpen({ opened: false, ime: "", id: 0 });
  const cancelRef = React.useRef();

  useEffect(() => {
    getAllUsers()
      .then((item) => {
        console.log("then");
        setUsers(item);
      })
      .then(() => {});
  }, []);

  const ObrisiKorisnika = (props) => {
    if (user.uloga === "admin") {
      deleteUser(props.id)
        .then((item) => {
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
        })
        .then(() => {});
      window.location.href = "./PregledKorisnika";
    }
  };

  return (
    <>
      {user && (
        <>
          {user.uloga === "admin" && (
            <Flex direction="column" alignItems="center">
              {" "}
              <b>
                <Text fontSize="4xl" textColor="red">
                  Registrovani korisnici
                </Text>
              </b>
              <Box
                marginLeft={200}
                marginEnd={200}
                margin={4}
                padding={2}
                border="1px"
                borderRadius="lg"
                borderColor="gray.300"
                boxShadow="dark-lg"
              >
                <Stack direction="column">
                  <Table variant="striped" colorScheme="yellow">
                    {users.length === 0 && (
                      <TableCaption>Nema registrovanih korisnika</TableCaption>
                    )}
                    {users.length !== 0 && (
                      <TableCaption>Registrovani korisnici</TableCaption>
                    )}
                    <Thead>
                      <Tr>
                        <Th></Th>
                        <Th>Ime</Th>
                        <Th>Prezime</Th>
                        <Th>Korisnicko ime</Th>
                        <Th>Email</Th>
                        <Th>
                          <StarIcon color="red" />
                          &nbsp; Ocjena
                        </Th>
                      </Tr>
                    </Thead>
                    <Tbody>
                      {users.map((user) => {
                        return (
                          <Tr>
                            <Td>
                              <Stack
                                direction="row"
                                alignItems="center"
                                borderBottom="1px"
                                rounded="lg"
                                boxShadow="xl"
                              >
                                <IconButton
                                  colorScheme="red"
                                  aria-label="Search database"
                                  icon={<ArrowRightIcon />}
                                  onClick={() =>
                                    (window.location.href =
                                      "./PogledajKorisnika?i=" + user.id)
                                  }
                                />
                              </Stack>
                            </Td>
                            <Td>{user.ime}</Td>
                            <Td>{user.prezime}</Td>
                            <Td>{user.korisnickoIme}</Td>
                            <Td>{user.email}</Td>
                            {user.prosjecnaOcjena <= 1.5 && (
                              <Td textColor="red" fontSize="2xl">
                                {Math.round(
                                  (user.prosjecnaOcjena + Number.EPSILON) * 100
                                ) / 100}
                              </Td>
                            )}
                            {user.prosjecnaOcjena >= 1.5 && (
                              <Td fontSize="2xl">
                                {Math.round(
                                  (user.prosjecnaOcjena + Number.EPSILON) * 100
                                ) / 100}
                              </Td>
                            )}
                            {user.uloga === "user" && (
                              <Td>
                                <Button
                                  variant="solid"
                                  colorScheme="red"
                                  rightIcon={<ArrowRightIcon />}
                                  onClick={() =>
                                    setIsOpen({
                                      opened: true,
                                      ime: user.korisnickoIme,
                                      id: user.id,
                                    })
                                  }
                                >
                                  Obrisi
                                </Button>
                              </Td>
                            )}
                          </Tr>
                        );
                      })}
                    </Tbody>
                    <Tfoot>
                      <Tr>
                        <Th></Th>
                        <Th>Ime</Th>
                        <Th>Prezime</Th>
                        <Th>Korisnicko ime</Th>
                        <Th>Email</Th>
                        <Th>
                          <StarIcon color="red" />
                          &nbsp; Ocjena
                        </Th>
                      </Tr>
                    </Tfoot>
                  </Table>
                </Stack>
                <AlertDialog
                  isOpen={isOpen.opened}
                  leastDestructiveRef={cancelRef}
                  onClose={onClose}
                >
                  <AlertDialogOverlay>
                    <AlertDialogContent>
                      <AlertDialogHeader fontSize="lg" fontWeight="bold">
                        Obrisi korisnika
                      </AlertDialogHeader>

                      <AlertDialogBody>
                        Da li si siguran da zelis da obrises korisnika{" "}
                        {isOpen.ime}?
                      </AlertDialogBody>
                      <AlertDialogFooter>
                        <Button ref={cancelRef} onClick={onClose}>
                          Otkazi
                        </Button>
                        <Button
                          colorScheme="red"
                          onClick={() => {
                            ObrisiKorisnika(isOpen);
                          }}
                          ml={3}
                        >
                          Obrisi
                        </Button>
                      </AlertDialogFooter>
                    </AlertDialogContent>
                  </AlertDialogOverlay>
                </AlertDialog>
              </Box>
            </Flex>
          )}
        </>
      )}
      {!user && (
        <Stack direction="row" alignItems="center">
          <WarningTwoIcon />
          <Text>Potrebna administratorska prava!</Text>
          <WarningTwoIcon />
        </Stack>
      )}
      {user && (
        <>
          {user.uloga !== "admin" && (
            <Stack direction="row" alignItems="center">
              <WarningTwoIcon />
              <Text>Potrebna administratorska prava!</Text>
              <WarningTwoIcon />
            </Stack>
          )}
        </>
      )}
    </>
  );
};

export default MojeOcjene;
