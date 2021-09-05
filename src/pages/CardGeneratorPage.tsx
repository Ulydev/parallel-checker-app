import QRCode from "easyqrcodejs"
import React, { FunctionComponent, useCallback, useMemo } from "react"
import { useRef } from "react"
import { useEffect } from "react"
import { useState } from "react"
import Tilt from "react-parallax-tilt"
import styled, { keyframes } from "styled-components"

import {
    cardDimensions,
    cardGradients,
    CardProps,
    CardRarity,
    CardType,
    Dimensions,
    Parallel,
    parallelColors,
    parallels,
    rarities
} from "data/types"

import Button from "components/Button"
import Input from "components/Input"
import InputContainer from "components/InputContainer"
import PageHeader from "components/PageHeader"
import ParallelLogo from "components/ParallelLogo"
import Select from "components/Select"

const defaultCardProps: CardProps = {
    image: undefined,
    name: "",
    parallel: Parallel.Universal,
    editionCount: 1500,
    rarity: CardRarity.Rare,
    type: CardType.Regular,
    qrCodeContent: "https://www.youtube.com/watch?v=dQw4w9WgXcQ"
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

const qrDimensions: Dimensions = { width: 256, height: 256 }

const CardPreview: FunctionComponent<
    CardProps & { canvasRef: React.RefObject<HTMLCanvasElement> }
> = ({
    image,
    name,
    parallel,
    editionCount,
    rarity,
    type,
    canvasRef,
    qrCodeContent = defaultCardProps.qrCodeContent
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
    }, [imageUrl])

    const dividerObject = useMemo(() => {
        const dividerObject = new Image()
        dividerObject.src = `/assets/card-dividers/${rarity
            .toString()
            .toLowerCase()}.png`
        return new Promise<HTMLImageElement>((resolve) => {
            dividerObject.onload = () => {
                resolve(dividerObject)
            }
        })
    }, [rarity])
    const dimensions = useMemo(() => cardDimensions[type], [type])

    const qrImage = useMemo(() => {
        const element = document.createElement("div")
        new QRCode(element, {
            text: qrCodeContent,
            width: qrDimensions.width,
            height: qrDimensions.height,
            colorDark: "black",
            colorLight: "transparent",
            correctLevel: QRCode.CorrectLevel.M
        })
        const canvas = element.children[0] as HTMLCanvasElement
        const ctx = canvas.getContext("2d")!
        const gradient = cardGradients[rarity](ctx, qrDimensions)
        ctx.globalCompositeOperation = "source-in"
        ctx.fillStyle = gradient
        ctx.fillRect(0, 0, qrDimensions.width + 120, qrDimensions.height + 120) // 100px margin for overflowing qr code
        return canvas
    }, [qrCodeContent, rarity])

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
    const renderMasterpiece = useCallback(
        async (ctx: CanvasRenderingContext2D) => {},
        []
    )
    const renderRegular = useCallback(
        async (ctx: CanvasRenderingContext2D) => {
            ctx.clearRect(0, 0, dimensions.width, dimensions.height)
            ctx.fillStyle = "black"
            ctx.fillRect(0, 0, dimensions.width, dimensions.height)
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

            // image
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

            // divider
            const divider = await dividerObject
            ctx.drawImage(divider, 0, 1348)

            // qr code
            ctx.drawImage(qrImage, 871, 1409, 153, 153)
        },
        [
            dimensions,
            dividerObject,
            editionCount,
            image,
            imageObject,
            name,
            parallel,
            qrImage
        ]
    )
    const render = useMemo(
        () => (type === CardType.Regular ? renderRegular : renderMasterpiece),
        [type, renderRegular, renderMasterpiece]
    )
    useEffect(() => {
        const ctx = canvasRef.current?.getContext("2d")
        if (ctx) {
            render(ctx)
        }
    }, [
        image,
        name,
        parallel,
        editionCount,
        rarity,
        type,
        qrImage,
        canvasRef,
        render
    ])

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
                <Canvas
                    ref={canvasRef}
                    width={dimensions.width}
                    height={dimensions.height}
                    className="w-full rounded-sm h-96 lg:h-36rem"
                />
            </div>
        </AppearTilt>
    )
}

const CardGeneratorPage: FunctionComponent<{}> = () => {
    const [name, setName] = useState(defaultCardProps.name)
    const [image, setImage] = useState(defaultCardProps.image)
    //const [type, setType] = useState(defaultCardProps.type)
    const [parallel, setParallel] = useState(defaultCardProps.parallel)
    const [rarity, setRarity] = useState(defaultCardProps.rarity)
    const [qrCodeContent, setQRCodeContent] = useState<string>()
    const [editionCount, setEditionCount] = useState(
        defaultCardProps.editionCount
    )
    /*
    const setTypeAndDimensionsIfNeeded = (type: CardType) => {
        setType(type)
        if (type !== type) {
            // update canvas dimensions
        }
    }
    */

    const canvasRef = useRef<HTMLCanvasElement>(null)

    const DownloadImageButton = (mobile: boolean) => (
        <Button
            onClick={() => {
                const image =
                    canvasRef.current &&
                    canvasRef.current
                        .toDataURL("image/png")
                        .replace("image/png", "image/octet-stream")
                if (image) window.location.href = image
            }}
            className={mobile ? "lg:hidden w-full" : "hidden lg:block mt-auto"}
        >
            Download image
        </Button>
    )

    return (
        <div className="flex flex-col w-full text-white">
            <PageHeader
                title="Card Generator"
                description="Create your own fan-made cards."
            />
            <div className="flex flex-col items-center justify-center space-y-4 lg:space-y-0 lg:items-stretch lg:space-x-8 lg:flex-row">
                <div className="flex flex-col w-full lg:max-w-md">
                    <div className="flex flex-col w-full space-y-4">
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
                        {/*
                        <Toggle
                            options={[CardType.Regular, CardType.Masterpiece]}
                            label="Card Type"
                            value={cardType}
                            onChange={setCardTypeAndDimensionsIfNeeded}
                        />
                        */}
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
                        <InputContainer label="Rarity">
                            <Select
                                value={rarity}
                                options={rarities}
                                onChange={setRarity}
                            />
                        </InputContainer>
                        <Input
                            label="QR Code"
                            type="text"
                            value={qrCodeContent}
                            onChange={(e) => {
                                setQRCodeContent((e.target as any).value)
                            }}
                            placeholder="Any text content"
                        />
                    </div>
                    {DownloadImageButton(false)}
                </div>
                <CardPreview
                    {...defaultCardProps}
                    name={name}
                    editionCount={editionCount}
                    image={image}
                    rarity={rarity}
                    parallel={parallel}
                    canvasRef={canvasRef}
                    qrCodeContent={
                        qrCodeContent || defaultCardProps.qrCodeContent
                    }
                />
                {DownloadImageButton(true)}
            </div>
        </div>
    )
}

export default CardGeneratorPage
