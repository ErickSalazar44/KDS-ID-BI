import styled from 'styled-components'
import {
    ArrowBack,
    Bowl,
    Finished,
    History,
    Settings,
} from '../components/Icon'
import { useSelector } from 'react-redux'
import { RootState } from '../data/type'

const SideBarAside = styled.aside`
    background-color: #333;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: center;
    padding: 1.5rem 1rem;
    border-top-left-radius: 1rem;
    border-bottom-left-radius: 1rem;
`

const ComandasUl = styled.ul`
    display: flex;
    flex-direction: column;
    gap: 5rem;
    margin-top: 4rem;
`

const ComandaLi = styled.li``

const SpanComanda = styled.span`
    font-size: 12px;
`

const Button = styled.button<{ $active?: boolean }>`
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
    width: 100%;
    align-items: center;
    color: ${(props) => props.$active && '#54a6fd'};
    position: relative;
    transition: color 0.3s ease-in-out;
    &:hover {
        color: #54a6fd;
    }
`

const SpanOrder = styled.span`
    position: absolute;
    top: -4px;
    right: -4px;
    font-size: 12px;
    background-color: red;
    border-radius: 50%;
    color: white;
    width: 20px;
    height: 20px;
    justify-content: center;
    align-items: center;
    display: flex;
`

const SideBar = () => {
    const { comandas, comandasFinalizadas } = useSelector(
        (state: RootState) => state.comandas
    )

    const numeroDeComandas = comandas.length
    const numeroDeComandasFinalizadas = comandasFinalizadas.length

    return (
        <SideBarAside>
            <ComandasUl>
                <ComandaLi>
                    <Button $active>
                        <Bowl />
                        <SpanComanda>Current</SpanComanda>
                        <SpanOrder>{numeroDeComandas}</SpanOrder>
                    </Button>
                </ComandaLi>
                <ComandaLi>
                    <Button>
                        <History />
                        <SpanComanda>Scheduled</SpanComanda>
                    </Button>
                </ComandaLi>
                <ComandaLi>
                    <Button>
                        <Finished />
                        <SpanComanda>Finished</SpanComanda>
                        {numeroDeComandasFinalizadas !== 0 && (
                            <SpanOrder>{numeroDeComandasFinalizadas}</SpanOrder>
                        )}
                    </Button>
                </ComandaLi>
                <ComandaLi>
                    <Button>
                        <ArrowBack />
                        <SpanComanda>Yesterday</SpanComanda>
                    </Button>
                </ComandaLi>
            </ComandasUl>
            <Settings />
        </SideBarAside>
    )
}

export default SideBar
