import React, { useState, useEffect } from "react";
import { Box, Button, Container, Flex, FormControl, FormLabel, Input, Select, Text, useToast, VStack } from "@chakra-ui/react";
import { FaUpload } from "react-icons/fa";
import AssetsLiabilitiesChart from "../components/AssetsLiabilitiesChart";
import RevenueExpensesChart from "../components/RevenueExpensesChart";

const Index = () => {
  const [selectedBank, setSelectedBank] = useState([]);
  const [bankOptions, setBankOptions] = useState([]);
  const [showCharts, setShowCharts] = useState(false);
  const toast = useToast();

  const handleFileUpload = async (event) => {
    const file = event.target.files[0];
    if (file) {
      const text = await file.text();
      const rows = text.split("\n").map((row) => row.split(","));
      const banks = [...new Set(rows.map((row) => row[0]))].filter((bank) => bank !== "bank_id");
      setBankOptions(banks);
      toast({
        title: "File uploaded and processed.",
        description: "Your file has been uploaded and banks have been updated.",
        status: "success",
        duration: 5000,
        isClosable: true,
      });
    }
  };

  return (
    <Container maxW="container.xl">
      <Flex direction="column" my={10}>
        <Text fontSize="2xl" mb={5}>
          Financial Analysis Platform
        </Text>

        <Box p={5} shadow="md" borderWidth="1px">
          <VStack spacing={4} align="flex-start">
            <Text fontSize="xl">Client Dashboard</Text>
            <Select placeholder="Select banks" value={selectedBank} onChange={(e) => setSelectedBank([...e.target.selectedOptions].map((option) => option.value))} multiple>
              {bankOptions.map((bank) => (
                <option key={bank} value={bank}>
                  {bank}
                </option>
              ))}
            </Select>
            <Button onClick={() => setShowCharts(true)}>Run</Button>
            <Button ml={4} onClick={() => setShowCharts(false)}>
              Refresh
            </Button>
            {showCharts &&
              selectedBank.length > 0 &&
              selectedBank.map((bankId) => (
                <VStack key={bankId} spacing={4}>
                  <AssetsLiabilitiesChart bankId={bankId} />
                  <RevenueExpensesChart bankId={bankId} />
                </VStack>
              ))}
          </VStack>
        </Box>

        <Box p={5} shadow="md" borderWidth="1px" mt={10}>
          <VStack spacing={4} align="flex-start">
            <Text fontSize="xl">Advisor Dashboard</Text>
            <FormControl>
              <FormLabel htmlFor="file-upload">Upload data (CSV)</FormLabel>
              <Flex alignItems="center">
                <Input type="file" id="file-upload" onChange={handleFileUpload} hidden />
                <Button leftIcon={<FaUpload />} onClick={() => document.getElementById("file-upload").click()}>
                  Upload File
                </Button>
              </Flex>
            </FormControl>
          </VStack>
        </Box>
      </Flex>
    </Container>
  );
};

export default Index;
