type ResizeCanvasOptions = {
  canvas: HTMLCanvasElement | null;
  recalculateDrawingProps: () => void;
  render: () => void;
};

export const resizeCanvas = ({ canvas, recalculateDrawingProps, render }: ResizeCanvasOptions) => {
  if (!canvas) return;
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
  recalculateDrawingProps();
  render();
};
