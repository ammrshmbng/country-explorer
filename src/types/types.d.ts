import { store } from './lib/store'

// Infer the `RootState` type from the store itself
export type RootState = ReturnType<typeof store.getState>