import { MouseEventHandler } from 'react';
import { 
  Avatar,
  Box, 
  Flex, 
  IconButton, 
  Icon,
  Menu,
  MenuButton,
  MenuItem,
  MenuList
} from '@chakra-ui/react';
import { FaUsers } from 'react-icons/fa';

export type PageFooterProps = {
  onUnitSelected: (unit: string) => void;
};

export const PageFooter = ({
  onUnitSelected
}: PageFooterProps) => {

  return (
    <Flex m={4} align="center" justify="center" position='relative'>
      <Menu>
        <MenuButton 
          as={IconButton} 
          position='absolute'
          left={0}
          aria-label='Menu'
          icon={<Icon as={FaUsers} />}
        />
        <MenuList>
          {["Scourge", "Master Tulcan", "Talons"].map((unit: string, i: number) => (
            <MenuItem key={i} onClick={() => onUnitSelected(unit)}>
              <Avatar name={unit} mr={2} size="xs" />
              <span>{unit}</span>
            </MenuItem>
          ))}
        </MenuList>
      </Menu>
      <Box>
      Hand goes here
      </Box>
    </Flex>
  );
}
