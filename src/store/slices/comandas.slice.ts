import { createSlice } from '@reduxjs/toolkit'
import { ComandasState } from '../../data/type'
import { comandas } from '../../data/comandasIniciales'

const initialState: ComandasState = {
    comandas: comandas,
    comandasFinalizadas: [],
}

const comandasSlice = createSlice({
    name: 'comandas',
    initialState,
    reducers: {
        addComanda: (state, action) => {
            state.comandas.push(action.payload)
        },
        finalizeComanda: (state, action) => {
            const comandaId = action.payload

            const comanda = state.comandas.find((c) => c.id === comandaId)

            if (comanda) {
                state.comandas = state.comandas.filter(
                    (c) => c.id !== comandaId
                )
                state.comandasFinalizadas.push(comanda)
            }
        },
        deleteComanda: (state, action) => {
            const comandaId = action.payload
            state.comandas = state.comandas.filter((c) => c.id !== comandaId)
        },
    },
})

export const { addComanda, finalizeComanda, deleteComanda } =
    comandasSlice.actions
export default comandasSlice.reducer
