import React, { useRef, useEffect } from 'react';

import { mainRender } from './renders';
import { makeAnimation, makeDrawingProps, recalculateDrawingProps, resizeCanvas } from './utils';
import { IWeek, TLifeMode, TZodiacIconSet } from '../../types';
import { TAnimation } from '../../types/grid';

const years = 90;
const weeksPerYear = 52;
const weeks = years * weeksPerYear;
const weeksPerSeason = weeksPerYear / 4;
const weeksPerMonth = 4;

// MARK: - Extensions
Array.prototype.after = function (element) {
  return this[(this.indexOf(element) + 1) % this.length];
};
Array.prototype.before = function (element) {
  return this[(this.indexOf(element) + this.length - 1) % this.length];
};

export interface LifeGridProps {
  /** Width of the grid */
  width?: number;
  /** Height of the grid */
  height?: number;
  /** Weeks to display */
  weeks?: IWeek[];
  /** Is desktop flag > 1200px */
  isDesktop?: boolean;
  /** Theme - object with colors */
  theme?: Record<string, string>;
  /** Zodiac icon set - object with zodiac icons */
  zodiacIconSet?: TZodiacIconSet;
  /** Life mode - months, seasons, years */
  lifeMode?: TLifeMode;
  /** Set life mode */
  setLifeMode?: (mode: TLifeMode) => void;
}

export const LifeGrid: React.FC<LifeGridProps> = ({
  width = 660,
  height = 1000,
  // weeks,
  // isDesktop,
  // theme,
  // zodiacIconSet,
  // lifeMode,
  // setLifeMode,
}) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const context = canvas.getContext('2d');
    if (!context) return;

    const drawingModes = [
      makeDrawingProps(years, weeksPerYear),
      makeDrawingProps(weeks / weeksPerSeason, weeksPerSeason),
      makeDrawingProps(weeks / weeksPerMonth, weeksPerMonth),
    ];

    let drawingMode = drawingModes[0];
    let animation: TAnimation | null = null;

    const nextMode = () => {
      drawingMode = drawingModes.after(drawingMode);
      mainRender({ context, canvas, animation, drawingMode });
    };

    const resize = () => {
      resizeCanvas({
        canvas,
        recalculateDrawingProps: () => recalculateDrawingProps({ drawingModes, canvas }),
        render: () => mainRender({ context, canvas, animation, drawingMode }),
      });
    };

    const animate = () => {
      animation = makeAnimation({
        fromMode: drawingMode,
        toMode: drawingModes.after(drawingMode),
        fromCellIndex: 0,
        toCellIndex: weeks,
        duration: 800,
      });
      mainRender({ context, canvas, animation, drawingMode });
      nextMode();
    };

    resize();

    window.addEventListener('resize', resize);
    window.addEventListener('click', animate);

    return () => {
      window.removeEventListener('resize', resize);
      window.removeEventListener('click', animate);
    };
  }, [width, height]);

  return (
    <canvas
      ref={canvasRef}
      style={{
        cursor: 'pointer',
        border: '1px solid #ccc',
        width: width,
        height: height,
      }}
    />
  );
};
