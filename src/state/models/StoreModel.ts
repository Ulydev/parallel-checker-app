import { action, Action } from "easy-peasy"

export interface StoreModel {
    cardsBalances: Record<string, number> | undefined
    setCardsBalances: Action<StoreModel, Record<string, number> | undefined>
}

const storeModel: StoreModel = {
    cardsBalances: undefined,
    setCardsBalances: action((store, cardsBalances) => {
        store.cardsBalances = cardsBalances
    })
}

export default storeModel
