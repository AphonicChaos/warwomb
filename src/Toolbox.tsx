import { 
  Drawer,
  DrawerBody,
  DrawerCloseButton,
  DrawerContent,
  DrawerHeader,
  DrawerOverlay,
} from '@chakra-ui/react';

export type ToolboxProps = {
  isOpen: boolean;
  onClose: () => void;
};

export const Toolbox = ({
  isOpen,
  onClose
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
  );
}
