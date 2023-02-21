import { ChakraProvider, Button, ColorModeScript, useColorMode } from '@chakra-ui/react';
import { theme } from './theme';

const Root = () => {
  const { colorMode, toggleColorMode } = useColorMode();
  console.log(colorMode);
  return (
    <Button 
      onClick={toggleColorMode}
    >
      Hi
    </Button>
  );
};

export const App = () => {
  return (
    <ChakraProvider theme={theme}>
      <Root />
    </ChakraProvider>
  );
};
