import { SelectedUnit, BaseSize } from './types';
import { Avatar, chakra, shouldForwardProp } from '@chakra-ui/react';
import convert from 'convert-length';
import { bgList } from './utils';
import { motion, isValidMotionProp } from 'framer-motion';

type TableTokenProps = {
  unit: SelectedUnit,
  x: number;
  y: number;
  placed?: boolean;
  pixelsPerInch: number;
};

export const TableToken = ({
  unit,
  x,
  y,
  placed = false,
  pixelsPerInch,
}: TableTokenProps) => {
  const sizeIn = convert(unit.size, "mm", "in");
  const sizePx = convert(sizeIn, "in", "px", {
    pixelsPerInch
  });
  const relX = x - (sizePx / 2);
  const relY = y - (sizePx / 2);

  return (
    <Avatar
      drag
      dragMomentum={false}
      style={{
        cursor: placed ? 'auto': 'grab',
      }}
      as={motion.div}
      position="absolute"
      animate={{
        x: relX,
        y: relY
      }}
      opacity={placed ? 1 : 0.5}
      initial={{
        x: relX,
        y: relY
      }}
      w={`${sizePx}px`}
      h={`${sizePx}px`}
      name={unit.name}
      bg={bgList[unit.index]} 
    />
  );
};
