import { ChangeEventHandler, FocusEventHandler } from 'react';
import { 
  Box,
  Drawer,
  DrawerBody,
  DrawerCloseButton,
  DrawerContent,
  DrawerHeader,
  DrawerOverlay,
  FormLabel,
  Input,
  Select,
  Slider,
  SliderTrack,
  SliderFilledTrack,
  SliderThumb,
  Stack,
} from '@chakra-ui/react';

export type ToolboxProps = {
  isOpen: boolean;
  onClose: () => void;
  onMapUrlUpdated: FocusEventHandler;
  gameType: string;
  onGameTypeChanged: ChangeEventHandler;
  onTableSizeChanged: any;
  mapUrl: string;
};

export const Toolbox = ({
  isOpen,
  onClose,
  mapUrl,
  gameType,
  onMapUrlUpdated,
  onGameTypeChanged,
  onTableSizeChanged
}: ToolboxProps) => {
  return (
    <Drawer
      isOpen={isOpen}
      placement="left"
      onClose={onClose}
    >
      <DrawerOverlay />
      <DrawerContent>
        <DrawerCloseButton />
        <DrawerHeader>
        Table Configuration
        </DrawerHeader>
        <DrawerBody>
        <Stack spacing='24px'>
              <Box>
                <FormLabel htmlFor='map-url'>Map URL</FormLabel>
                <Input
                  id='map-url'
                  defaultValue={mapUrl}
                  onBlur={onMapUrlUpdated}
                  placeholder='Url for image to use as a map'
                />
              </Box>

              <Box>
                <FormLabel htmlFor='game-type'>Game Type</FormLabel>
                <Select 
                  id='game-type' 
                  value={gameType}
                  onChange={onGameTypeChanged}
                >
                  <option value='skirmish'>Skirmish</option>
                  <option value='primary'>Primary</option>
                </Select>
              </Box>
              <Box>
                <FormLabel htmlFor='game-type'>Table Size</FormLabel>
                <Slider defaultValue={600} min={500} max={800} step={100} onChange={onTableSizeChanged}>
                  <SliderTrack>
                    <SliderFilledTrack />
                  </SliderTrack>
                  <SliderThumb />
                </Slider>
              </Box>
            </Stack>
        </DrawerBody>
      </DrawerContent>
    </Drawer>
  );
}
