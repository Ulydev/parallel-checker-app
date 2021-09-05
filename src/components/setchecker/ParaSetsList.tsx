import React, { FunctionComponent } from "react"
import { useMemo } from "react"
import { FaEthereum } from "react-icons/fa"

import { useStoreState } from "state/hooks"

import { cards } from "data/cards"
import { sets } from "data/sets"

import CardView from "./CardView"

const ParaSetView: FunctionComponent<{ set: Set<string>; setName: string }> = ({
    set,
    setName
}) => {
    const cardsBalances = useStoreState((state) => state.cardsBalances)
    const cardsPrices = useStoreState((state) => state.cardsPrices)
    const setPrice = useMemo(
        () =>
            cardsPrices
                ? Array.from(set)
                      .map((tokenId) => cardsPrices[tokenId] || 0)
                      .reduce((a, b) => a + b)
                : undefined,
        [cardsPrices, set]
    )
    return (
        <div className="flex flex-col items-start space-y-2">
            <div className="flex flex-row items-center justify-between w-full">
                <span className="text-white uppercase font-druk">
                    {setName}
                </span>
                {setPrice ? (
                    <div className="flex flex-row items-center text-xs font-bold font-inconsolata text-parallel-100">
                        <FaEthereum className="ml-1 mr-0.5 text-xs" />
                        <span className="mr-1.5">
                            {setPrice.toPrecision(4)}
                        </span>
                        <span className="ml-1.5 text-gray-600">(est.)</span>
                    </div>
                ) : null}
            </div>
            <div className="grid w-full grid-cols-6 gap-2.5">
                {Array.from(set)
                    .map((tokenId) => cards[tokenId])
                    .map((card) => (
                        <CardView
                            key={card.token_id}
                            card={card}
                            owned={
                                cardsBalances ? cardsBalances[card.token_id] : 0
                            }
                            price={
                                cardsPrices
                                    ? cardsPrices[card.token_id]
                                    : undefined
                            }
                        />
                    ))}
            </div>
        </div>
    )
}

const ParaSetsList: FunctionComponent<{}> = () => {
    return (
        <div className="flex flex-col w-full space-y-8">
            {Object.keys(sets).map((setName) => (
                <ParaSetView
                    key={setName}
                    setName={setName}
                    set={(sets as any)[setName]}
                />
            ))}
        </div>
    )
}

export default ParaSetsList
