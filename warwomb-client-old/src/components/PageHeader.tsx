import { MouseEventHandler } from 'react';
import {
  Flex,
  Spacer,
  IconButton,
  useColorMode,
} from '@chakra-ui/react';
import { SunIcon, MoonIcon, HamburgerIcon } from '@chakra-ui/icons';

export type PageHeaderProps = {
  onToolboxOpen: MouseEventHandler
};

export const PageHeader = ({
  onToolboxOpen
}: PageHeaderProps) => {
  const { colorMode, toggleColorMode } = useColorMode();
  return (
    <Flex m={4}>
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
  );
};
