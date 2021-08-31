import React, { useState, useEffect } from "react";
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
  AlertDialog,
  AlertDialogBody,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogContent,
  AlertDialogOverlay,
} from "@chakra-ui/react";
import { Collapse } from "@chakra-ui/transition";

import {
  PhoneIcon,
  AddIcon,
  WarningIcon,
  ChevronDownIcon,
  SearchIcon,
  EmailIcon,
  LockIcon,
  InfoIcon,
  StarIcon,
  ArrowRightIcon,
  ChatIcon,
} from "@chakra-ui/icons";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { convertToObject } from "typescript";
import { getUserById } from "./UserService";
import { getOcjeneForUser } from "./OcjenaService";
const MojeOcjene = () => {
  const [user, setUser] = useState(JSON.parse(localStorage.getItem("user")));
  const [items, setItems] = useState([]);
  const [isOpen, setIsOpen] = React.useState(false);
  const onClose = () => setIsOpen(false);
  const cancelRef = React.useRef();
  useEffect(() => {
    getOcjeneForUser(user.id)
      .then((item) => {
        console.log("then");
        setItems(item.data);
        console.log(item.data);
      })
      .then(() => {});
    console.log(items);
    //  }
  }, []);

  return (
    <Box margin={4} borderRadius="lg" borderColor="gray.300" rounded="lg">
      <Stack direction="column">
        <Button
          colorScheme="red"
          onClick={() => setIsOpen(true)}
          alignContent="center"
        >
          Informacije &nbsp;
          <InfoIcon />
        </Button>
        <AlertDialog
          isOpen={isOpen}
          leastDestructiveRef={cancelRef}
          onClose={onClose}
        >
          <AlertDialogOverlay>
            <AlertDialogContent>
              <AlertDialogHeader
                fontSize="lg"
                fontWeight="bold"
                alignItems="center"
              >
                <InfoIcon color="red" />
                Informacije o ocjenama:
              </AlertDialogHeader>

              <AlertDialogBody>
                Ukoliko budete imali puno losih ocjena i prosjek se svede ispod
                1.5 postoji mogucnost trajnog brisanja vaseg profila!
              </AlertDialogBody>

              <AlertDialogFooter>
                <Button ref={cancelRef} onClick={onClose}>
                  Zatvori
                </Button>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialogOverlay>
        </AlertDialog>
        <List spacing={3}>
          {items.map((item) => {
            const {
              komentar,
              brOcjene,
              korisnickoIme,
              idKorisnika,
              idKorisnikaOcijenjenog,
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
                  <IconButton
                    colorScheme="red"
                    aria-label="Search database"
                    icon={<ArrowRightIcon />}
                    onClick={() =>
                      (window.location.href =
                        "./PogledajKorisnika?i=" + item.idKorisnika)
                    }
                  />
                  <Stack padding={2} direction="row" alignItems="center">
                    <Text>{item.korisnickoIme}</Text>
                    {item.brOcjene === 1 && <StarIcon color="red.500" />}
                    {item.brOcjene === 2 && (
                      <>
                        <StarIcon color="red.500" />
                        <StarIcon color="red.500" />
                      </>
                    )}
                    {item.brOcjene === 3 && (
                      <>
                        <StarIcon color="red.500" />
                        <StarIcon color="red.500" />
                        <StarIcon color="red.500" />
                      </>
                    )}
                    {item.brOcjene === 4 && (
                      <>
                        <StarIcon color="red.500" />
                        <StarIcon color="red.500" />
                        <StarIcon color="red.500" />
                        <StarIcon color="red.500" />
                      </>
                    )}
                    {item.brOcjene === 5 && (
                      <>
                        <StarIcon color="red.500" />
                        <StarIcon color="red.500" />
                        <StarIcon color="red.500" />
                        <StarIcon color="red.500" />
                        <StarIcon color="red.500" />
                      </>
                    )}
                  </Stack>
                </Stack>
              </ListItem>
            );
          })}
        </List>
      </Stack>
    </Box>
  );
};

export default MojeOcjene;
