import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    deleteModal: {
        isOpen: false,
        comandaId: null,
    },
    searchModal: {
        isOpen: false,
    },
    createComandaModal: {
        isOpen: false,
    },
}

const modalsSlice = createSlice({
    name: 'modals',
    initialState,
    reducers: {
        openDeleteModal: (state, action) => {
            state.deleteModal.isOpen = true
            // añadir el id de la comanda
            state.deleteModal.comandaId = action.payload
        },
        closeDeleteModal: (state) => {
            state.deleteModal.isOpen = false
            state.deleteModal.comandaId = null // Limpiar el id al cerrar
        },

        // CREATE MODAL
        openCreateModal: (state) => {
            state.createComandaModal.isOpen = true
        },
        closeCreateModal: (state) => {
            state.createComandaModal.isOpen = false
        },
    },
})

export const {
    openDeleteModal,
    closeDeleteModal,
    openCreateModal,
    closeCreateModal,
    // Otros actions para el modal de búsqueda y filtros
} = modalsSlice.actions

export default modalsSlice.reducer
