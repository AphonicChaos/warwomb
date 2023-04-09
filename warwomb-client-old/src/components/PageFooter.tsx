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
import { Unit } from '/src/types';
import { bgList } from '/src/utils';

export type PageFooterProps = {
  onUnitSelected: (unit: Unit, index: number) => void;
  units: Unit[];
};

export const PageFooter = ({
  onUnitSelected,
  units = []
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
          {units.map((unit: Unit, i: number) => (
            <MenuItem key={unit.name} onClick={() => onUnitSelected(unit, i)}>
              <Avatar name={unit.name} mr={2} size="xs" bg={bgList[i]} />
              <span>{unit.name}</span>
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
