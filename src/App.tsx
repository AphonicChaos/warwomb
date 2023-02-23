import { 
  useState, 
  useEffect, 
  ChangeEvent, 
  FocusEvent, 
  LegacyRef
} from 'react';
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
  const [gameType, setGameType] = useState('skirmish');
  const [mapUrl, setMapUrl] = useState(rockyGroundUrl);
  const [pixelsPerInch, setPixelsPerInch] = useState(0);

  useEffect(() => {
    if (size) {
      setPixelsPerInch(
        (size.height - 60) / (gameType === 'skirmish' ? 30 : 48)
      );
    }
  }, [size, pixelsPerInch, gameType])

  // primary games are 48" x 48"
  // skirmish games are 30" x 30"

  const handleMapUrlUpdated = (e: FocusEvent<HTMLInputElement>) => {
    setMapUrl(e.target.value);
  };

  const handleGameTypeChanged = (e: ChangeEvent<HTMLSelectElement>) => {
    setGameType(e.target.value);
  };

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
      <GridItem area="main" ref={ref as LegacyRef<HTMLDivElement>}>
        <Toolbox 
          isOpen={toolboxIsOpen} 
          onClose={onToolboxClose} 
          mapUrl={mapUrl}
          onMapUrlUpdated={handleMapUrlUpdated}
          gameType={gameType}
          onGameTypeChanged={handleGameTypeChanged}
        />
        <Table 
          backgroundUrl={mapUrl} 
          pixelsPerInch={pixelsPerInch}
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
