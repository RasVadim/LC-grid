import { TDrawingProps } from '../../../types/grid';

type RecalculateDrawingPropsOptions = {
  drawingModes: TDrawingProps[];
  canvas: HTMLCanvasElement | null;
};

export const recalculateDrawingProps = ({
  drawingModes,
  canvas,
}: RecalculateDrawingPropsOptions) => {
  if (!canvas) return;
  for (const mode of drawingModes) {
    if (mode == drawingModes[0]) {
      const maxCellSize = canvas.width / mode.colls;
      mode.cellSize = Math.min(canvas.height / mode.rows, maxCellSize);
    } else {
      mode.cellSize = drawingModes[0].contentWidth / mode.colls;
    }
    mode.contentWidth = mode.cellSize * mode.colls;
    mode.contentHeight = mode.cellSize * mode.rows;
    mode.leadingPadding = (canvas.width - mode.contentWidth) / 2;
    mode.topPadding = Math.max((canvas.height - mode.contentHeight) / 2, 0);
  }
};
