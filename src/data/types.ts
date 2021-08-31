export enum Parallel {
    Marcolian = "Marcolian",
    Shroud = "Shroud",
    Earthen = "Earthen",
    Augencore = "Augencore",
    Kathari = "Kathari",
    Universal = "Universal"
}
export const parallelColors: Record<Parallel, string> = {
    [Parallel.Marcolian]: "#e61912",
    [Parallel.Shroud]: "#6e21f2",
    [Parallel.Earthen]: "#4fe400",
    [Parallel.Augencore]: "#ee6f19",
    [Parallel.Kathari]: "#276ec7",
    [Parallel.Universal]: "#fefefe"
}
export const parallels = Object.keys(parallelColors)
export enum CardType {
    Regular = "Regular",
    Masterpiece = "Masterpiece"
}
export enum CardRarity {
    Standard,
    Rare,
    Legendary,
    SE
}
export type CardProps = {
    image?: any
    name: string
    parallel: Parallel
    editionCount: number
    rarity: CardRarity
    type: CardType
}
export type Dimensions = { width: number; height: number }
export const cardDimensions: Record<CardType, Dimensions> = {
    [CardType.Regular]: { width: 1080, height: 1620 },
    [CardType.Masterpiece]: { width: 1200, height: 1500 }
}
