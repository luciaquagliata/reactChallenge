import { createSlice } from "@reduxjs/toolkit";
import type { cellType } from "../../types/cellType";
import type { PayloadAction } from "@reduxjs/toolkit";

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
        updateCell: (state, action: PayloadAction<{ row: number; col: number; value: string; formula?: string; showFormula?: boolean }>) => {
            const { row, col, value, formula, showFormula } = action.payload;
            state.table[row][col].value = value;
            if(formula && formula !== 'empty'){
              state.table[row][col].formula = formula;
            } else if(formula === 'empty'){
              state.table[row][col].formula = '';
            }
            if(showFormula){
              state.table[row][col].showFormula = true;
            } else{
              state.table[row][col].showFormula = false;
            }
        }
    }
});

export const { updateCell } = cellsSlice.actions;
export const cellsReducer = cellsSlice.reducer;