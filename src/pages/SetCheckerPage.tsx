import React from "react"
import { BsChevronDown } from "react-icons/bs"

import PageHeader from "components/PageHeader"
import ParaSetChecker from "components/setchecker/ParaSetChecker"
import ParaSetsList from "components/setchecker/ParaSetsList"
import SnapshotCountdown from "components/setchecker/SnapshotCountdown"

const SetCheckerPage = () => (
    <div className="flex flex-col items-center w-full">
        <PageHeader
            title="ParaSet Checker"
            description="Enter your address below to check your completed ParaSets."
        />
        <div className="relative z-10 flex flex-col items-center w-full max-w-lg">
            <div className="w-full">
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
