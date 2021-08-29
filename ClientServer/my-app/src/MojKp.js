import React, { useState } from "react";
import MojNalog from "./MojNalog";
import MojiOglasi from "./MojiOglasi";
import {
  Box,
  Flex,
  Image,
  useColorMode,
  Stack,
  Text,
  Tabs,
  TabList,
  Tab,
  TabPanel,
  TabPanels,
} from "@chakra-ui/react";
import {
  PhoneIcon,
  AddIcon,
  WarningIcon,
  ChevronDownIcon,
  SearchIcon,
} from "@chakra-ui/icons";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
const MojKp = () => {
  const [tabIndex, setTabIndex] = React.useState(0);
  const { colorMode } = useColorMode();

  const handleTabsChange = (index) => {
    setTabIndex(index);
  };

  return (
    <Box
      margin={4}
      p={4}
      bgColor={colorMode === "dark" ? "gray.600" : "blue.400"}
      boxShadow="dark-lg"
      rounded="lg"
    >
      <Tabs index={tabIndex} onChange={handleTabsChange}>
        <TabList borderColor="red" textColor="white">
          <Tab>Moj nalog</Tab>
          <Tab>Moji oglasi</Tab>
        </TabList>
        <TabPanels>
          <TabPanel>
            <MojNalog />
          </TabPanel>
          <TabPanel>
            <MojiOglasi />
          </TabPanel>
        </TabPanels>
      </Tabs>
    </Box>
  );
};

export default MojKp;
