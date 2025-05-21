import { createSlice } from "@reduxjs/toolkit";
import type { cellType } from "../../types/cellType";

const cellsSlice = createSlice({
    name: "cell",
    initialState: [
        { id: "1", row: 1, col: 1, value: "" },
        { id: "2", row: 1, col: 2, value: "" },
        { id: "3", row: 1, col: 3, value: "" },
        { id: "4", row: 2, col: 1, value: "" },
        { id: "5", row: 2, col: 2, value: "" },
        { id: "6", row: 2, col: 3, value: "" },
        { id: "7", row: 3, col: 1, value: "" },
        { id: "8", row: 3, col: 2, value: "" },
        { id: "9", row: 3, col: 3, value: "" }
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