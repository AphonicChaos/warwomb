import {
  createBrowserRouter,
} from 'react-router-dom';

import { 
  Game,
  Layout,
  MainMenu,
  RoutingError,
} from './components';

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout showNavBar />,
    errorElement: <RoutingError />,
    children: [
      {
        path: "",
        element: <MainMenu />
      }
    ]
  },
  {
    path: "/play",
    element: <Layout />,
    children: [
      {
        path: "",
        element: <Game />
      }
    ]
  }
]);
