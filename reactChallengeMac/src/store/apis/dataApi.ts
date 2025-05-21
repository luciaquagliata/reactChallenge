import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import type { rowDataType } from "../../types/dataType";
import type { rowsType } from "../../types/rowsType";
import type { columnsType } from "../../types/columnsType";

const dataApi = createApi({
    reducerPath: 'data',
    baseQuery: fetchBaseQuery({
        baseUrl: 'http://localhost:3005',
    }),
    tagTypes: ['Cell'],
    endpoints(builder) {
        return {
            fetchData: builder.query<rowDataType[], void>({
                providesTags: (result) => {
                    if(result){
                        const tags = result.map((cell) => {
                            return {type: 'Cell' as const, id: cell.id};
                        });
                        return tags;
                    }
                    return [];
                },
                query: () => {
                    return {
                        url: '/data',
                        method: 'GET',
                    };
                },
            }),
            fetchColumns: builder.query<columnsType[], void>({
                query: () => {
                    return {
                        url: '/columns',
                        method: 'GET',
                    };
                },
            }),
            fetchRows: builder.query<rowsType[], void>({
                query: () => {
                    return {
                        url: '/rows',
                        method: 'GET',
                    };
                },
            }),
            updateData: builder.mutation<void, { id: number; value: string }>({
                invalidatesTags: (result, error, { id }) => {
                    return [{ type: 'Cell', id}];
                },
                query: ({ id, value }) => ({
                  url: `/data/${id}`,
                  method: 'PATCH',
                  body: { value },
                }),
            }),              
        };
    },
});

export const { useFetchDataQuery, useFetchColumnsQuery, useFetchRowsQuery, useUpdateDataMutation } = dataApi;

export {dataApi};