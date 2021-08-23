import * as cardsData from "./cards.json"

const cards: Record<string, typeof cardsData.assets[0]> = {}

cardsData.assets.forEach((card) => {
    cards[card.token_id] = card
})

export { cards }
