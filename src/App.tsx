import styled from 'styled-components'
import './App.css'
import SideBar from './components/SideBar'
import CardComandas from './components/UI/CardComandas'
import { Config, Search, Soup } from './components/Icon'
import { useDispatch, useSelector } from 'react-redux'
import { Comanda, RootState } from './data/type'
import CardDeleteComanda from './components/UI/CardDeleteComanda'
import { ModalContainer } from './components/UI/Modal/ModalContainer'
import CardCrearComanda from './components/UI/CardCrearComanda'
import { openCreateModal } from './store/slices/modals.slice'

const Title = styled.header`
    font-size: 2rem;
    font-weight: 600;
`

const Layout = styled.main`
    background-color: #111;
    height: 100vh;
    width: 100vw;
    display: flex;
    padding: 2rem;
`

const MainApp = styled.main`
    display: flex;
    flex-direction: column;
    gap: 2rem;
    width: 100%;
    padding: 2rem;
    overflow: hidden;
    border-top-right-radius: 1rem;
    border-bottom-right-radius: 1rem;
`

const ContainerComandas = styled.section`
    display: flex;
    flex-wrap: wrap;
    gap: 1rem;
    overflow-y: auto;
    align-items: flex-start;
`

const Button = styled.button`
    border: solid 1px #999;
    padding: 0.5rem;
    display: flex;
    align-items: center;
    gap: 0.5rem;
    border-radius: 0.5rem;
`

const HeaderApp = styled.header`
    display: flex;
    justify-content: space-between;
`

const DivHeader = styled.div`
    display: flex;
    gap: 1rem;
`

function App() {
    const dispatch = useDispatch()

    const comandas: Comanda[] = useSelector(
        (state: RootState) => state.comandas.comandas
    )

    const modalIsOpen = useSelector(
        (state: RootState) => state.modals.deleteModal.isOpen
    )
    const modalCreateComanda = useSelector(
        (state: RootState) => state.modals.createComandaModal.isOpen
    )

    const handleOpenCreateModal = () => {
        dispatch(openCreateModal())
    }

    return (
        <Layout>
            <SideBar />
            <MainApp>
                <HeaderApp>
                    <Title>{comandas.length} Current Orders</Title>
                    <DivHeader>
                        <Button>
                            <Search />
                        </Button>
                        <Button>
                            <Config />
                            Filters
                        </Button>
                        <Button onClick={handleOpenCreateModal}>
                            <Soup />
                            Crear Comanda
                        </Button>
                    </DivHeader>
                </HeaderApp>
                <ContainerComandas>
                    {comandas.map((comanda) => (
                        <CardComandas key={comanda.id} comanda={comanda} />
                    ))}
                </ContainerComandas>
            </MainApp>
            {modalIsOpen && (
                <ModalContainer>
                    <CardDeleteComanda />
                </ModalContainer>
            )}
            {modalCreateComanda && (
                <ModalContainer>
                    <CardCrearComanda />
                </ModalContainer>
            )}
        </Layout>
    )
}

export default App
