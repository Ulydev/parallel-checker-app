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
    Uncommon = "Uncommon",
    Common = "Common",
    Rare = "Rare",
    Legendary = "Legendary",
    SE = "SE"
}
export const rarities = [
    CardRarity.Uncommon,
    CardRarity.Common,
    CardRarity.Rare,
    CardRarity.Legendary,
    CardRarity.SE
]
export type CardProps = {
    image?: any
    name: string
    parallel: Parallel
    editionCount: number
    rarity: CardRarity
    type: CardType
    qrCodeContent: string
}
export type Dimensions = { width: number; height: number }
export const cardDimensions: Record<CardType, Dimensions> = {
    [CardType.Regular]: { width: 1080, height: 1620 },
    [CardType.Masterpiece]: { width: 1200, height: 1500 }
}
export const cardGradients: Record<
    CardRarity,
    (ctx: CanvasRenderingContext2D, qrDimensions: Dimensions) => CanvasGradient
> = {
    [CardRarity.Uncommon]: (ctx, { width, height }) => {
        const gradient = ctx.createLinearGradient(0, 0, width, height)
        gradient.addColorStop(0, "#7122c8")
        gradient.addColorStop(1, "#c91cbb")
        return gradient
    },
    [CardRarity.Common]: (ctx, { width, height }) => {
        const gradient = ctx.createLinearGradient(0, 0, width, height)
        gradient.addColorStop(0, "#276bf0")
        gradient.addColorStop(1, "#2d33c5")
        return gradient
    },
    [CardRarity.Rare]: (ctx, { width, height }) => {
        const gradient = ctx.createLinearGradient(
            0,
            height / 2,
            width,
            height / 2
        )
        gradient.addColorStop(0, "#e4b439")
        gradient.addColorStop(1, "#da9f01")
        return gradient
    },
    [CardRarity.Legendary]: (ctx, { width, height }) => {
        const gradient = ctx.createLinearGradient(
            0,
            height / 2,
            width,
            height / 2
        )
        gradient.addColorStop(0, "#ec8e41")
        gradient.addColorStop(1, "#cc4e3b")
        return gradient
    },
    [CardRarity.SE]: (ctx, { width, height }) => {
        const gradient = ctx.createLinearGradient(0, height, width, 0)
        gradient.addColorStop(0, "#9fb98b")
        gradient.addColorStop(0.25, "#af9496")
        gradient.addColorStop(0.5, "#9477e3")
        gradient.addColorStop(0.75, "#32c4f1")
        gradient.addColorStop(1, "#a0f5e3")
        return gradient
    }
}
