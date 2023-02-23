import { 
  Stage, 
  Layer, 
  Image
} from 'react-konva';
import Konva from 'konva';
import { Flex, Box } from '@chakra-ui/react';
import { Ruler, useRuler } from './Ruler';
import useImage from 'use-image';

export type TableProps = {
  size?: number;
  backgroundUrl: string;
};

export const Table = ({ 
  size = window.innerHeight,
  backgroundUrl
}: TableProps) => {
  console.log("size", size);
  console.log('primary games are 48" x 48"');
  console.log('skirmish games are 30" x 30"');
  const ruler = useRuler();
  const [backgroundImage] = useImage(backgroundUrl);

  const handleContextMenu = (e: Konva.KonvaEventObject<MouseEvent>) => {
    e.evt.preventDefault();
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

  return (
    <Flex
      justify="center"
      align="center"
      height="100%"
    >
      <Box>
        <Stage
          width={size} 
          height={size}
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
