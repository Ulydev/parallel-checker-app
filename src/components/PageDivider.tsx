import React, { FunctionComponent } from "react"
import styled from "styled-components"

const PageDividerSvg = styled.svg`
    position: relative;
    display: block;
    width: calc(100% + 1.3px);
    height: 100px;
    transform: rotateY(180deg);
`

const PageDivider: FunctionComponent<{ className?: string }> = ({
    className
}) => {
    return (
        <PageDividerSvg
            data-name="Layer 1"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 1200 120"
            preserveAspectRatio="none"
            className={className}
        >
            <path
                d="M1200 120L0 16.48 0 0 1200 0 1200 120z"
                fill="currentColor"
            ></path>
        </PageDividerSvg>
    )
}

export default PageDivider
