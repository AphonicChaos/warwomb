import { Outlet } from 'react-router-dom';
import { 
  Link,
  Flex,
  Grid,
  GridItem,
  Spacer,
} from '@chakra-ui/react';

export type LayoutProps = {
  showNavBar?: boolean
};

export const Layout: React.FC<LayoutProps> = ({
  showNavBar = false
}) => (
  <Grid
    h="100vh"
    templateColumns="1fr"
    templateRows={showNavBar ? "3rem 1fr" : "1fr"}
  >
    {showNavBar && (
      <GridItem bg="red.900">
        <Flex p="4" align="center" h="full">
          <Spacer />
          <Link>Log In</Link>
        </Flex>
      </GridItem>
    )}
    <GridItem>
      <Flex h="full" align="center" justify="center">
        <Outlet />
      </Flex>
    </GridItem>
  </Grid>
);
