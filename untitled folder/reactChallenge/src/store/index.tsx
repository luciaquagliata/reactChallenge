import { configureStore } from "@reduxjs/toolkit";
import { cellsReducer, updateCell } from "./slices/cellsSlice";



const store = configureStore({
    reducer: {
        cells: cellsReducer
    }
});

export { store, updateCell};
export type RootState = ReturnType<typeof store.getState>; //??