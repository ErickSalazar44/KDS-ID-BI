import styled from 'styled-components'

export const BtnCard = styled.button.attrs<{
    $textColor?: string
    $bgColor?: string
}>((props) => ({
    $textColor: props.$textColor || '#999',
    $bgColor: props.$bgColor || '#f3f3f3',
}))`
    padding: 12px;
    text-align: center;
    font-size: 14px;
    border-radius: 10px;
    color: ${(props) => props.$textColor};
    background-color: ${(props) => props.$bgColor};
    width: 46%;
    transition: scale 150ms ease-in-out;

    &:hover {
        scale: 1.05;
    }
`
