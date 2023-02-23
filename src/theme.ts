import { extendTheme, type ThemeConfig } from '@chakra-ui/react';

const config: ThemeConfig = {
  initialColorMode: 'dark',
  useSystemColorMode: false
};

const styles = {
  global: {
    'html, body': {
      margin: 0,
      height: '100vh',
    },
    '#root': {
      height: '100%'
    }
  }
};

export const theme = extendTheme({ config, styles });
