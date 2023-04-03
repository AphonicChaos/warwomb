import { extendTheme, type ThemeConfig } from '@chakra-ui/react';

const config: ThemeConfig = {
  initialColorMode: 'dark',
  useSystemColorMode: false
};

const styles = {
  global: {
    'body': {
      margin: 0,
    },
  }
};

export const theme = extendTheme({ config, styles });
