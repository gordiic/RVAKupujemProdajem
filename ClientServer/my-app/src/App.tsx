import * as React from "react";
import { ChakraProvider, Box, Center, Grid, theme } from "@chakra-ui/react";
import Pocetna from "./Pocetna";
import Login from "./login";
import Layout from "./Layout";
import PostaviOglas from "./postaviOglas";
export const App = () => (
  <ChakraProvider theme={theme}>
    <Box fontSize="larger">
      <Layout />
      <Grid minH="100vh" m={10}></Grid>
    </Box>
  </ChakraProvider>
);
