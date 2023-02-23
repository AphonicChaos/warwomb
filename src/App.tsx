import { 
  ChakraProvider,
  Flex,
  Grid,
  GridItem,
  useDisclosure,
} from '@chakra-ui/react';
import { Table } from './Table';
import { theme } from './theme';
import  { PageHeader } from './PageHeader';
import { Toolbox } from './Toolbox';
import { useMeasure } from '@react-hookz/web';

const rockyGroundUrl = 'https://www.myfreetextures.com/wp-content/uploads/2012/05/2011-06-11-09606.jpg';

const Root = () => {
  const { 
    isOpen: toolboxIsOpen,
    onOpen: onToolboxOpen,
    onClose: onToolboxClose
  } = useDisclosure();
  const [size, ref] = useMeasure(true);

  return (
    <Grid
      templateAreas={`"header"
                      "main"
                      "footer"`}
      gridTemplateRows={'50px 1fr 50px'}
      gridTemplateColumns={'1fr'}
      h='100vh'
    >
      <GridItem area="header">
        <PageHeader onToolboxOpen={onToolboxOpen} />
      </GridItem>
      {/* @ts-ignore */}
      <GridItem area="main" ref={ref}>
        <Toolbox isOpen={toolboxIsOpen} onClose={onToolboxClose} />
        <Table 
          backgroundUrl={rockyGroundUrl} 
          size={size && size.height - 50} 
        />
      </GridItem>
      <GridItem area="footer">
        <Flex justifyContent="center">
          Hand goes here
        </Flex>
      </GridItem>
    </Grid>
  );
};

export const App = () => {
  return (
    <ChakraProvider theme={theme}>
      <Root />
    </ChakraProvider>
  );
};
