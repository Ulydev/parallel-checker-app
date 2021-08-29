import React from "react"
import { BsChevronDown } from "react-icons/bs"

import ParaSetChecker from "components/setchecker/ParaSetChecker"
import ParaSetsList from "components/setchecker/ParaSetsList"
import SnapshotCountdown from "components/setchecker/SnapshotCountdown"

const SetCheckerPage = () => (
    <div className="relative flex flex-col items-center w-full">
        <img
            src="https://storage.googleapis.com/static-assets.parallelnft.com/site/Parallel_Landing_Page%20copy.gif"
            alt="gif"
            className="absolute top-0 -mt-20 transform -translate-x-1/2 opacity-75 h-80 left-1/2"
        />
        <div className="relative z-10 flex flex-col items-center w-full max-w-lg">
            <span className="text-4xl text-white uppercase md:text-6xl font-druk">
                Parallel
            </span>
            <span className="text-xl text-white uppercase md:text-3xl font-druk">
                ParaSet Checker
            </span>
            <span className="w-full mt-8 text-center text-white font-inconsolata max-w-prose">
                Enter your address below to check your completed ParaSets.
            </span>
            <div className="w-full mt-32">
                <div className="px-1 mb-2">
                    <SnapshotCountdown />
                </div>
                <ParaSetChecker />
            </div>
            <div className="flex flex-col items-center w-full mt-16">
                <span className="mb-16 text-white font-inconsolata">
                    ...or check all ParaSets to collect{" "}
                    <BsChevronDown className="inline-block font-bold text-parallel-100 animate-bounce" />
                </span>
                <ParaSetsList />
            </div>
        </div>
    </div>
)

export default SetCheckerPage
