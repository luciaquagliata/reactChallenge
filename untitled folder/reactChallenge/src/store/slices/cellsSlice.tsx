import { createSlice } from "@reduxjs/toolkit";
import type { cellType } from "../../types/cellType";

const screenWidth = typeof window !== "undefined" ? window.innerWidth : 1200;
const screenHeight = typeof window !== "undefined" ? window.innerHeight : 800;

const cellWidth = 100;
const cellHeight = 30;

const numCols = Math.floor(screenWidth / cellWidth);
const numRows = Math.floor(screenHeight / cellHeight);

const generateInitialTable = (): cellType[][] => {
  return Array.from({ length: numRows }, (_, rowIndex) =>
    Array.from({ length: numCols }, (_, colIndex): cellType => ({
      id: `${rowIndex}:${colIndex}`,
      value: "",
    }))
  );
};

const initialState: { table: cellType[][] } = {
  table: generateInitialTable(),
}

const cellsSlice = createSlice({
    name: "cell",
    initialState,
    reducers: {
        updateCell: (state, action) => {
            const { row, col, value } = action.payload;
            state.table[row][col].value = value;
        }          
    }
});

export const { updateCell } = cellsSlice.actions;
export const cellsReducer = cellsSlice.reducer;