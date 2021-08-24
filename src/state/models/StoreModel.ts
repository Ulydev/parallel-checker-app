import { action, Action } from "easy-peasy"

export interface StoreModel {
    cardsBalances: Record<string, number> | undefined
    setCardsBalances: Action<StoreModel, Record<string, number> | undefined>
    cardsPrices: Record<string, number> | undefined
    setCardsPrices: Action<StoreModel, Record<string, number> | undefined>
}

const storeModel: StoreModel = {
    cardsBalances: undefined,
    setCardsBalances: action((store, cardsBalances) => {
        store.cardsBalances = cardsBalances
    }),
    cardsPrices: undefined,
    setCardsPrices: action((store, cardsPrices) => {
        store.cardsPrices = cardsPrices
    })
}

export default storeModel
