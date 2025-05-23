import { createSlice } from "@reduxjs/toolkit";
import type { cellType } from "../../types/cellType";
import type { PayloadAction } from "@reduxjs/toolkit";

const screenHeight = typeof window !== "undefined" ? window.innerHeight : 800;

const cellHeight = 30;

const numCols = 26;
const numRows = Math.floor(screenHeight / cellHeight);

const generateInitialTable = (): cellType[][] => {
  return Array.from({ length: numRows }, (_, rowIndex) =>
    Array.from({ length: numCols }, (_, colIndex): cellType => ({
      id: `${rowIndex}:${colIndex}`,
      formula: "",
      value: "",
      showFormula: false,
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
    updateCell: (state, action: PayloadAction<{ row: number; col: number; value: string; formula?: string; showFormula?: boolean; }> ) => {
      const { row, col, value, formula, showFormula } = action.payload;
      state.table[row][col].value = value;
      if (formula && formula !== "empty") {
        state.table[row][col].formula = formula;
      } else if (formula === "empty") {
        state.table[row][col].formula = "";
      }
      state.table[row][col].showFormula = !!showFormula;
    },

    addRows: (state) => {
      const numCols = 26;
      const numNewRows = 10;
      const currentRowCount = state.table.length;

      const newRows = Array.from({ length: numNewRows }, (_, rowIndex) =>
        Array.from({ length: numCols }, (_, colIndex): cellType => ({
          id: `${currentRowCount + rowIndex}:${colIndex}`,
          formula: "",
          value: "",
          showFormula: false,
        }))
      );

      state.table.push(...newRows);
    },

    addColumns: (state) => {
      const numNewCols = 10;
      const currentColCount = state.table[0]?.length || 0;
    
      state.table.forEach((row, rowIndex) => {
        const newCells = Array.from({ length: numNewCols }, (_, colIndex): cellType => ({
          id: `${rowIndex}:${currentColCount + colIndex}`,
          formula: "",
          value: "",
          showFormula: false,
        }));
        row.push(...newCells);
      });
    },
    
  },
});


export const { updateCell, addRows, addColumns } = cellsSlice.actions;
export const cellsReducer = cellsSlice.reducer;