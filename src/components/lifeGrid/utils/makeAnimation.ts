import { TDrawingProps } from '../../../types/grid';

type MakeAnimationOptions = {
  fromMode: TDrawingProps;
  toMode: TDrawingProps;
  fromCellIndex: number;
  toCellIndex: number;
  duration: number;
};

export const makeAnimation = ({
  fromMode,
  toMode,
  fromCellIndex,
  toCellIndex,
  duration,
}: MakeAnimationOptions) => {
  return {
    fromMode: fromMode,
    toMode: toMode,
    fromCellIndex: fromCellIndex,
    toCellIndex: toCellIndex,
    start: Date.now(),
    end: Date.now() + duration,
    duration: duration,
    props: {
      leadingPaddingDiff: toMode.leadingPadding - fromMode.leadingPadding,
      topPaddingDiff: toMode.topPadding - fromMode.topPadding,
      cellSizeDiff: toMode.cellSize - fromMode.cellSize,
    },
  };
};
