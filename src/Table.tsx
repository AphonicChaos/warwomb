import { 
  Stage, 
  Layer, 
  Text,
  Image
} from 'react-konva';
import Konva from 'konva';
import { Box } from '@chakra-ui/react';
import { Ruler, useRuler } from './Ruler';
import useImage from 'use-image';

export type TableProps = {
  width?: number;
  height?: number;
  backgroundUrl: string;
};

export const Table = ({ 
  width = window.innerWidth,
  height = window.innerHeight,
  backgroundUrl
}: TableProps) => {
  const defaultScale = {
    x: 0.30,
    y: 0.30
  };
  const ruler = useRuler();
  const [backgroundImage, backgroundLoading] = useImage(backgroundUrl);

  const handleContextMenu = (e: Konva.KonvaEventObject<MouseEvent>) => {
    e.evt.preventDefault();
  };

  const handleWheel = (e: Konva.KonvaEventObject<WheelEvent>) => {
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
      ? Math.min(3, oldScale * scaleBy)
      : Math.max(1, oldScale / scaleBy);

    stage.scale({ x: newScale, y: newScale });

    const newPos = {
      x: pointer.x - mousePointTo.x * newScale,
      y: pointer.y - mousePointTo.y * newScale
    };

    stage.position(newPos);
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
        onWheel={handleWheel}
      >
        <Layer>
          {backgroundLoading === "loading" ? (
            <Text text="Background loading, please waite..." />
          ) : (
            <Image image={backgroundImage} scale={defaultScale} />
          )}
        </Layer>
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
