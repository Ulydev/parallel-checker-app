import React from "react"

import { StoreProvider } from "easy-peasy"
import store from "./state/store"
import ParaSetChecker from "./components/ParaSetChecker"

import { BsChevronDown } from "react-icons/bs"
import ParaSetsList from "./components/ParaSetsList"
import SnapshotCountdown from "components/SnapshotCountdown"
import { useEffect } from "react"
import { useStoreActions } from "state/hooks"
import { getCardsPrices } from "data/utils"
import { sets } from "data/sets"

const CardsPricesLoader = () => {
    const setCardsPrices = useStoreActions((actions) => actions.setCardsPrices)
    useEffect(() => {
        const loadPrices = async () => {
            const cardsInSets = Object.values(sets)
                .map((set) => Array.from(set))
                .reduce((a, b) => [...a, ...b])
            const prices = await getCardsPrices(cardsInSets)
            setCardsPrices(prices)
        }
        loadPrices().catch(console.error)
    }, []) //eslint-disable-line react-hooks/exhaustive-deps
    return null
}

const App = () => {
    return (
        <StoreProvider store={store}>
            <CardsPricesLoader />
            <a
                className="absolute top-0 left-0 z-10 flex flex-row items-center justify-center w-12 h-12 mt-4 ml-4 text-4xl font-bold text-black transition duration-300 rounded-full opacity-50 bg-gradient-to-br from-parallel-100 to-parallel-200 font-avenir hover:opacity-100"
                href="https://uly.dev"
                target="_blank"
                rel="noopener noreferrer"
            >
                <span className="flex -mt-1">u</span>
            </a>
            <div className="flex flex-col items-center w-full p-4 py-32 bg-parallel-200">
                <img
                    src="https://storage.googleapis.com/static-assets.parallelnft.com/site/Parallel_Landing_Page%20copy.gif"
                    alt="gif"
                    className="absolute top-0 mt-12 transform -translate-x-1/2 opacity-75 h-80 left-1/2"
                />
                <div className="relative z-10 flex flex-col items-center w-full max-w-lg">
                    <span className="text-4xl text-white uppercase md:text-6xl font-druk">
                        Parallel
                    </span>
                    <span className="text-xl text-white uppercase md:text-3xl font-druk">
                        ParaSet Checker
                    </span>
                    <span className="w-full mt-8 text-center text-white font-inconsolata max-w-prose">
                        Enter your address below to check your completed
                        ParaSets.
                    </span>
                    <div className="w-full mt-32">
                        <div className="px-1 mb-2">
                            <SnapshotCountdown />
                        </div>
                        <ParaSetChecker />
                    </div>
                    <div className="flex flex-col items-center w-full mt-16">
                        <span className="mb-16 text-white font-inconsolata">
                            ...or check all ParaSets to collect{" "}
                            <BsChevronDown className="inline-block font-bold text-parallel-100 animate-bounce" />
                        </span>
                        <ParaSetsList />
                    </div>
                    <span className="mt-32 text-center opacity-50 font-inconsolata text-parallel-100">
                        Made by ulydev.eth
                        <br />
                        All credits to Parallel team
                        <br />
                        Prices estimated from OpenSea
                    </span>
                </div>
            </div>
        </StoreProvider>
    )
}

export default App
