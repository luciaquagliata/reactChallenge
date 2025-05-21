import { createSlice } from "@reduxjs/toolkit";
import type { cellType } from "../../types/cellType";

const screenWidth = typeof window !== "undefined" ? window.innerWidth : 1200;
const screenHeight = typeof window !== "undefined" ? window.innerHeight : 800;

const cellWidth = 100;
const cellHeight = 30;

const numCols = Math.floor(screenWidth / cellWidth);
const numRows = Math.floor(screenHeight / cellHeight);

// ✅ Aca tipamos explícitamente el array como CellType[][]
const generateInitialTable = (): cellType[][] => {
  return Array.from({ length: numRows }, (_, rowIndex) =>
    Array.from({ length: numCols }, (_, colIndex): cellType => ({
      id: `${rowIndex}:${colIndex}`,
      row: rowIndex,
      col: colIndex,
      value: "",
    }))
  );
};

const initialState: { table: cellType[][] } = {
  table: generateInitialTable(),
};

const cellsSlice = createSlice({
    name: "cell",
    // initialState: [
    //     { id: "1", row: 1, col: 1, value: "" },
    //     { id: "2", row: 1, col: 2, value: "" },
    //     { id: "3", row: 1, col: 3, value: "" },
    //     { id: "4", row: 2, col: 1, value: "" },
    //     { id: "5", row: 2, col: 2, value: "" },
    //     { id: "6", row: 2, col: 3, value: "" },
    //     { id: "7", row: 3, col: 1, value: "" },
    //     { id: "8", row: 3, col: 2, value: "" },
    //     { id: "9", row: 3, col: 3, value: "" }
    // ] as cellType[], 
    initialState,
    reducers: {
        // updateCell(state, action) {
        //     const { id, value } = action.payload;
        //     const cell = state.find(cell => cell.id === id);
        //     if (cell) {
        //       cell.value = value;
        //     }
        // }
        updateCell: (state, action) => {
            const { row, col, newValue } = action.payload;
            state.table[row][col].value = newValue;
        }
    }
});

export const { updateCell } = cellsSlice.actions;
export const cellsReducer = cellsSlice.reducer;