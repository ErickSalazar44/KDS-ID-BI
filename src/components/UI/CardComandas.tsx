import styled from 'styled-components'
import { Printer } from '../Icon'
import { Comanda, Item } from '../../data/type'
import HeaderCard from '../HeaderCard'
import { useDispatch } from 'react-redux'
import { finalizeComanda } from '../../store/slices/comandas.slice'
import { openDeleteModal } from '../../store/slices/modals.slice'
import { BtnCard } from './Button/StyledButton'

const Card = styled.div`
    display: flex;
    justify-content: space-between;
    width: 300px;
    background-color: white;
    border-radius: 1rem;
    flex-direction: column;
    overflow: hidden;
    align-self: flex-start;
`

const CardBody = styled.div``

const ClientInfo = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0.7rem 1rem;
`
const ClientName = styled.div`
    color: #999;
    font-weight: 500;
    display: flex;
    font-size: 12px;
    flex-direction: column;
`

const ClientNumeroDeOrden = styled.span`
    font-size: 1.2rem;
    font-weight: 600;
    color: black;
`

const SectionOrden = styled.section`
    color: black;
    font-size: 1.2rem;
    font-weight: 600;
    display: flex;
    justify-content: space-between;
    padding: 0.7rem 1rem;
    background-color: #f3f3f3;
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

const CardFooter = styled.footer`
    display: flex;
    justify-content: space-between;
    padding: 0.7rem 1rem;
`

const CardComandas = ({ comanda }: { comanda: Comanda }) => {
    const dispatch = useDispatch()

    const handleFinalizeClick = () => {
        dispatch(finalizeComanda(comanda.id))
    }

    const handleCancelClick = () => {
        dispatch(openDeleteModal(comanda.id))
    }

    return (
        <Card>
            <HeaderCard comanda={comanda} />
            <CardBody>
                <ClientInfo>
                    <ClientName>
                        <span>{comanda.clienteName}</span>
                        {comanda.orderNumber}
                    </ClientName>
                    <ClientNumeroDeOrden># 00{comanda.id}</ClientNumeroDeOrden>
                </ClientInfo>
                {comanda.items.map((item: Item) => (
                    <div key={item.section}>
                        <SectionOrden>
                            {item.section}
                            <Printer />
                        </SectionOrden>
                        <ul>
                            {item.products.map((product, i: number) => (
                                <OrdenDetalle key={`${product.name}-${i}`}>
                                    <span>{product.quantity}</span>
                                    <AñadidosOrden>
                                        {product.name}
                                        {product.addons &&
                                            product.addons.map((add) => (
                                                <Complementos key={add}>
                                                    + {add}
                                                </Complementos>
                                            ))}
                                    </AñadidosOrden>
                                </OrdenDetalle>
                            ))}
                        </ul>
                    </div>
                ))}
            </CardBody>
            <CardFooter>
                <BtnCard
                    $textColor='white'
                    $bgColor='#0e72f5'
                    onClick={handleFinalizeClick}
                >
                    Listo
                </BtnCard>
                <BtnCard
                    $textColor='#999'
                    $bgColor='#f3f3f3'
                    onClick={handleCancelClick}
                >
                    Cancelar
                </BtnCard>
            </CardFooter>
        </Card>
    )
}

export default CardComandas
