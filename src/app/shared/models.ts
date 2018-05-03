export interface TileState {
  row: number; // row index
  col: number; // column index
  value: number;
}

export interface TileSwapEvent {
  source: TileState;
  target: TileState;
}
