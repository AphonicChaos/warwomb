import { useState, useEffect } from 'react';
import { Line } from 'react-konva';
import Konva from 'konva';
import { rounded } from './utils';


export const useRuler = () => {
  const [measuring, setMeasuring] = useState(false);
  const [points, setPoints] = useState<number[]>([]);
  const [distance, setDistance] = useState(0);

  useEffect(() => {
    if (points.length === 4) {
      const [a, b, x, y] = points;

      setDistance(Math.abs(rounded(Math.sqrt((x-a)**2 + (y-b)**2))));
    } else {
      setDistance(0);
    }
  }, [points]);

  const down = (e: Konva.KonvaEventObject<MouseEvent>) => {
    if (e.evt.button !== 2) return;

    setMeasuring(true);
    const { x, y }= e.target.getStage()?.getPointerPosition() ?? {x: 0, y: 0};
    setPoints([x, y])
  };

  const up = (e: Konva.KonvaEventObject<MouseEvent>) => {
    if (e.evt.button !== 2) return;

    setMeasuring(false);
    setPoints([]);
  };

  const move = (e: Konva.KonvaEventObject<MouseEvent>) => {
    if (!measuring) return;

    const { x, y } = e.target.getStage()?.getPointerPosition() ?? {x: 0, y: 0};
    setPoints([
      ...points.slice(0, 2),
      x,
      y
    ]);
  };

  console.log(points, distance);
  return { down, up, move, points, distance };
};

export type RulerProps = {
  points: number[];
  stroke?: string;
};

export const Ruler = ({ points, stroke = "black" }: RulerProps) => {
  return (
    <Line 
      stroke={stroke}
      points={points}
    />
  );
};
