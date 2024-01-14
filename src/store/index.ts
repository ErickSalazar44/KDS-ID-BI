import { configureStore } from '@reduxjs/toolkit'
import comandasReducer from './slices/comandas.slice'
import modalsReducer from './slices/modals.slice'
import { useDispatch } from 'react-redux'

const store = configureStore({
    reducer: {
        comandas: comandasReducer,
        modals: modalsReducer,
    },
})
export type RootState = ReturnType<typeof store.getState>

export type AppDispatch = typeof store.dispatch
export const useAppDispatch: () => AppDispatch = useDispatch

export default store
