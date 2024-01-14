export interface Product {
    name: string
    quantity: number
    addons?: string[]
}

export interface Item {
    section: 'Burger' | 'Parrilla' | 'Pizzas' | 'Coffe' | string
    products: Product[]
}

export interface Comanda {
    id: number
    clienteName: string
    orderNumber: string
    orderTimer: number
    items: Item[]
}

export interface RootState {
    comandas: ComandasState
    modals: {
        deleteModal: {
            isOpen: boolean
            comandaId: null | number
        }
        searchModal: {
            isOpen: boolean
        }
        createComandaModal: {
            isOpen: boolean
        }
    }
}

export interface ComandasState {
    comandas: Comanda[]
    comandasFinalizadas: Comanda[]
}

export interface MenuDataSection {
    name: string
    img: string
}

export interface MenuDataItems {
    name: string
    addons: string[]
}

export interface MenuData {
    section: MenuDataSection
    items: MenuDataItems
}
