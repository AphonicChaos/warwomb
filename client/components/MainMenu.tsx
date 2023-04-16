import { 
  Link as RouterLink ,
} from 'react-router-dom';
import { 
  Link,
  StackDivider,
  VStack,
} from '@chakra-ui/react';

export const MainMenu = () => {
  return (
    <VStack spacing="4" divider={<StackDivider />}>
      <Link as={RouterLink} to='/play'>Play</Link> 
      <Link as={RouterLink} to='/build'>Build</Link> 
      <Link as={RouterLink} to='/learn'>Learn</Link> 
      <Link as={RouterLink} to='/settings'>Settings</Link> 
    </VStack>
  );
};
