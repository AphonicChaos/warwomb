import { 
  useState, 
  useEffect, 
  ChangeEvent, 
  FocusEvent, 
} from 'react';
import { 
  ChakraProvider,
  Grid,
  GridItem,
  useDisclosure,
} from '@chakra-ui/react';
import { Table } from './Table';
import { theme } from './theme';
import  { PageHeader } from './PageHeader';
import { PageFooter } from './PageFooter';
import { Toolbox } from './Toolbox';
import { Unit, UnitFaction, UnitType, BaseSize, SelectedUnit } from './types';
import useWebSocket from 'react-use-websocket';

const WS_URL = 'ws://localhost:8000/';

const rockyGroundUrl = 'https://www.myfreetextures.com/wp-content/uploads/2012/05/2011-06-11-09606.jpg';

const units: Unit[] = [
  {
    name: "Scourge",
    faction: UnitFaction.AeternusContinuum,
    type: UnitType.Warjack,
    size: BaseSize.Large,
  },
  {
    name: "Marauder",
    faction: UnitFaction.AeternusContinuum,
    type: UnitType.Solo,
    size: BaseSize.Medium
  },
  {
    name: "Talons",
    faction: UnitFaction.AeternusContinuum,
    type: UnitType.Squad,
    size: BaseSize.Small,
    models: 3
  }
];

const Root = () => {
  const { sendJsonMessage, lastMessage } = useWebSocket(WS_URL, {
    onOpen: () => {
      console.log("WebSocket connection established");
    }
  });

  const { 
    isOpen: toolboxIsOpen,
    onOpen: onToolboxOpen,
    onClose: onToolboxClose
  } = useDisclosure();
  const [size, setSize] = useState(600);
  const [gameType, setGameType] = useState('skirmish');
  const [mapUrl, setMapUrl] = useState(rockyGroundUrl);
  const [pixelsPerInch, setPixelsPerInch] = useState(0);

  useEffect(() => {
    setPixelsPerInch(
      (size - 60) / (gameType === 'skirmish' ? 30 : 48)
    );
  }, [size, pixelsPerInch, gameType])

  // primary games are 48" x 48"
  // skirmish games are 30" x 30"

  const handleMapUrlUpdated = (e: FocusEvent<HTMLInputElement>) => {
    setMapUrl(e.target.value);
  };

  const handleGameTypeChanged = (e: ChangeEvent<HTMLSelectElement>) => {
    setGameType(e.target.value);
  };

  const handleTableSizeChanged = (value: number) => {
    setSize(value);
  };

  const [selectedUnit, setSelectedUnit] = useState<SelectedUnit>();

  const handleUnitSelected = (unit: Unit, index: number) => {
    setSelectedUnit({
      ...unit,
      index
    });
  };

  const handleWebSocket = () => {
    lastMessage && console.log(lastMessage.data);
    sendJsonMessage({
      message: "HELLO"
    });
  };

  return (
    <Grid
      templateAreas={`"header"
                      "main"
                      "footer"`}
      gridTemplateRows={'50px 1fr 50px'}
      gridTemplateColumns={'1fr'}
      boxSizing='border-box'
      overflow='hidden'
      h='calc(100vh - 20px)'
    >
      <GridItem area="header">
        <PageHeader onToolboxOpen={handleWebSocket} />
      </GridItem>
      <GridItem area="main">
        <Toolbox 
          isOpen={toolboxIsOpen} 
          onClose={onToolboxClose} 
          mapUrl={mapUrl}
          onMapUrlUpdated={handleMapUrlUpdated}
          gameType={gameType}
          onGameTypeChanged={handleGameTypeChanged}
          onTableSizeChanged={handleTableSizeChanged}
        />
        <Table 
          backgroundUrl={mapUrl} 
          pixelsPerInch={pixelsPerInch}
          size={size} 
          selectedUnit={selectedUnit}
          onUnitPlaced={() => setSelectedUnit(undefined)}
        />
      </GridItem>
      <GridItem area="footer">
        <PageFooter onUnitSelected={handleUnitSelected} units={units} />
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
