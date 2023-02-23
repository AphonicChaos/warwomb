import { 
  Box,
  ChakraProvider,
  Drawer,
  DrawerBody,
  DrawerCloseButton,
  DrawerContent,
  DrawerHeader,
  DrawerOverlay,
  Flex,
  IconButton,
  Spacer,
  useColorMode,
  useDisclosure,
} from '@chakra-ui/react';
import { Table } from './Table';
import { theme } from './theme';
import { SunIcon, MoonIcon, HamburgerIcon } from '@chakra-ui/icons';

const rockyGroundUrl = 'https://www.myfreetextures.com/wp-content/uploads/2012/05/2011-06-11-09606.jpg';

const Root = () => {
  const { colorMode, toggleColorMode } = useColorMode();
  const { 
    isOpen: toolboxIsOpen,
    onOpen: onToolboxOpen,
    onClose: onToolboxClose
  } = useDisclosure();

  return (
    // outer container
    <Flex flexDirection="column" height="100%">
      {/* top icons */}
      <Flex>
        <IconButton 
          aria-label='Menu'
          icon={<HamburgerIcon />}
          onClick={onToolboxOpen}
        />
        <Spacer />
        <IconButton 
          aria-label='Color mode'
          icon={
            colorMode === 'dark'
            ? <SunIcon />
            : <MoonIcon />
          }
          onClick={toggleColorMode}
        />
      </Flex>
      <Box>
        <Drawer
          isOpen={toolboxIsOpen}
          placement="left"
          onClose={onToolboxClose}
        >
          <DrawerOverlay />
          <DrawerContent>
            <DrawerCloseButton />
            <DrawerHeader>
            Tools
            </DrawerHeader>
            <DrawerBody>
            <p>
                Here is where all the various tools you might
                need during a game would go.
            </p>
            </DrawerBody>
          </DrawerContent>
        </Drawer>
        <Table width={800} height={600} backgroundUrl={rockyGroundUrl} />
      </Box>
      <Spacer />
      {/* Hand */}
    </Flex>
  );
};

export const App = () => {
  return (
    <ChakraProvider theme={theme}>
      <Root />
    </ChakraProvider>
  );
};
