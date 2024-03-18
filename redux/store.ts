/**
 * Redux State Store.
*/

import { configureStore } from "@reduxjs/toolkit"
import selectUtility from "./utilities"
import { animeApi } from "./api"

export const store = configureStore({
    reducer: {
        [animeApi.reducerPath]: animeApi.reducer,
        selectUtility: selectUtility,
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(animeApi.middleware)
})

export type RootState = ReturnType<typeof store.getState>