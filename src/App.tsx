import { 
  Stage, 
  Layer, 
} from 'react-konva';
import Konva from 'konva';
import { Ruler, useRuler } from './Ruler';

export const App = () => {
  const ruler = useRuler();

  const handleContextMenu = (e: Konva.KonvaEventObject<MouseEvent>) => {
    e.evt.preventDefault();
  };

  return (
    <Stage 
      width={window.innerWidth} 
      height={window.innerHeight}
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
  );
}
