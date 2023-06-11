import { isRouteErrorResponse, useRouteError } from "react-router-dom";
import { Flex, Text } from "@chakra-ui/react";

export const RoutingError = () => {
  const error = useRouteError();
  return (
    <Flex gap="4" direction="column" h="100vh" justify="center" align="center">
      <Text as="h1" fontSize="6xl">
        Oops!
      </Text>
      <Text fontSize="xl">Sorry, an unexpected error has occured.</Text>
      <Text as="i">
        {isRouteErrorResponse(error) ? error.statusText : error instanceof Error ? error.message : "Unknown Error"}
      </Text>
    </Flex>
  );
};
