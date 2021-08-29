import React, { useState, useEffect } from "react";
// pages
import {
  Box,
  Button,
  Flex,
  Spacer,
  Image,
  Stack,
  Center,
  Text,
  Redirect,
} from "@chakra-ui/react";
import { ArrowRightIcon } from "@chakra-ui/icons";
import { ColorModeSwitcher } from "./ColorModeSwitcher";
import LijeviMeni from "./LijeviMeni";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Pocetna from "./Pocetna";
import Login from "./login";
import PostaviOglas from "./postaviOglas";
import MojKp from "./MojKp";
import PregledOglasa from "./PregledOglasa";
import PogledajKorisnika from "./PogledajKorisnika";
import MojeOcjene from "./MojeOcjene";
import MojaObavjestenja from "./MojaObavjestenja";
import PregledKorisnika from "./PregledKorisnika";
import Logs from "./Logs";
const Layout = () => {
  const [user, setUser] = useState(null);
  useEffect(() => {
    setUser(JSON.parse(localStorage.getItem("user")));
  }, [localStorage.getItem("user")]);

  const logOut = () => {
    localStorage.clear();
    window.location.href = "./login";
  };
  return (
    <Box>
      <Flex
        align="center"
        boxShadow="dark-lg"
        p="2"
        mb="2"
        bgColor="DodgerBlue"
      >
        <Box
          display="flex"
          alignItems="center"
          justifyContent="space-between"
          bgColor="DodgerBlue"
          padding={2}
        >
          <Button
            onClick={() => (window.location.href = "./")}
            variant="ghost"
            textColor="gray.200"
            colorScheme="blue"
          >
            Pocetna stranica
          </Button>
          {user && (
            <>
              {user.uloga === "admin" && (
                <Button
                  onClick={() => (window.location.href = "./PregledKorisnika")}
                  variant="ghost"
                  textColor="gray.200"
                  colorScheme="blue"
                >
                  Pogledaj korisnike
                </Button>
              )}
            </>
          )}
          {user && (
            <>
              <Button
                onClick={() => (window.location.href = "./Logs")}
                variant="ghost"
                textColor="gray.200"
                colorScheme="blue"
              >
                Vasa aktivnost
              </Button>
              <Button
                onClick={logOut}
                variant="ghost"
                textColor="gray.200"
                colorScheme="blue"
              >
                Odjavi se
              </Button>
            </>
          )}
          {!user && (
            <Button
              onClick={() => (window.location.href = "./login")}
              variant="ghost"
              textColor="gray.200"
              colorScheme="blue"
            >
              Prijavi se
            </Button>
          )}
        </Box>
        <Spacer />
        {user && (
          <Box
            size="md"
            fontSize="lg"
            variant="ghost"
            color="current"
            marginLeft="2"
          >
            <Text textColor="white">{user.korisnickoIme}</Text>
          </Box>
        )}
        <Box>
          <ColorModeSwitcher />
        </Box>
      </Flex>
      <Flex>
        <LijeviMeni />
        <Stack alignContent="center">
          <Router>
            <Center>
              <Route path="/login" component={Login} />
            </Center>

            <Route exact path="/" component={Pocetna} />
            <Route path="/postaviOglas" component={PostaviOglas} />
            <Route path="/MojKp" component={MojKp} />
            <Route path="/PregledOglasa" component={PregledOglasa} />
            <Route path="/PogledajKorisnika" component={PogledajKorisnika} />
            <Route path="/MojeOcjene" component={MojeOcjene} />
            <Route path="/MojaObavjestenja" component={MojaObavjestenja} />
            <Route path="/PregledKorisnika" component={PregledKorisnika} />
            <Route path="/Logs" component={Logs} />
          </Router>
        </Stack>
      </Flex>
    </Box>
  );
};

export default Layout;
