import useWebSocket from 'react-use-websocket';

const HOST: string = 'ws://localhost:8000/ws/';

export type IUseApi = {
  echo: (message: string) => void;
  data: Record<string, any>;
};

export const useApi = (): IUseApi => {
  const { sendJsonMessage, lastMessage } = useWebSocket(HOST, {
    onOpen: () => {
      console.debug("WebSocket connection established");
    }
  });

  return { 
    echo: (message: string) => sendJsonMessage({
      message
    }),
    data: JSON.parse(lastMessage?.data ?? '{}')
  };
};
