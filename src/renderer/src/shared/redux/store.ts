import { configureStore } from '@reduxjs/toolkit'
import { logFromAuth } from './loginSlice'
import {  stateTotalItens, stateTotalPisos, useTotalItens } from './totalSlice'
import { stateTotalItensOrc, stateTotalPisosOrc,  } from './orcamentoSlice'

export const store = configureStore({
  reducer: {
    // refStorage: refFromStorage,
    useAuth: logFromAuth,
    useTotalPisos: stateTotalPisos,
    useTotalItens: stateTotalItens,
    useTotalPisosOrc: stateTotalPisosOrc,
    useTotalItensOrc: stateTotalItensOrc
  }
})
export default store
export type RootState = ReturnType<typeof store.getState>

export type AppDispatch = typeof store.dispatch
