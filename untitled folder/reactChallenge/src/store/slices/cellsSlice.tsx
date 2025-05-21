import { createSlice } from "@reduxjs/toolkit";
import type { cellType } from "../../types/cellType";

const cellsSlice = createSlice({
    name: "cell",
    initialState: [
        { id: "1", row: 1, col: 1, value: "" },
        { id: "2", row: 1, col: 2, value: "" },
        { id: "3", row: 1, col: 3, value: "" },
        { id: "4", row: 1, col: 4, value: "" },
        { id: "5", row: 1, col: 5, value: "" },
      
        { id: "6", row: 2, col: 1, value: "" },
        { id: "7", row: 2, col: 2, value: "" },
        { id: "8", row: 2, col: 3, value: "" },
        { id: "9", row: 2, col: 4, value: "" },
        { id: "10", row: 2, col: 5, value: "" },
      
        { id: "11", row: 3, col: 1, value: "" },
        { id: "12", row: 3, col: 2, value: "" },
        { id: "13", row: 3, col: 3, value: "" },
        { id: "14", row: 3, col: 4, value: "" },
        { id: "15", row: 3, col: 5, value: "" },
      
        { id: "16", row: 4, col: 1, value: "" },
        { id: "17", row: 4, col: 2, value: "" },
        { id: "18", row: 4, col: 3, value: "" },
        { id: "19", row: 4, col: 4, value: "" },
        { id: "20", row: 4, col: 5, value: "" },
      
        { id: "21", row: 5, col: 1, value: "" },
        { id: "22", row: 5, col: 2, value: "" },
        { id: "23", row: 5, col: 3, value: "" },
        { id: "24", row: 5, col: 4, value: "" },
        { id: "25", row: 5, col: 5, value: "" },
      ] as cellType[], 
    reducers: {
        updateCell(state, action) {
            const { id, value } = action.payload;
            const cell = state.find(cell => cell.id === id);
            if (cell) {
              cell.value = value;
            }
        }
    }
});

export const { updateCell } = cellsSlice.actions;
export const cellsReducer = cellsSlice.reducer;