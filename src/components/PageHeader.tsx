import React, { FunctionComponent } from "react"
import styled, { keyframes } from "styled-components"

const AppearParallel = styled.span`
    animation: ${keyframes`
        from { opacity: 0; transform: translateX(-2rem); }
        to { opacity: 1; transform: translateX(0); }
    `} 0.6s 0s ease-in-out forwards;
    opacity: 0;
    will-change: transform;
`

const AppearTitle = styled.span`
    animation: ${keyframes`
        from { opacity: 0; transform: translateX(1rem); }
        to { opacity: 1; transform: translateX(0); }
    `} 0.6s 0.4s ease-in-out forwards;
    opacity: 0;
    will-change: transform;
`

const AppearDescription = styled.span`
    animation: ${keyframes`
        from { opacity: 0; transform: translateY(0.25rem); }
        to { opacity: 1; transform: translateY(0); }
    `} 1.2s 0.8s forwards;
    opacity: 0;
    will-change: transform;
`

const AppearImg = styled.img`
    animation: ${keyframes`
        from { opacity: 0; }
        to { opacity: 0.75; }
    `} 1s 1.6s ease-out forwards;
    opacity: 0;
    transform: translateX(-50%) translateZ(0);
`

const PageHeader: FunctionComponent<{ title: string; description: string }> = ({
    title,
    description
}) => {
    return (
        <div className="relative flex flex-col items-center w-full max-w-lg mx-auto">
            <AppearImg
                src="https://storage.googleapis.com/static-assets.parallelnft.com/site/Parallel_Landing_Page%20copy.gif"
                alt="gif"
                className="absolute top-0 -mt-20 h-80 left-1/2"
            />
            <div className="relative z-10 flex flex-col items-center w-full">
                <AppearParallel className="text-4xl text-white uppercase md:text-6xl font-druk">
                    Parallel
                </AppearParallel>
                <AppearTitle className="text-xl text-white uppercase md:text-3xl font-druk">
                    {title}
                </AppearTitle>
                <AppearDescription className="w-full mt-8 text-center text-white font-inconsolata max-w-prose">
                    {description}
                </AppearDescription>
            </div>
        </div>
    )
}

export default PageHeader
