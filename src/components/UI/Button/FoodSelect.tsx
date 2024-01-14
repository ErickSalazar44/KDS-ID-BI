import styled from 'styled-components'
import { MenuDataSection } from '../../../data/type'

const CardFoodSelect = styled.button<{ $active?: boolean }>`
    display: flex;
    flex-direction: column;
    gap: 1rem;
    align-items: center;
    scale: ${(props) => props.$active && '1.10'};
    transition: scale 0.3s;
`

const CardFigure = styled.figure`
    width: 80px;
    height: auto;
    display: block;
`

const CardName = styled.h3`
    font-weight: 600;
    font-size: 14px;
    color: #1d1e22;
`

const CardImg = styled.img`
    width: 80px;
    height: auto;
    aspect-ratio: 1;
`

interface FoodSelectProps {
    menu: MenuDataSection
    setSelectCategoria: React.Dispatch<React.SetStateAction<string | null>>
    selectCategoria: string | null
}

const FoodSelect: React.FC<FoodSelectProps> = ({
    menu,
    setSelectCategoria,
    selectCategoria,
}) => {
    const { name, img } = menu

    const handleSelectClick = (name: string) => {
        setSelectCategoria(name)
    }

    const isActive = selectCategoria === name

    return (
        <CardFoodSelect
            $active={isActive}
            onClick={() => handleSelectClick(name)}
        >
            <CardFigure>
                <CardImg src={img} alt={name} />
            </CardFigure>
            <CardName>{name}</CardName>
        </CardFoodSelect>
    )
}

export default FoodSelect
