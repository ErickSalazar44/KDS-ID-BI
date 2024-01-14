import styled from 'styled-components'
import { BLUE_COLOR } from '../../utils/getBackground'
import { Close, Soup } from '../Icon'
import { menuData } from '../../data/menuData'
import FoodSelect from './Button/FoodSelect'
import { useState } from 'react'
import AcordeonItem from './AcordeonItem'
import { useDispatch, useSelector } from 'react-redux'
import { closeCreateModal } from '../../store/slices/modals.slice'
import { getNumeroDeOrden } from '../../utils/getNumeroDeOrden'
import { BtnCard } from './Button/StyledButton'
import { addComanda } from '../../store/slices/comandas.slice'
import { Comanda, RootState } from '../../data/type'

const CardCreateContainer = styled.section`
    background: white;
    color: #1d1e22;
    border-radius: 1rem;
    display: flex;
    flex-direction: column;
    gap: 1rem;
    /* width: 84vw; */
`

const CardCreateHeader = styled.header`
    display: flex;
    justify-content: space-between;
    padding: 1.2rem;
    background-color: ${BLUE_COLOR[0]};
    color: ${BLUE_COLOR[1]};
`

const CardCreateTitle = styled.h3`
    font-size: 1.2rem;
    font-weight: 600;
`

const CardDivHeader = styled.div`
    display: flex;
    gap: 1rem;
`

const CardBody = styled.div`
    display: flex;
    padding: 1.2rem;
    justify-content: center;
    gap: 2rem;
`

const CardDetallesUl = styled.ul`
    padding: 1.2rem;
    display: flex;
    gap: 1rem;
    flex-direction: column;
`

const CloseBtn = styled.button`
    scale: 1.1;
    color: #1d1e22;
`

const CardInfo = styled.section`
    display: flex;
    flex-direction: column;
`

const ContainerSelect = styled.div`
    display: flex;
    gap: 1rem;
`

const ContainerPreview = styled.section`
    border: 1px solid #999;
    border-radius: 1rem;
    height: 300px;
    overflow: hidden;
    width: 300px;
`

// ESTO PUEDE SER UN COMPONENTE
const ClientInfo = styled.div`
    padding: 1rem;
    font-weight: 500;
    font-size: 12px;
    display: flex;
    justify-content: space-between;
    border-bottom: 1px solid #999;
    background-color: ${BLUE_COLOR[0]};
    color: ${BLUE_COLOR[1]};
`

const ContainerOptions = styled.div`
    padding: 1.2rem;
    display: flex;
    gap: 1rem;
    justify-content: space-between;
`

const Input = styled.input`
    border: none;
    padding: 0.5rem;
    border-radius: 5px;
    background-color: #f3f3f3;
    color: #1d1e22;
`

const OrdenDetalle = styled.li`
    color: black;
    padding: 0.5rem 1rem;
    display: flex;
    gap: 2rem;
    font-weight: 500;
    font-size: 14px;
    border-bottom: solid 1px #f3f3f3;
`

const AñadidosOrden = styled.span`
    display: flex;
    flex-direction: column;
    gap: 10px;
`

const Complementos = styled.span`
    display: block;
    color: #29ce47;
    font-size: 12px;
`

const ContainerBtn = styled.div`
    display: flex;
    gap: 0.5rem;
`

const ContainerTime = styled.div`
    display: flex;
    gap: 0.5rem;
    flex-direction: column;
`

const ContainerEnviarComanda = styled.div`
    display: flex;
    flex-direction: column;
    gap: 1rem;
    align-items: end;
`

const CardCrearComanda = () => {
    const dispatach = useDispatch()

    const handleCloseClick = () => {
        dispatach(closeCreateModal())
    }

    // ESTADO PARA LA CATEGORIA
    const [selectCategoria, setSelectCategoria] = useState<string | null>(null)

    // UNIDADES DE CADA PRODUCTO
    const [unidades, setUnidades] = useState<{ [key: string]: number }>({})

    // ESTADO PARA ALMACENAR EL NOMBRE
    const [inputValue, setInputValue] = useState('')

    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const newValue = event.target.value

        if (newValue.length <= 16) {
            setInputValue(newValue)
        }
    }

    // Estado para las unidades y detalles de cada producto
    const [productDetails, setProductDetails] = useState<{
        [key: string]: { quantity: number; addons?: string[] | undefined }
    }>({})

    // ESTADO PARA ESTIMAR EL TIEMPO
    const [tiempoEstimado, setTiempoEstimado] = useState<number | null>(null)

    const detallesDeCategoria = menuData.find(
        (menu) => menu.section.name === selectCategoria
    )

    const dispatch = useDispatch()

    const comandas: Comanda[] = useSelector(
        (state: RootState) => state.comandas.comandas
    )

    const handleEnviarComanda = () => {
        if (inputValue.length <= 0) {
            console.error('Ingrese el nombre del cliente.')
            return
        }

        if (tiempoEstimado === null) {
            console.error('Seleccione el tiempo estimado.')
            return
        }

        if (Object.keys(productDetails).length === 0) {
            console.error('Agregue al menos un producto a la comanda.')
            return
        }

        const nuevaComanda = {
            id: comandas.length + 1,
            clienteName: inputValue,
            orderNumber: getNumeroDeOrden(),
            orderTimer: tiempoEstimado,
            items: Object.entries(productDetails).map(
                ([productName, { quantity, addons }]) => {
                    const sectionName =
                        menuData
                            .map((menu) => ({
                                sectionName: menu.section.name,
                                itemNames: menu.items.map((item) => item.name),
                            }))
                            .find(({ itemNames }) =>
                                itemNames.includes(productName)
                            )?.sectionName || ''

                    return {
                        section: sectionName,
                        products: [
                            {
                                name: productName,
                                quantity,
                                addons,
                            },
                        ],
                    }
                }
            ),
        }
        // Agregar la comanda al estado global
        dispatch(addComanda(nuevaComanda))
        dispatach(closeCreateModal())
    }

    return (
        <CardCreateContainer>
            <CardCreateHeader>
                <CardDivHeader>
                    <CardCreateTitle>Crear Nueva Comanda</CardCreateTitle>
                    <Soup />
                </CardDivHeader>
                <CloseBtn onClick={handleCloseClick}>
                    <Close />
                </CloseBtn>
            </CardCreateHeader>

            <ContainerOptions>
                <Input
                    placeholder='Nombre del cliente'
                    type='text'
                    value={inputValue}
                    onChange={handleInputChange}
                />
                <ContainerBtn>
                    <BtnCard
                        $bgColor={
                            tiempoEstimado === 5 * 60 ? 'blue' : '#f3f3f3'
                        }
                        $textColor={
                            tiempoEstimado === 5 * 60 ? 'white' : '#999'
                        }
                        onClick={() => setTiempoEstimado(5 * 60)}
                    >
                        + 5
                    </BtnCard>
                    <BtnCard
                        onClick={() => setTiempoEstimado(10 * 60)}
                        $bgColor={
                            tiempoEstimado === 10 * 60 ? 'blue' : '#f3f3f3'
                        }
                        $textColor={
                            tiempoEstimado === 10 * 60 ? 'white' : '#999'
                        }
                    >
                        + 10
                    </BtnCard>
                    <BtnCard
                        onClick={() => setTiempoEstimado(15 * 60)}
                        $bgColor={
                            tiempoEstimado === 15 * 60 ? 'blue' : '#f3f3f3'
                        }
                        $textColor={
                            tiempoEstimado === 15 * 60 ? 'white' : '#999'
                        }
                    >
                        + 15
                    </BtnCard>
                    <BtnCard
                        onClick={() => setTiempoEstimado(20 * 60)}
                        $bgColor={
                            tiempoEstimado === 20 * 60 ? 'blue' : '#f3f3f3'
                        }
                        $textColor={
                            tiempoEstimado === 20 * 60 ? 'white' : '#999'
                        }
                    >
                        + 20
                    </BtnCard>
                </ContainerBtn>
            </ContainerOptions>

            <CardBody>
                <CardInfo>
                    <ContainerSelect>
                        {menuData.map((menu) => (
                            <FoodSelect
                                key={menu.section.name}
                                menu={menu.section}
                                setSelectCategoria={setSelectCategoria}
                                selectCategoria={selectCategoria}
                            />
                        ))}
                    </ContainerSelect>
                    <CardDetallesUl>
                        {detallesDeCategoria &&
                            detallesDeCategoria?.items.map((item) => (
                                <AcordeonItem
                                    key={item.name}
                                    item={item}
                                    unidades={unidades}
                                    setUnidades={setUnidades}
                                    setProductDetails={setProductDetails}
                                />
                            ))}
                    </CardDetallesUl>
                </CardInfo>
                <ContainerEnviarComanda>
                    <ContainerPreview>
                        <ClientInfo>
                            <span>{inputValue}</span>
                            <ContainerTime>
                                <span>
                                    {!tiempoEstimado ? 0 : tiempoEstimado / 60}{' '}
                                    MIN
                                </span>
                            </ContainerTime>
                        </ClientInfo>

                        {Object.entries(productDetails).map(
                            ([productName, { quantity, addons }]) => (
                                <div key={productName}>
                                    <OrdenDetalle>
                                        <span>{quantity}</span>
                                        <AñadidosOrden>
                                            {productName}
                                            {addons &&
                                                addons.map((add) => (
                                                    <Complementos key={add}>
                                                        + {add}
                                                    </Complementos>
                                                ))}
                                        </AñadidosOrden>
                                    </OrdenDetalle>
                                </div>
                            )
                        )}
                    </ContainerPreview>
                    <BtnCard
                        onClick={handleEnviarComanda}
                        $bgColor='blue'
                        $textColor='white'
                    >
                        Enviar Comanda
                    </BtnCard>
                </ContainerEnviarComanda>
            </CardBody>
        </CardCreateContainer>
    )
}

export default CardCrearComanda
