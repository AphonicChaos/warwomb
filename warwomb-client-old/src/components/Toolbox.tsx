import { ChangeEventHandler, FocusEventHandler } from 'react';
import { useAuth0 } from "@auth0/auth0-react";
import {
  Box,
  Button,
  Drawer,
  DrawerBody,
  DrawerCloseButton,
  DrawerContent,
  DrawerHeader,
  DrawerOverlay,
  FormLabel,
  Input,
  Select,
  Divider,
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
  const { logout, loginWithRedirect, isAuthenticated, user } = useAuth0();
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
        Settings
        </DrawerHeader>
        <DrawerBody>
          <Stack spacing='24px'>
            <Button
              onClick={() =>
                isAuthenticated
                  ? logout()
                  : loginWithRedirect()
              }
            >
              {isAuthenticated ? 'Log Out' : 'Log In'}
            </Button>
            {isAuthenticated && user && (
              <>
                <Box>
                  <FormLabel htmlFor='name'>Name</FormLabel>
                  <Input
                    id='name'
                    value={user.name}
                    readOnly
                  />
                </Box>
                <Box>
                  <FormLabel htmlFor='email'>Email</FormLabel>
                  <Input
                    id='email'
                    value={user.email}
                    readOnly
                  />
                </Box>
                <Divider />
              </>
            )}
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
