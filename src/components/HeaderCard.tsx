import styled from 'styled-components'
import { Ellipsis, Shopping } from './Icon'
import { Comanda } from '../data/type'
import { useEffect, useState } from 'react'
import { getBackgroundColor } from '../utils/getBackground'

const StyledHeaderCard = styled.header.attrs<{ $bgColorLight?: string }>(
    (props) => ({
        $bgColorLight: props.$bgColorLight || 'white',
    })
)`
    display: flex;
    justify-content: space-between;
    padding: 0.7rem 1rem;
    color: black;
    width: 100%;
    align-items: center;
    background-color: ${(props) => props.$bgColorLight};
`

const TimerComanda = styled.div.attrs<{ $bgColor?: string }>((props) => ({
    $bgColor: props.$bgColor || 'white',
}))`
    color: white;
    display: flex;
    justify-content: space-between;
    padding: 0.5rem 1rem;
    align-items: center;
    gap: 1rem;
    font-size: 1rem;
    border-radius: 10px;
    font-weight: 600;
    background-color: ${(props) => props.$bgColor};
`

const HeaderCard = ({ comanda }: { comanda: Comanda }) => {
    const [tiempoRestante, setTiempoRestante] = useState(comanda.orderTimer)

    useEffect(() => {
        const intervalId = setInterval(() => {
            if (tiempoRestante > 0) {
                const nuevoTiempoRestante = tiempoRestante - 1

                setTiempoRestante(nuevoTiempoRestante)
            } else {
                clearInterval(intervalId)
            }
        }, 1000)

        return () => clearInterval(intervalId)
    }, [comanda.id, tiempoRestante])

    const minutos = Math.floor(tiempoRestante / 60)
    const porcentajeRestante = (tiempoRestante / comanda.orderTimer) * 100
    const [colorLight, color] = getBackgroundColor(porcentajeRestante)

    return (
        <StyledHeaderCard $bgColorLight={colorLight}>
            <TimerComanda $bgColor={color}>
                - {`${minutos} min`}
                <Shopping />
            </TimerComanda>
            <Ellipsis />
        </StyledHeaderCard>
    )
}

export default HeaderCard
