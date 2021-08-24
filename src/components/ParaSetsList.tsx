import React, { FunctionComponent } from "react"

import { sets } from "../data/sets"
import { cards } from "../data/cards"

import { useStoreState } from "state/hooks"
import CardView from "./CardView"

const ParaSetView: FunctionComponent<{ set: Set<string>; setName: string }> = ({
    set,
    setName
}) => {
    const cardsBalances = useStoreState((state) => state.cardsBalances)
    return (
        <div className="flex flex-col items-start space-y-2">
            <span className="text-white uppercase font-druk">{setName}</span>
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
