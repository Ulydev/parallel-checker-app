import React from "react"

import PageDivider from "./PageDivider"
import ParallelToolsLink from "./ParallelToolsLink"

const Footer = () => (
    <div className="w-full pb-16 mt-16 overflow-x-hidden bg-parallel-100">
        <PageDivider className="text-parallel-200" />
        <div className="flex flex-col items-center w-full max-w-4xl mx-auto mt-4">
            <ParallelToolsLink mode="dark" />
            <div className="flex flex-col items-center mt-8 text-opacity-50 font-inconsolata text-parallel-200">
                <span>
                    parallel.tools is a community website made by{" "}
                    <a
                        href="https://twitter.com/Ulydev"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="transition duration-200 hover:opacity-50"
                    >
                        ulydev
                    </a>
                    .
                </span>
                <span>all credits to Parallel team</span>
                <span>prices estimated from OpenSea</span>
            </div>
        </div>
    </div>
)

export default Footer
