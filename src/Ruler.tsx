import { useState, useEffect } from 'react';
import { 
  Line,
} from 'react-konva';
import Konva from 'konva';
import { rounded } from './utils';
import { Tooltip } from './Tooltip';
import convert from 'convert-length';


export const useRuler = (pixelsPerInch: number = 96) => {
  const [measuring, setMeasuring] = useState(false);
  const [points, setPoints] = useState<number[]>([]);
  const [distance, setDistance] = useState(0);

  useEffect(() => {
    if (points.length === 4) {
      const [a, b, x, y] = points;

      setDistance(
        rounded(
          convert(
            Math.abs(
              Math.sqrt((x-a)**2 + (y-b)**2)
            ),
            'px',
            'in', {
              pixelsPerInch
            }
          )
        )
      );
    } else {
      setDistance(0);
    }
  }, [points]);

  const down = (e: Konva.KonvaEventObject<MouseEvent>) => {
    if (e.evt.button !== 2) return;

    setMeasuring(true);
    const { x, y }= e.target.getStage()?.getRelativePointerPosition() ?? {x: 0, y: 0};
    setPoints([x, y])
  };

  const up = (e: Konva.KonvaEventObject<MouseEvent>) => {
    if (e.evt.button !== 2) return;

    setMeasuring(false);
    setPoints([]);
  };

  const move = (e: Konva.KonvaEventObject<MouseEvent>) => {
    if (!measuring) return;

    const { x, y } = e.target.getStage()?.getRelativePointerPosition() ?? {x: 0, y: 0};
    setPoints([
      ...points.slice(0, 2),
      x,
      y
    ]);
  };

  return { down, up, move, points, distance };
};

export type RulerProps = {
  points: number[];
  stroke?: string;
  distance?: number;
  tooltipColor?: string;
  tooltipBackgroundColor?: string;
};

export const Ruler = ({ 
  points, 
  stroke = "black", 
  distance = 0,
  tooltipColor = "white",
  tooltipBackgroundColor = "black"
}: RulerProps) => {
  const [, , x = 0, y = 0] = points;
  const opacity = distance ? 0.75 : 0;
  return (
    <>
      <Line 
        stroke={stroke}
        points={points}
      />
      <Tooltip 
        x={x}
        y={y}
        backgroundColor={tooltipBackgroundColor}
        color={tooltipColor}
        opacity={opacity} 
        text={distance.toLocaleString() + '"'}
      />
    </>
  );
};
