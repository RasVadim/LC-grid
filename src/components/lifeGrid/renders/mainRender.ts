import { TAnimation, TDrawingProps } from '../../../types/grid';
import { easeOutCubic } from '../utils';

type MainRenderOptions = {
  context?: CanvasRenderingContext2D | null;
  canvas: HTMLCanvasElement | null;
  animation: TAnimation | null;
  drawingMode: TDrawingProps;
};

export const mainRender = ({ context, canvas, animation, drawingMode }: MainRenderOptions) => {
  if (!context || !canvas) return;
  context.clearRect(0, 0, canvas.width, canvas.height);
  context.strokeStyle = 'solid 1px black';

  if (animation) {
    const progress = easeOutCubic((Date.now() - animation.start) / animation.duration);
    const cellSize = animation.fromMode.cellSize + progress * animation.props.cellSizeDiff;
    context.beginPath();
    for (let i = animation.fromCellIndex; i <= animation.toCellIndex; i++) {
      const fromOrigin = [
        animation.fromMode.leadingPadding +
          animation.fromMode.cellSize * (i % animation.fromMode.colls),
        animation.fromMode.topPadding +
          animation.fromMode.cellSize * Math.floor(i / animation.fromMode.colls),
      ];
      const toRectOrigin = [
        animation.toMode.leadingPadding + animation.toMode.cellSize * (i % animation.toMode.colls),
        animation.toMode.topPadding +
          animation.toMode.cellSize * Math.floor(i / animation.toMode.colls),
      ];
      const originDiff = [toRectOrigin[0] - fromOrigin[0], toRectOrigin[1] - fromOrigin[1]];
      context.rect(
        fromOrigin[0] + progress * originDiff[0],
        fromOrigin[1] + progress * originDiff[1],
        cellSize,
        cellSize,
      );
    }
    context.closePath();
    context.stroke();

    if (progress >= 1) {
      drawingMode = animation.toMode;
      animation = null;
    }
    console.log(progress);
    const rerender = () => {
      mainRender({ context, canvas, animation, drawingMode });
    };
    requestAnimationFrame(rerender);
    return;
  }

  context.beginPath();
  for (let rowIndex = 0; rowIndex < drawingMode.rows; rowIndex++) {
    for (let cellIndex = 0; cellIndex < drawingMode.colls; cellIndex++) {
      context.rect(
        drawingMode.leadingPadding + drawingMode.cellSize * cellIndex,
        drawingMode.topPadding + rowIndex * drawingMode.cellSize,
        drawingMode.cellSize,
        drawingMode.cellSize,
      );
    }
  }
  context.closePath();
  context.stroke();
};
