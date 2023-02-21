import { useState } from 'react';
import { Line } from 'react-konva';
import Konva from 'konva';

export const useRuler = () => {
  const [measuring, setMeasuring] = useState(false);
  const [points, setPoints] = useState<number[]>([]);

  const down = (e: Konva.KonvaEventObject<MouseEvent>) => {
    if (e.evt.button !== 2) return;

    setMeasuring(true);
    const point = e.target.getStage()?.getPointerPosition() ?? {x: 0, y: 0};
    setPoints([point.x, point.y])
  };

  const up = (e: Konva.KonvaEventObject<MouseEvent>) => {
    if (e.evt.button !== 2) return;

    setMeasuring(false);
    setPoints([]);
  };

  const move = (e: Konva.KonvaEventObject<MouseEvent>) => {
    if (!measuring) return;

    const point = e.target.getStage()?.getPointerPosition() ?? {x: 0, y: 0};
    setPoints([
      ...points.slice(0, 2),
      point.x,
      point.y
    ]);
  };

  return { down, up, move, points };
};

export type RulerProps = {
  points: number[];
};

export const Ruler = ({ points }: RulerProps) => {
  return (
    <Line 
      stroke="black"
      points={points}
    />
  );
};
