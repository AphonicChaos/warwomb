import { 
  Stage, 
  Layer, 
} from 'react-konva';
import Konva from 'konva';
import { Box } from '@chakra-ui/react';
import { Ruler, useRuler } from './Ruler';

export type TableProps = {
  width?: number;
  height?: number;
};

export const Table = ({ 
  width = window.innerWidth,
  height = window.innerHeight
}: TableProps) => {
  const ruler = useRuler();

  const handleContextMenu = (e: Konva.KonvaEventObject<MouseEvent>) => {
    e.evt.preventDefault();
  };

  return (
    <Box 
      borderRadius="lg" 
      border="2px"
      my="2em"
      mx="auto"
      width={width}
      height={height}
    >
      <Stage 
        width={width} 
        height={height}
        onContextMenu={handleContextMenu}
        onMouseDown={ruler.down}
        onMouseUp={ruler.up}
        onMouseMove={ruler.move}
      >
        <Layer>
          <Ruler
            stroke="black"
            points={ruler.points}
            distance={ruler.distance}
          />
        </Layer>
      </Stage>
    </Box>
  );
}
