export const makeDrawingProps = (rows: number, colls: number) => {
  return {
    rows: rows,
    colls: colls,
    cellSize: 0,
    contentWidth: 0,
    contentHeight: 0,
    leadingPadding: 0,
    topPadding: 0,
    scroll: 0,
  };
};
