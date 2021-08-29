import { StoreProvider } from "easy-peasy"
import SetCheckerPage from "pages/SetCheckerPage"
import React from "react"
import { useEffect } from "react"
import { BsChevronDown } from "react-icons/bs"

import { useStoreActions } from "state/hooks"
import store from "state/store"

import { sets } from "data/sets"
import { getCardsPrices } from "data/utils"

import Footer from "components/Footer"
import Navbar from "components/Navbar"
import PageContentContainer from "components/PageContentContainer"

const CardsPricesLoader = () => {
    const cardsPrices = useStoreActions((state) => state.cardsPrices)
    const setCardsPrices = useStoreActions((actions) => actions.setCardsPrices)
    useEffect(() => {
        const loadPrices = async () => {
            const cardsInSets = Object.values(sets)
                .map((set) => Array.from(set))
                .reduce((a, b) => [...a, ...b])
            const prices = await getCardsPrices(cardsInSets)
            setCardsPrices(prices)
        }
        if (cardsPrices === undefined) {
            loadPrices().catch(console.error)
        }
    }, []) //eslint-disable-line react-hooks/exhaustive-deps
    return null
}

const App = () => {
    return (
        <StoreProvider store={store}>
            <CardsPricesLoader />
            <div className="flex flex-col items-center w-full max-w-4xl mx-auto">
                <Navbar />
                <PageContentContainer>
                    <SetCheckerPage />
                </PageContentContainer>
                <Footer />
            </div>
        </StoreProvider>
    )
}

export default App
