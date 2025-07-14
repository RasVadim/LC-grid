export type TDrawingProps = {
  rows: number;
  colls: number;
  cellSize: number;
  contentWidth: number;
  contentHeight: number;
  leadingPadding: number;
  topPadding: number;
  scroll: number;
};

export type TAnimation = {
  fromMode: TDrawingProps;
  toMode: TDrawingProps;
  fromCellIndex: number;
  toCellIndex: number;
  start: number;
  end: number;
  duration: number;
  props: {
    leadingPaddingDiff: number;
    topPaddingDiff: number;
    cellSizeDiff: number;
  };
};
