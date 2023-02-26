import { useRef, useState } from 'react';
import { useMouseHovered } from 'react-use';
import { 
  Stage, 
  Layer, 
  Image,
} from 'react-konva';
import Konva from 'konva';
import { Flex, Box } from '@chakra-ui/react';
import { Ruler, useRuler } from './Ruler';
import { TableToken } from './TableToken';
import useImage from 'use-image';
import { PlacedUnit, SelectedUnit } from './types';
import uuid from 'react-uuid';
import { bgList } from './utils';

export type TableProps = {
  size?: number;
  backgroundUrl: string;
  pixelsPerInch: number;
  selectedUnit?: SelectedUnit;
  onUnitPlaced: () => void;
};

export const Table = ({ 
  size = window.innerHeight,
  backgroundUrl,
  pixelsPerInch,
  onUnitPlaced,
  selectedUnit
}: TableProps) => {
  const ruler = useRuler(pixelsPerInch);
  const [backgroundImage] = useImage(backgroundUrl);

  const handleContextMenu = (e: Konva.KonvaEventObject<MouseEvent>) => {
    e.evt.preventDefault();
  };

  const [units, setUnits] = useState<PlacedUnit[]>([]);
  const handleClick = (e: Konva.KonvaEventObject<MouseEvent>) => {
    const stage = e.currentTarget;
    const pointer = stage.getRelativePointerPosition();
    if (selectedUnit) {
      setUnits([
        ...units,
        {
          ...selectedUnit,
          x: pointer.x,
          y: pointer.y,
        },
      ]);
      onUnitPlaced();
    }
  };

  const handleWheel = (e: Konva.KonvaEventObject<WheelEvent>) => {
    e.evt.preventDefault();
    const stage = e.currentTarget;
    const oldScale = stage.scaleX();
    const pointer = stage.getRelativePointerPosition();
    const scaleBy = 1.1;

    const mousePointTo = {
        x: (pointer.x - stage.x()) / oldScale,
        y: (pointer.y - stage.y()) / oldScale
    };

    let direction = (
      e.evt.deltaY > 0 ? 1 : -1
    ) / (e.evt.ctrlKey ? -1 : 1);

    const newScale = direction > 0 
      ? Math.min(5, oldScale * scaleBy)
      : Math.max(1, oldScale / scaleBy);

    stage.scale({ x: newScale, y: newScale });

    const newPos = {
      x: pointer.x - mousePointTo.x * newScale,
      y: pointer.y - mousePointTo.y * newScale
    };

    stage.position(newPos);
  };


  const mouseRef = useRef(null);
  const { elX, elY} = useMouseHovered(mouseRef, {
    whenHovered: true,
    bound: true
  });

  return (
    <Flex
      style={selectedUnit && {
        cursor: "none"
      }}
      justify="center"
      align="center"
      height="100%"
    >
      <Box ref={mouseRef}>
        <Stage
          width={size} 
          height={size}
          onClick={handleClick}
          onContextMenu={handleContextMenu}
          onMouseDown={ruler.down}
          onMouseUp={ruler.up}
          onMouseMove={ruler.move}
          onWheel={handleWheel}
        >
          <Layer>
            <Image
              image={backgroundImage}
              width={size}
              height={size}
            />
            {selectedUnit && (
              <TableToken
                pixelsPerInch={pixelsPerInch}
                unit={selectedUnit}
                x={elX}
                y={elY}
                bg={bgList[selectedUnit.index]}
              />
            )}
            {units.map((unit: PlacedUnit) => (
              <TableToken
                pixelsPerInch={pixelsPerInch}
                key={uuid()}
                unit={unit}
                x={unit.x}
                y={unit.y}
                bg={bgList[unit.index]}
                placed
              />
            ))}
            <Ruler
              stroke="black"
              points={ruler.points}
              distance={ruler.distance}
            />
          </Layer>
        </Stage>
      </Box>
    </Flex>
  );
}
