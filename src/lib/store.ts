import { configureStore } from "@reduxjs/toolkit";
import { apiSlice } from "./services/apiSlice";
import counterReducer from "./features/counterSlice";

export const store = configureStore({
    reducer: {
        [apiSlice.reducerPath]: apiSlice.reducer,
        counter: counterReducer
    },
    middleware: getDefaultMiddleware => getDefaultMiddleware().concat(apiSlice.middleware)
})

// Opsional: Export types untuk TypeScript
export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch