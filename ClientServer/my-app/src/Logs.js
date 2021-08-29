import React, { useState, useEffect } from "react";

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
  Text,
  Td,
} from "@chakra-ui/react";
const Logs = () => {
  const [user, setUser] = useState(JSON.parse(localStorage.getItem("user")));
  const [logs, setLogs] = useState([]);
  useEffect(() => {
    setLogs(JSON.parse(localStorage.getItem("logs")));
  }, []);

  console.log(logs);
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
          {logs.length === 0 && (
            <TableCaption>Nema aktivnosti u sesiji</TableCaption>
          )}
          {logs.length !== 0 && (
            <TableCaption>Aktivnosti u sesiji</TableCaption>
          )}
          <Thead>
            <Tr>
              <Th>Datum</Th>
              <Th>Sati</Th>
              <Th>Aktivnost</Th>
            </Tr>
          </Thead>
          <Tbody>
            {logs.map((item) => {
              return (
                <Tr>
                  <Td>
                    <Text>{item.datum}</Text>
                  </Td>
                  <Td>
                    <Text>{item.vrijeme}</Text>
                  </Td>
                  <Td>
                    <Text>{item.poruka}</Text>
                  </Td>
                </Tr>
              );
            })}
          </Tbody>
          <Tfoot>
            <Tr>
              <Th>Datum</Th>
              <Th>Sati</Th>
              <Th>Aktivnost</Th>
            </Tr>
          </Tfoot>
        </Table>
      </Stack>
    </Box>
  );
};

export default Logs;
