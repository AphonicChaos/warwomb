import { Avatar, Flex } from "@chakra-ui/react";

export type Player = {
  name: string;
  color: string;
};

export type Token = {
  name: string;
};

export type TokenDisplayProps = {
  player: Player;
  tokens: Token[];
};
export const TokenDisplay: React.FC<TokenDisplayProps> = ({ player, tokens }) => {
  return (
    <Flex gap="2" direction="column" h="full" align="center">
      <Avatar bg={`${player.color}.900`} name={player.name} />
      {tokens.map((token) => (
        <Avatar key={token.name} size="sm" bg={`${player.color}.500`} name={token.name} />
      ))}
    </Flex>
  );
};
