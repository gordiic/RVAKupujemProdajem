import React, { useState } from "react";
// pages
import {
  Box,
  Button,
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
          width={250}
          src="https://upload.wikimedia.org/wikipedia/commons/a/a6/KupujemProdajem_logo_500.png"
        />
        <Button
          variant="solid"
          colorScheme="red"
          rightIcon={<ArrowRightIcon />}
          onClick={postaviOglas}
        >
          Postavite oglas
        </Button>
        <Button
          variant="solid"
          colorScheme={colorMode === "dark" ? "messenger" : "gray"}
          rightIcon={<ArrowRightIcon color="#000080" />}
          onClick={mojKp}
        >
          <Text color="#000080">Moj </Text>
          <Text color="red">&nbsp; k</Text>
          <Text>p</Text>
        </Button>
        {usr !== null && (
          <Stack direction="column" padding={4}>
            <Button leftIcon={<EmailIcon />}>Poruke</Button>
            <Button leftIcon={<BellIcon />} onClick={MojaObavjestenja}>
              Obavjestenja
            </Button>
            <Button leftIcon={<StarIcon />} onClick={MojeOcjene}>
              Ocjene
            </Button>
          </Stack>
        )}
      </Stack>
    </Flex>
  );
};

export default LijeviMeni;
