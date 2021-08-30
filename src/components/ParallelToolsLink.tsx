import classNames from "classnames"
import React, { FunctionComponent } from "react"

import ParallelLogo from "./ParallelLogo"

const ParallelToolsLink: FunctionComponent<{ mode: "light" | "dark" }> = ({
    mode
}) => {
    return (
        <a href="/" className="flex flex-row items-center h-12 space-x-2 group">
            <span
                style={{ willChange: "transform" }}
                className={classNames(
                    "font-bold group-hover:text-opacity-100",
                    "transition duration-200 transform group-hover:-translate-x-0.5 group-hover:-translate-y-1.5 font-druk",
                    mode === "light"
                        ? "text-white text-opacity-25"
                        : "text-parallel-200 text-opacity-75"
                )}
            >
                PARALLEL
            </span>
            <ParallelLogo mode={mode} />
            <span
                style={{ willChange: "transform" }}
                className={classNames(
                    "font-bold group-hover:text-opacity-100",
                    "transition duration-200 transform group-hover:translate-x-0.5 group-hover:translate-y-1.5 font-druk",
                    mode === "light"
                        ? "text-white text-opacity-25"
                        : "text-parallel-200 text-opacity-75"
                )}
            >
                TOOLS
            </span>
        </a>
    )
}

export default ParallelToolsLink
