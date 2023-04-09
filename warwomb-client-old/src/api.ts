import useWebSocket from 'react-use-websocket';

export type IUseApi = {
  echo: (message: string) => void;
  data: Record<string, any>;
};

export const useApi = (): IUseApi => {
  const { sendJsonMessage, lastMessage } = useWebSocket(process.env.WEBSOCKET_HOST || '', {
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
