import React from "react"

import ParallelLogo from "./ParallelLogo"

const navLinkClass =
    "transition duration-200 opacity-25 hover:opacity-100 transform hover:translate-y-0.5 active:translate-y-1"

const Navbar = () => (
    <div className="flex flex-row items-center justify-between w-full h-20 px-4 -mb-20 backdrop-filter backdrop-blur-md">
        <div className="">
            <a
                href="/"
                className="flex flex-row items-center h-12 px-2 space-x-2 group"
            >
                <span
                    style={{ willChange: "transform" }}
                    className="font-bold opacity-25 group-hover:opacity-100 text-white transition duration-200 transform group-hover:-translate-x-0.5 group-hover:-translate-y-1.5 font-druk"
                >
                    PARALLEL
                </span>
                <ParallelLogo />
                <span
                    style={{ willChange: "transform" }}
                    className="font-bold opacity-25 group-hover:opacity-100 text-white transition duration-200 transform group-hover:translate-x-0.5 group-hover:translate-y-1.5 font-druk"
                >
                    TOOLS
                </span>
            </a>
        </div>
        <div className="flex flex-row items-center space-x-8 text-white font-inconsolata">
            <a className={navLinkClass} style={{ willChange: "transform" }}>
                /parasets
            </a>
            <a className={navLinkClass} style={{ willChange: "transform" }}>
                /cardgen
            </a>
            <a className={navLinkClass} style={{ willChange: "transform" }}>
                /stats
            </a>
        </div>
    </div>
)

export default Navbar
