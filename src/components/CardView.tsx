import React, { FunctionComponent } from "react"

import { cards } from "../data/cards"

import classnames from "classnames"

import { IoIosCheckmark } from "react-icons/io"
import { PARALLEL_TOKEN_ADDRESS } from "data/utils"
import { useRef } from "react"

const CardView: FunctionComponent<{
    card: typeof cards[keyof typeof cards]
    owned: number
}> = ({ card, owned }) => {
    const url = `https://opensea.io/assets/${PARALLEL_TOKEN_ADDRESS}/${card.token_id}`
    const cardRef = useRef<HTMLAnchorElement>(null)
    return (
        <div
            className="flex flex-col items-center w-full space-y-2 transition duration-300 transform hover:shadow-lg hover:z-10 hover:scale-125"
            onMouseMove={(e) => {
                if (!cardRef.current) return
                const rect = e.currentTarget.getBoundingClientRect()
                let xAxis = (rect.x + rect.width / 2 - e.clientX) / 2
                let yAxis = (rect.y + rect.height / 2 - e.clientY) / 5
                cardRef.current.className = cardRef.current.className.replace(
                    "transition duration-300",
                    ""
                )
                cardRef.current.style.transform = `rotateY(${xAxis}deg) rotateX(${-yAxis}deg)`
            }}
            onMouseOut={(e) => {
                if (!cardRef.current) return
                cardRef.current.className += "transition duration-300"
                cardRef.current.style.transform = `rotateY(0) rotateX(0)`
            }}
        >
            <a
                ref={cardRef}
                className="relative hover:z-10"
                href={url}
                target="_blank"
                rel="noopener noreferrer"
                style={{ transformStyle: "preserve-3d", perspective: 1000 }}
            >
                <img
                    src={card.image_thumbnail_url}
                    alt={card.token_id}
                    className={classnames(
                        "relative transition duration-300",
                        owned > 0 ? "opacity-100" : "opacity-25"
                    )}
                    style={{ willChange: "transform", borderRadius: "0.2rem" }}
                />
                {owned > 0 ? (
                    <div className="absolute top-0 right-0 flex flex-row items-center mt-1 mr-1 text-base font-bold border-2 rounded-full border-parallel-200 bg-parallel-100 text-parallel-200 font-inconsolata">
                        {owned > 1 ? (
                            <span className="ml-1.5 text-xs">{owned}</span>
                        ) : null}
                        <IoIosCheckmark />
                    </div>
                ) : null}
            </a>
        </div>
    )
}

export default CardView
