import React from "react";
import { Box, Text } from "@chakra-ui/react";

const RevenueExpensesChart = ({ bankId, revenue, expenses }) => {
  const ratio = expenses !== 0 ? (revenue / expenses).toFixed(2) : 0;
  const barWidth = `${ratio * 100}%`;

  return (
    <Box width="100%" p={4} bg="gray.100">
      <Text mb={2}>
        {bankId} Revenue / Expenses Ratio: {ratio}
      </Text>
      <Box width={barWidth} bg="blue.500" p={2} color="white">
        {ratio}
      </Box>
    </Box>
  );
};

export default RevenueExpensesChart;
