import React from "react";
import { Box, Progress, Text } from "@chakra-ui/react";

const AssetsLiabilitiesChart = ({ bankId, ratio }) => {
  return (
    <Box>
      <Text>{bankId} Assets / Liabilities Ratio</Text>
      <Progress value={ratio * 100} colorScheme="pink" size="lg" />
    </Box>
  );
};

export default AssetsLiabilitiesChart;
