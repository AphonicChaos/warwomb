import {
  Circle,
  Text,
  Group
} from 'react-konva';
import { Unit, BaseSize } from './types';
import convert from 'convert-length';

type TableTokenProps = {
  unit: Unit,
  x: number;
  y: number;
  placed?: boolean;
  bg: string;
  pixelsPerInch: number;
};

const baseSizeToFontSize = (size: BaseSize): number => {
  if (size === BaseSize.Medium) {
    return 18;
  } else if (size === BaseSize.Large) {
    return 24;
  } else if (size === BaseSize.Huge) {
    return 28;
  }

  return 14;
};

export const TableToken = ({
  unit,
  x,
  y,
  bg,
  placed = false,
  pixelsPerInch,
}: TableTokenProps) => {
  const initials = unit.name.split(" ").map(n => n[0]).join("")
  const sizeIn = convert(unit.size, "mm", "in");
  const sizePx = convert(sizeIn, "in", "px", {
    pixelsPerInch
  });
  const radius = sizePx / 2;
  const fontSize = baseSizeToFontSize(unit.size);

  return (
    <Group 
      draggable 
      x={x} 
      y={y} 
    >
      <Circle 
        radius={radius} 
        fill={bg}
        opacity={placed ? 1 : 0.5}
      />
      <Text
        offsetX={fontSize / 2.5}
        offsetY={fontSize / 2.5}
        align='center'
        fontSize={fontSize}
        fontStyle="bold"
        text={initials}
        fill='white'
        verticalAlign='middle'
      />
    </Group>
  );
};
