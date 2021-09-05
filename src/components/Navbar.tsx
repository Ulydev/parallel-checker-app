import React from "react"
import { NavLink as _NavLink } from "react-router-dom"
import styled from "styled-components"

import ParallelToolsLink from "./ParallelToolsLink"

const NavLink = styled(_NavLink)`
    :before {
        content: "";
        position: absolute;
        display: block;
        width: 100%;
        height: 2px;
        bottom: 0;
        left: 0;
        background-color: #d7f333;
        transform: scaleX(0);
        transform-origin: left;
        transition: transform 0.2s ease;
    }
    :hover:before {
        transform: scaleX(1);
    }
`

const navLinkClass =
    "transition duration-200 text-opacity-25 hover:text-opacity-100 text-white"

const Navbar = () => (
    <div className="flex flex-row items-center justify-between w-full h-20 px-4 -mb-20 lg:px-0 backdrop-filter backdrop-blur-md">
        <ParallelToolsLink mode="light" />
        <div className="flex flex-row items-center space-x-8 text-white font-inconsolata">
            <NavLink
                activeClassName="text-opacity-100"
                className={navLinkClass}
                style={{ willChange: "transform" }}
                to="/parasets"
            >
                /parasets
            </NavLink>
            <NavLink
                activeClassName="text-opacity-100"
                className={navLinkClass}
                style={{ willChange: "transform" }}
                to="/cardgen"
            >
                /cardgen
            </NavLink>
        </div>
    </div>
)

export default Navbar
