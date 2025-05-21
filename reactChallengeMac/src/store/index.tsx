import { configureStore } from '@reduxjs/toolkit';
import { setupListeners } from '@reduxjs/toolkit/query';
import { dataApi } from './apis/dataApi';

export const store = configureStore({
    reducer: {
        [dataApi.reducerPath]: dataApi.reducer,
    },
    middleware: (getDefaultMiddleware) => {
        return getDefaultMiddleware().concat(dataApi.middleware);
    },
});

setupListeners(store.dispatch);

export { useFetchDataQuery, useFetchColumnsQuery, useFetchRowsQuery, useUpdateDataMutation } from './apis/dataApi';

