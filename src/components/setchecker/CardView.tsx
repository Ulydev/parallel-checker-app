import classnames from "classnames"
import React, { FunctionComponent } from "react"
import { FaEthereum } from "react-icons/fa"
import { IoIosCheckmark } from "react-icons/io"
import Tilt from "react-parallax-tilt"

import { cards } from "data/cards"
import { PARALLEL_TOKEN_ADDRESS } from "data/utils"

const CardView: FunctionComponent<{
    card: typeof cards[keyof typeof cards]
    price?: number
    owned: number
}> = ({ card, owned, price }) => {
    const url = `https://opensea.io/assets/${PARALLEL_TOKEN_ADDRESS}/${card.token_id}`
    return (
        <a href={url} rel="noopener noreferrer" target="_blank">
            <Tilt
                glareEnable
                scale={1.2}
                perspective={1000}
                glareMaxOpacity={0.5}
                glareBorderRadius="0.2rem"
            >
                <div className="relative w-full h-full hover:z-10">
                    <img
                        src={card.image_thumbnail_url}
                        alt={card.token_id}
                        className={classnames(
                            "transition duration-300",
                            owned > 0 ? "opacity-100" : "opacity-25"
                        )}
                        style={{
                            willChange: "transform",
                            borderRadius: "0.2rem"
                        }}
                    />
                    {price ? (
                        <div className="absolute top-0 left-0 z-10 flex flex-row items-center mt-1 ml-1 text-base font-bold text-gray-100 bg-opacity-75 rounded-full bg-parallel-200 font-inconsolata">
                            <FaEthereum className="ml-1 mr-0.5 text-xs" />
                            <span className="mr-1.5 text-xs">
                                {price.toPrecision(2)}
                            </span>
                        </div>
                    ) : null}
                    {owned > 0 ? (
                        <div className="absolute right-0 z-10 flex flex-row items-center mt-16 mr-1 text-base font-bold border-2 rounded-full top-2 border-parallel-200 bg-parallel-100 text-parallel-200 font-inconsolata">
                            {owned > 1 ? (
                                <span className="ml-1.5 text-xs">{owned}</span>
                            ) : null}
                            <IoIosCheckmark />
                        </div>
                    ) : null}
                </div>
            </Tilt>
        </a>
    )
}

export default CardView
