import React, { FunctionComponent } from "react"
import { useRef } from "react"
import { useEffect } from "react"
import { useState } from "react"
import Tilt from "react-parallax-tilt"
import styled, { keyframes } from "styled-components"

import Input from "components/Input"
import PageHeader from "components/PageHeader"

const cardDimensions = { width: 1080, height: 1620 }

enum Parallel {
    Marcolian = "Marcolian",
    Shroud = "Shroud",
    Earthen = "Earthen",
    Augencore = "Augencore",
    Kathari = "Kathari"
}
enum CardType {
    Regular,
    Masterpiece
}
enum CardRarity {
    Standard,
    Rare,
    Legendary,
    SE
}
type CardProps = {
    image?: string
    name: string
    parallel: Parallel
    editionCount: number
    rarity: CardRarity
    type: CardType
}
const defaultCardProps: CardProps = {
    image: undefined,
    name: "Manipulation Ray",
    parallel: Parallel.Marcolian,
    editionCount: 1500,
    rarity: CardRarity.Rare,
    type: CardType.Regular
}

const AppearTilt = styled(Tilt)`
    animation: ${keyframes`
        from { opacity: 0; }
        to { opacity: 1; }
    `} 1s 0.6s ease-in-out forwards;
    opacity: 0;
`

const Canvas = styled.canvas`
    font-smooth: always;
`

const CardPreview: FunctionComponent<CardProps> = ({
    image,
    name,
    parallel,
    editionCount,
    rarity,
    type
}) => {
    const canvasRef = useRef<HTMLCanvasElement>(null)
    const render = (ctx: CanvasRenderingContext2D) => {
        ctx.clearRect(0, 0, cardDimensions.width, cardDimensions.height)
        ctx.fillStyle = "white"
        ctx.font = 'lighter 20px "HK Grotesk"'
        ctx.fillText("FAN MADE", 73, 1407) // LABEL
        ctx.font = 'bold 30px "HK Grotesk"'
        ctx.fillText(name.toUpperCase(), 73, 1520) // NAME
        ctx.font = 'bold 56px "HK Grotesk"'
        ctx.fillText(parallel.toUpperCase(), 70, 1478) // PARALLEL
        ctx.font = 'lighter 20px "HK Grotesk"'
        ctx.fillText(
            `Edition of ${editionCount.toLocaleString("en-US")}`,
            73,
            1572
        ) // EDITION #
    }
    useEffect(() => {
        const ctx = canvasRef.current?.getContext("2d")
        if (ctx) {
            render(ctx)
        }
    }, [image, name, parallel, editionCount, rarity, type])

    return (
        <AppearTilt
            glareEnable
            perspective={1000}
            glareMaxOpacity={0.5}
            glareBorderRadius="0.2rem"
        >
            <div
                className="relative w-full h-full overflow-hidden shadow-xl hover:z-10 border-sm"
                style={{
                    boxShadow:
                        "0 4px 8px 0 rgba(255, 255, 255, 0.1), 0 6px 20px 0 rgba(255, 255, 255, 0.12)"
                }}
            >
                <img
                    src="https://i.ibb.co/ZVzFpBL/unnamed-1.png"
                    className="absolute top-0 left-0 w-full h-full opacity-100"
                />
                <Canvas
                    ref={canvasRef}
                    width={cardDimensions.width}
                    height={cardDimensions.height}
                    className="relative z-0 w-full"
                    style={{ height: "36rem" }}
                />
            </div>
        </AppearTilt>
    )
}

const CardGeneratorPage: FunctionComponent<{}> = () => {
    const [name, setName] = useState(defaultCardProps.name)
    return (
        <div className="flex flex-col w-full text-white">
            <PageHeader
                title="Card Generator"
                description="Create your own fan-made cards."
            />
            <div className="flex flex-row justify-center space-x-16">
                <div className="flex flex-col w-full max-w-md space-y-4">
                    <Input
                        label="Name"
                        type="text"
                        value={name}
                        onChange={(e) => setName((e.target as any).value)}
                    />
                </div>
                <CardPreview {...defaultCardProps} name={name} />
            </div>
        </div>
    )
}

export default CardGeneratorPage
