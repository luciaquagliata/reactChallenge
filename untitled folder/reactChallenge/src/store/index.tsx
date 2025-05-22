import { configureStore } from "@reduxjs/toolkit";
import { cellsReducer, updateCell, updateAllCells } from "./slices/cellsSlice";
import { persistStore, persistReducer, FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER } from "redux-persist";
import storage from "redux-persist/lib/storage"; // usa localStorage
import { combineReducers } from "@reduxjs/toolkit";

const rootReducer = combineReducers({ // tengo que dejarlos juntos para poder usar el persist
    cells: cellsReducer,
});

const persistConfig = {
    key: "root",
    storage,
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

const store = configureStore({
    reducer: persistedReducer,
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: {
                ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
            },
        }),
});

const persistor = persistStore(store);

export { store, persistor, updateCell, updateAllCells };
export type RootState = ReturnType<typeof store.getState>;
