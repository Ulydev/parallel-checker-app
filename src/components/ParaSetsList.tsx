import React, { FunctionComponent } from "react"

import { sets } from "../data/sets"
import { cards } from "../data/cards"

import styled, { keyframes } from "styled-components"

const Card = styled.img`
    :hover {
        animation: ${keyframes`
            from: { transform: scale(1); }
            to { transform: scale(1.2) translateY(-10%); }
        `} 0.2s forwards;
    }
`

const CardView: FunctionComponent<{
    card: typeof cards[keyof typeof cards]
}> = ({ card }) => {
    return (
        <div className="flex flex-col items-center w-full space-y-2">
            <a
                href={card.external_link}
                target="_blank"
                rel="noopener noreferrer"
            >
                <Card
                    src={card.image_thumbnail_url}
                    alt={card.token_id}
                    className="relative hover:z-10"
                    style={{ willChange: "transform" }}
                />
            </a>
        </div>
    )
}

const ParaSetView: FunctionComponent<{ set: Set<string>; setName: string }> = ({
    set,
    setName
}) => {
    return (
        <div className="flex flex-col items-start space-y-2">
            <span className="text-white uppercase font-druk">{setName}</span>
            <div className="grid w-full grid-cols-6">
                {Array.from(set)
                    .map((tokenId) => cards[tokenId])
                    .map((card) => (
                        <CardView card={card} />
                    ))}
            </div>
        </div>
    )
}

const ParaSetsList: FunctionComponent<{}> = () => {
    return (
        <div className="flex flex-col w-full space-y-8">
            {Object.keys(sets).map((setName) => (
                <ParaSetView setName={setName} set={(sets as any)[setName]} />
            ))}
        </div>
    )
}

export default ParaSetsList
