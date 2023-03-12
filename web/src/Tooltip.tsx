import { 
  Label,
  Tag,
  Text,
} from 'react-konva';

export type TooltipProps = {
  x: number;
  y: number;
  text: string;
  opacity?: number;
  backgroundColor?: string;
  color?: string;
};

export const Tooltip = ({ 
  x,
  y,
  text,
  opacity = 0.75,
  backgroundColor = "black",
  color = "white"
}: TooltipProps) => {
  return (
    <Label x={x} y={y} opacity={opacity}>
      <Tag 
        fill={backgroundColor}
        pointerDirection='down'
        pointerWidth={20}
        pointerHeight={28}
        lineJoin="round"
      />
      <Text 
        text={text}
        fill={color}
        fontSize={18}
        fontStyle="bold"
        padding={5}
      />
    </Label>
  );
};
