import { extendTheme, type ThemeConfig } from '@chakra-ui/react';

const config: ThemeConfig = {
  initialColorMode: 'dark',
  useSystemColorMode: false
};

const styles = {
  global: {
    'html, body': {
      margin: '10px',
      marginBottom: 0,
      height: 'calc(100vh - 20px)',
      overflow: 'hidden'
    },
    '#root': {
      height: '100%'
    }
  }
};

export const theme = extendTheme({ config, styles });
