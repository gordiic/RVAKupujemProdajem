import React, { useState, useEffect, useToast } from "react";
import { uploadOcjena } from "./OcjenaService";
import {
  TableCaption,
  Thead,
  Table,
  Tbody,
  Th,
  Tr,
  Tfoot,
  Button,
  Td,
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
import { getAllUsers, deleteUser } from "./UserService";
import { deleteItem } from "./ItemService";
const MojeOcjene = () => {
  let logs = JSON.parse(localStorage.getItem("logs"));
  const [user, setUser] = useState(JSON.parse(localStorage.getItem("user")));
  const [users, setUsers] = useState([]);

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
    <Box margin={4} borderRadius="lg" borderColor="gray.300" rounded="lg">
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
                        onClick={() => ObrisiKorisnika(user)}
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
    </Box>
  );
};

export default MojeOcjene;
