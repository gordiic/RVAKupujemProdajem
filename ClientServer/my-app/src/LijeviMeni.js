import React, { useState } from "react";
// pages
import {
  Box,
  Button,
  Grid,
  GridItem,
  Flex,
  Spacer,
  Image,
  Stack,
  Text,
  useColorMode,
} from "@chakra-ui/react";
import {
  ArrowRightIcon,
  EmailIcon,
  BellIcon,
  StarIcon,
} from "@chakra-ui/icons";
import { ColorModeSwitcher } from "./ColorModeSwitcher";

const LijeviMeni = () => {
  const { colorMode } = useColorMode();
  const [usr, setUser] = useState(localStorage.getItem("user"));

  const MojaObavjestenja = () => {
    const user = JSON.parse(localStorage.getItem("user"));
    if (user === null) {
      window.location.href = "./login";
    } else {
      window.location.href = "./MojaObavjestenja";
    }
  };
  const MojeOcjene = () => {
    const user = JSON.parse(localStorage.getItem("user"));
    if (user === null) {
      window.location.href = "./login";
    } else {
      window.location.href = "./MojeOcjene";
    }
  };

  const mojKp = () => {
    const user = JSON.parse(localStorage.getItem("user"));
    if (user === null) {
      window.location.href = "./login";
    } else {
      window.location.href = "./MojKp";
    }
  };

  const postaviOglas = () => {
    const user = JSON.parse(localStorage.getItem("user"));
    if (user === null) {
      window.location.href = "./login";
    } else {
      window.location.href = "./postaviOglas";
    }
  };
  return (
    <Flex width="250" margin="4">
      <Stack direction="column">
        <Image
          marginBlockEnd="25px"
          width={250}
          src="https://upload.wikimedia.org/wikipedia/commons/a/a6/KupujemProdajem_logo_500.png"
        />
        <Stack direction="column">
          <Grid templateColumns="repeat(4, 1fr)" gap={1} marginBlockEnd="10px">
            {/* <GridItem colSpan={2} h="2" bg="red" /> */}
            <GridItem colStart={1} colEnd={2} h="2" bg="red" />
            <GridItem colStart={2} colEnd={3} h="2" bg="yellow.300" />
            <GridItem colStart={3} colEnd={4} h="2" bg="green.400" />
            <GridItem colStart={4} colEnd={5} h="2" bg="blue.500" />
          </Grid>
          <Button
            variant="solid"
            colorScheme="red"
            rightIcon={<ArrowRightIcon />}
            onClick={postaviOglas}
            boxShadow="xl"
          >
            Postavite oglas
          </Button>
          <Button
            variant="solid"
            colorScheme={colorMode === "dark" ? "messenger" : "gray"}
            rightIcon={<ArrowRightIcon color="#000080" />}
            onClick={mojKp}
            boxShadow="xl"
          >
            <Text color="#000080">Moj </Text>
            <Text color="red">&nbsp; k</Text>
            <Text>p</Text>
          </Button>
          {usr !== null && (
            <Stack direction="column" padding={4}>
              <Button leftIcon={<EmailIcon />} boxShadow="xl">
                Poruke
              </Button>
              <Button
                leftIcon={<BellIcon />}
                onClick={MojaObavjestenja}
                boxShadow="xl"
              >
                Obavjestenja
              </Button>
              <Button
                leftIcon={<StarIcon />}
                onClick={MojeOcjene}
                boxShadow="xl"
              >
                Ocjene
              </Button>
            </Stack>
          )}
        </Stack>
      </Stack>
    </Flex>
  );
};

export default LijeviMeni;
