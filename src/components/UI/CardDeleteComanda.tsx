import styled from 'styled-components'
import { Bowl } from '../Icon'
import { BtnCard } from './Button/StyledButton'
import { useDispatch, useSelector } from 'react-redux'
import { closeDeleteModal } from '../../store/slices/modals.slice'
import { deleteComanda } from '../../store/slices/comandas.slice'
import { RootState } from '../../data/type'

const CardDeleteContainer = styled.div`
    background-color: white;
    color: #1d1e22;
    display: flex;
    gap: 0.5rem;
    flex-direction: column;
    padding: 1.2rem;
    border-radius: 1rem;
`
const TitleCardDelete = styled.h3`
    font-weight: 600;
`

const SpamCardDelete = styled.span`
    font-size: 12px;
`

const DivButton = styled.div`
    display: flex;
    gap: 0.5rem;
    justify-content: space-between;
`

const CardDeleteComanda = () => {
    const dispatch = useDispatch()
    const comandaId = useSelector(
        (state: RootState) => state.modals.deleteModal.comandaId
    )

    const handleCancelClick = () => {
        dispatch(closeDeleteModal())
    }

    const handleDeleteComanda = () => {
        dispatch(deleteComanda(comandaId))
        dispatch(closeDeleteModal())
    }

    return (
        <CardDeleteContainer>
            <Bowl />
            <TitleCardDelete>Delete comanda</TitleCardDelete>
            <SpamCardDelete>Esta accion eliminara la comanda </SpamCardDelete>
            <DivButton>
                <BtnCard onClick={handleCancelClick}>Cancel</BtnCard>
                <BtnCard
                    onClick={handleDeleteComanda}
                    $textColor='white'
                    $bgColor='red'
                >
                    Delete
                </BtnCard>
            </DivButton>
        </CardDeleteContainer>
    )
}

export default CardDeleteComanda
