import { resolve } from "dns"
import React, { FunctionComponent, useMemo } from "react"
import { useRef } from "react"
import { useEffect } from "react"
import { useState } from "react"
import { FaRegQuestionCircle } from "react-icons/fa"
import Tilt from "react-parallax-tilt"
import styled, { keyframes } from "styled-components"

import {
    cardDimensions,
    CardProps,
    CardRarity,
    CardType,
    Parallel,
    parallelColors,
    parallels
} from "data/types"

import Dropdown from "components/Dropdown"
import Input from "components/Input"
import InputContainer from "components/InputContainer"
import PageHeader from "components/PageHeader"
import ParallelLogo from "components/ParallelLogo"
import Select from "components/Select"
import Toggle from "components/Toggle"

const defaultCardProps: CardProps = {
    image: undefined,
    name: "",
    parallel: Parallel.Universal,
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
    const imageUrl = useMemo(() => image && URL.createObjectURL(image), [image])
    const imageObject = useMemo(() => {
        const imageObject = new Image()
        imageObject.src = imageUrl
        return new Promise<HTMLImageElement>((resolve) => {
            imageObject.onload = () => {
                resolve(imageObject)
            }
        })
    }, [image])

    const canvasRef = useRef<HTMLCanvasElement>(null)

    const dimensions = useMemo(() => cardDimensions[type], [type])
    const renderImgWithin = async (
        ctx: CanvasRenderingContext2D,
        image: HTMLImageElement,
        x0: number,
        y0: number,
        x1: number,
        y1: number
    ) => {
        const ratio = Math.max(
            (x1 - x0) / image.width,
            (y1 - y0) / image.height
        )
        const centerX = (x0 + x1) / 2
        const centerY = (y0 + y1) / 2
        const width = image.width * ratio
        const height = image.height * ratio
        ctx.save()
        const clip = new Path2D()
        clip.rect(x0, y0, x1 - x0, y1 - y0)
        ctx.clip(clip)
        ctx.drawImage(
            image,
            centerX - width / 2,
            centerY - height / 2,
            width,
            height
        )
        ctx.restore()
    }
    const renderMasterpiece = async (ctx: CanvasRenderingContext2D) => {}
    const renderRegular = async (ctx: CanvasRenderingContext2D) => {
        ctx.clearRect(0, 0, dimensions.width, dimensions.height)
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

        const drawPill = () => {
            ctx.beginPath()
            ctx.fillStyle = parallelColors[parallel]
            ctx.moveTo(40, 1460)
            ctx.lineTo(47, 1440) // right line
            ctx.arcTo(44, 1440, 44, 1436, 2)
            ctx.lineTo(36, 1460) // left line
            ctx.arcTo(35, 1464, 39, 1462, 2)
            ctx.fill()
        }
        drawPill()
        ctx.translate(4, 15)
        drawPill()
        ctx.resetTransform()

        if (image) {
            renderImgWithin(
                ctx,
                await imageObject,
                0,
                0,
                dimensions.width,
                1349
            )
        }
    }
    const render = (ctx: CanvasRenderingContext2D) => {
        if (type === CardType.Regular) {
            renderRegular(ctx)
        } else {
            renderMasterpiece(ctx)
        }
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
                    src={"https://i.ibb.co/ZVzFpBL/unnamed-1.png"}
                    className="absolute top-0 left-0 w-full h-full rounded-sm opacity-50"
                />
                <Canvas
                    ref={canvasRef}
                    width={dimensions.width}
                    height={dimensions.height}
                    className="relative z-0 w-full rounded-sm"
                    style={{ height: "36rem" }}
                />
            </div>
        </AppearTilt>
    )
}

const CardGeneratorPage: FunctionComponent<{}> = () => {
    const [name, setName] = useState(defaultCardProps.name)
    const [image, setImage] = useState(defaultCardProps.image)
    const [cardType, setCardType] = useState(defaultCardProps.type)
    const [parallel, setParallel] = useState(defaultCardProps.parallel)
    const [editionCount, setEditionCount] = useState(
        defaultCardProps.editionCount
    )
    const setCardTypeAndDimensionsIfNeeded = (type: CardType) => {
        setCardType(type)
        if (cardType !== type) {
            // update canvas dimensions
        }
    }
    return (
        <div className="flex flex-col w-full text-white">
            <PageHeader
                title="Card Generator"
                description="Create your own fan-made cards."
            />
            <div className="flex flex-col justify-center space-x-8 lg:flex-row">
                <div className="flex flex-col w-full space-y-4 lg:max-w-md">
                    <Input
                        label="Name"
                        type="text"
                        placeholder="My amazing card"
                        value={name}
                        onChange={(e) => setName((e.target as any).value)}
                    />
                    <Input
                        label="Image"
                        type="image"
                        value={image}
                        onChange={setImage as any}
                    />
                    <Input
                        label="Edition of"
                        type="number"
                        value={editionCount}
                        onChange={(e) => {
                            const n = parseInt((e.target as any).value)
                            setEditionCount(typeof n !== "number" ? 0 : n)
                        }}
                    />
                    <Toggle
                        options={[CardType.Regular, CardType.Masterpiece]}
                        label="Card Type"
                        value={cardType}
                        onChange={setCardTypeAndDimensionsIfNeeded}
                    />
                    <InputContainer label="Parallel">
                        <Select
                            value={parallel}
                            options={parallels}
                            onChange={setParallel}
                            display={(parallel: Parallel) => (
                                <div className="flex flex-row items-center space-x-4">
                                    <div className="h-3.5 transform scale-75 -translate-y-1/2">
                                        <ParallelLogo
                                            mode="dark"
                                            color={parallelColors[parallel]}
                                        />
                                    </div>
                                    <span>{parallel}</span>
                                </div>
                            )}
                        />
                    </InputContainer>
                </div>
                <CardPreview
                    {...defaultCardProps}
                    name={name}
                    editionCount={editionCount}
                    image={image}
                    type={cardType}
                    parallel={parallel}
                />
            </div>
        </div>
    )
}

export default CardGeneratorPage
