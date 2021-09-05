import classNames from "classnames"
import React, { FunctionComponent } from "react"
import { NavLink } from "react-router-dom"

import ParallelLogo from "./ParallelLogo"

const ParallelToolsLink: FunctionComponent<{ mode: "light" | "dark" }> = ({
    mode
}) => {
    return (
        <NavLink
            to="/"
            className="flex flex-row items-center h-12 space-x-2 group"
        >
            <span
                style={{ willChange: "transform" }}
                className={classNames(
                    "font-bold group-hover:text-opacity-100 hidden sm:block",
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
                    "font-bold group-hover:text-opacity-100 hidden sm:block",
                    "transition duration-200 transform group-hover:translate-x-0.5 group-hover:translate-y-1.5 font-druk",
                    mode === "light"
                        ? "text-white text-opacity-25"
                        : "text-parallel-200 text-opacity-75"
                )}
            >
                TOOLS
            </span>
        </NavLink>
    )
}

export default ParallelToolsLink
