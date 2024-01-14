// Definir constantes para colores
const RED_COLOR = ['#ff000010', 'red']
export const ORANGE_COLOR = ['#ffae0010', '#FC7802']
export const BLUE_COLOR = ['#0e72f510', '#0e72f5']
export const GREEN_COLOR = ['#4dff0010', 'green']

export const getBackgroundColor = (percentage: number) => {
    if (percentage <= 33) {
        return RED_COLOR
    } else if (percentage <= 66) {
        return ORANGE_COLOR
    } else {
        return GREEN_COLOR
    }
}
