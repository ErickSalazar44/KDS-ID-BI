import { useState } from 'react'
import styled from 'styled-components'
import { MenuDataItems } from '../../data/type'
import { Arrow, Plus } from '../Icon'

const CardDetallesLi = styled.li`
    color: #1d1e22;
    font-size: 14px;
    font-weight: 500;
`

const AcordeonBtn = styled.button`
    color: #1d1e22;
`

const AcordeonHeader = styled.header`
    display: flex;
    justify-content: space-between;
    align-items: center;
    background-color: #f3f3f3;
    padding: 0.5rem;
    border-radius: 10px;
    margin-bottom: 0.5rem;
`

const AcordeonBtnUnidad = styled.button`
    color: #1d1e22;
    border: solid 1px #999;
    padding: 0.5rem;
    display: flex;
    align-items: center;
    gap: 0.5rem;
    border-radius: 0.5rem;
    font-size: 1rem;
    width: 40px;
    justify-content: center;
    height: 40px;
`

const OptionsContainer = styled.div`
    display: flex;
    gap: 1rem;
    align-items: center;
`

const AddUl = styled.ul`
    display: flex;
    flex-direction: column;
    gap: 1rem;
`
const AddLi = styled.li`
    border-bottom: 1px solid #f3f3f3;
    color: green;
    padding: 0.5rem;
    display: flex;
    justify-content: space-between;

    width: 100%;
`

const AddBtn = styled.button<{ $active?: boolean }>`
    background-color: ${(props) => props.$active && '#4dff0010'};
    color: green;
`

const AcordeonItem = ({
    item,
    unidades,
    setUnidades,
    setProductDetails,
}: {
    item: MenuDataItems
    unidades: { [key: string]: number }
    setUnidades: React.Dispatch<React.SetStateAction<{ [key: string]: number }>>
    setProductDetails: React.Dispatch<
        React.SetStateAction<{
            [key: string]: { quantity: number; addons?: string[] | undefined }
        }>
    >
}) => {
    const [isOpen, setIsOpen] = useState(false)

    const toggleItem = () => {
        setIsOpen(!isOpen)
    }

    const handleClickAdd = () => {
        setUnidades((prevUnidades) => ({
            ...prevUnidades,
            [item.name]: (prevUnidades[item.name] || 0) + 1,
        }))

        // Actualizar los detalles del producto
        setProductDetails((prevDetails) => ({
            ...prevDetails,
            [item.name]: {
                quantity: (unidades[item.name] || 0) + 1,
                addons: [...(prevDetails[item.name]?.addons || [])],
            },
        }))
    }

    const handleClickRest = () => {
        // Verificar si la cantidad es mayor a 0
        if (unidades[item.name] > 0) {
            setUnidades((prevUnidades) => ({
                ...prevUnidades,
                [item.name]: prevUnidades[item.name] - 1,
            }))

            // Actualizar los detalles del producto
            const newQuantity = (unidades[item.name] || 0) - 1

            // Verificar si la nueva cantidad es mayor a 0
            if (newQuantity > 0) {
                setProductDetails((prevDetails) => ({
                    ...prevDetails,
                    [item.name]: {
                        quantity: newQuantity,
                        addons: [...(prevDetails[item.name]?.addons || [])],
                    },
                }))
            } else {
                // Si la nueva cantidad es 0, eliminar el elemento
                setProductDetails((prevDetails) => {
                    const updatedDetails = { ...prevDetails }
                    delete updatedDetails[item.name]
                    return updatedDetails
                })
            }
        }
    }

    const handleAñadirAdicionales = (add: string) => {
        setProductDetails((prevDetails) => {
            const itemName = item.name

            // Verificar si el producto ya está en los detalles
            if (prevDetails[itemName]) {
                // Verificar si el adicional ya está presente
                const addons = prevDetails[itemName].addons || []
                const updatedAddons = addons.includes(add)
                    ? addons.filter((addon) => addon !== add)
                    : [...addons, add]

                // Retornar los detalles actualizados
                return {
                    ...prevDetails,
                    [itemName]: {
                        quantity: prevDetails[itemName].quantity || 1,
                        addons: updatedAddons.length
                            ? updatedAddons
                            : undefined,
                    },
                }
            } else {
                // Si no está, agregar el producto con cantidad 1 y el adicional
                setUnidades((prevUnidades) => ({
                    ...prevUnidades,
                    [itemName]: (prevUnidades[itemName] || 0) + 1,
                }))

                return {
                    ...prevDetails,
                    [itemName]: {
                        quantity: 1,
                        addons: [add],
                    },
                }
            }
        })
    }

    return (
        <CardDetallesLi>
            <AcordeonHeader>
                {item.name}
                <OptionsContainer>
                    <AcordeonBtnUnidad onClick={handleClickRest}>
                        -
                    </AcordeonBtnUnidad>
                    {!unidades[item.name] ? 0 : unidades[item.name]}
                    <AcordeonBtnUnidad onClick={handleClickAdd}>
                        +
                    </AcordeonBtnUnidad>
                    <AcordeonBtn onClick={toggleItem}>
                        <Arrow />
                    </AcordeonBtn>
                </OptionsContainer>
            </AcordeonHeader>
            {isOpen && (
                <AddUl>
                    {item.addons.map((add) => (
                        <AddLi key={add}>
                            {add}
                            <AddBtn
                                onClick={() => handleAñadirAdicionales(add)}
                            >
                                <Plus />
                            </AddBtn>
                        </AddLi>
                    ))}
                </AddUl>
            )}
        </CardDetallesLi>
    )
}

export default AcordeonItem
