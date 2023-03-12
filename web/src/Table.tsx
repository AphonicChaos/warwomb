import { WheelEvent, useRef, useState } from 'react';
import { useMouseHovered } from 'react-use';
import { Flex, Box, chakra, shouldForwardProp } from '@chakra-ui/react';
import { TableToken } from './TableToken';
import { PlacedUnit, SelectedUnit } from './types';

import { 
  motion,
  isValidMotionProp,
  useMotionValue
} from 'framer-motion';

const ChakraBox = chakra(motion.div, {
  shouldForwardProp: prop =>
    isValidMotionProp(prop) || shouldForwardProp(prop)
});

export type TableProps = {
  size?: number;
  backgroundUrl: string;
  pixelsPerInch: number;
  selectedUnit?: SelectedUnit;
  onUnitPlaced: () => void;
};

const clamp = (value: number, lowerBound: number, upperBound: number) => Math.max(
  lowerBound,
  Math.min(
    upperBound,
    value
  )
);

export const Table = ({ 
  size = window.innerHeight,
  backgroundUrl,
  pixelsPerInch,
  onUnitPlaced,
  selectedUnit
}: TableProps) => {
  const ref = useRef(null);
  const { elX, elY,  } = useMouseHovered(ref, {
    bound: true,
    whenHovered: true
  });
  const scale = useMotionValue(1.0);

  const handleWheel = (e: WheelEvent) => {

    const oldScale = scale.get();
    const newScale = clamp(
      oldScale + (e.deltaY < 0 ? 0.2 : -0.2),
      1,
      3
    );
    scale.set(newScale);
  };

  const [units, setUnits] = useState<PlacedUnit[]>([]);
  const handleClick = () => {
    if (selectedUnit) {
      setUnits([
        ...units,
        {
          ...selectedUnit,
          x: elX,
          y: elY
        },
      ]);
      onUnitPlaced();
    }
  };


  return (
    <Flex
      justify="center"
      align="center"
      height="100%"
    >
      <Box overflow="hidden" w={size} h={size}>
        <ChakraBox
          ref={ref}
          onWheel={handleWheel}
          onClick={handleClick}
          animate={{
            width: size,
            height: size
          }}
          style={{
            scale
          }}
          bgImage={`url(${backgroundUrl})`}
          borderRadius="lg"
          w={size}
          h={size}
        >
        {selectedUnit && elX && elY && (
          <TableToken 
            unit={selectedUnit} 
            pixelsPerInch={pixelsPerInch} 
            x={elX}
            y={elY}
          />
        )}
        {units.map((unit: PlacedUnit) => (
          <TableToken 
            key={unit.index}
            unit={unit} 
            pixelsPerInch={pixelsPerInch} 
            x={unit.x}
            y={unit.y}
            placed
          />
        ))}
        </ChakraBox>
      </Box>
    </Flex>
  );
}
