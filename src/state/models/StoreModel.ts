import { action, Action, Computed, computed } from "easy-peasy"

export interface StoreModel {
    cardsBalances: Record<string, { wallet: number; vault: number }> | undefined
    totalCardsBalances: Computed<StoreModel, Record<string, number> | undefined>
    setCardsBalances: Action<
        StoreModel,
        Record<string, { wallet: number; vault: number }> | undefined
    >
    cardsPrices: Record<string, number> | undefined
    setCardsPrices: Action<StoreModel, Record<string, number> | undefined>
}

const storeModel: StoreModel = {
    cardsBalances: undefined,
    totalCardsBalances: computed(
        [(state) => state.cardsBalances],
        (cardsBalances) => {
            if (!cardsBalances) return cardsBalances
            const totalCardsBalances: Record<string, number> = {}
            Object.keys(cardsBalances).forEach(
                (tokenId) =>
                    (totalCardsBalances[tokenId] =
                        cardsBalances[tokenId].wallet +
                        cardsBalances[tokenId].vault)
            )
            return totalCardsBalances
        }
    ),
    setCardsBalances: action((store, cardsBalances) => {
        store.cardsBalances = cardsBalances
    }),
    cardsPrices: undefined,
    setCardsPrices: action((store, cardsPrices) => {
        store.cardsPrices = cardsPrices
    })
}

export default storeModel
