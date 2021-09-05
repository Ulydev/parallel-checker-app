import React, { FunctionComponent } from "react"
import { useEffect, useReducer } from "react"

import { PARASET_SNAPSHOT_TIMESTAMP } from "data/utils"

const useCountdown = (
    timestamp: number | null,
    seconds = true,
    refresh = true
) => {
    const [, forceUpdate] = useReducer((x) => x + 1, 0)
    useEffect(() => {
        if (refresh) {
            const timer = setTimeout(() => forceUpdate(), 1000)
            return () => clearTimeout(timer)
        }
    })

    if (!timestamp) return [null, ""] as [number | null, string]

    const calculateTimeLeft = () => {
        const difference = timestamp * 1000 - +Date.now()
        const remaining: { d?: number; h?: number; m?: number; s?: number } = {}
        if (difference > 0) {
            remaining.d = Math.floor(difference / (1000 * 60 * 60 * 24))
            remaining.h = Math.floor((difference / (1000 * 60 * 60)) % 24)
            remaining.m = Math.floor((difference / (1000 * 60)) % 60)
            if (seconds) remaining.s = Math.floor((difference / 1000) % 60)
        }
        return [difference, remaining]
    }
    const [difference, remaining] = calculateTimeLeft()

    return [
        difference,
        difference > 0
            ? `${Object.entries(remaining)
                  .map(([key, value]) => `${value}${key}`)
                  .join(", ")}`
            : null
    ] as [number, string]
}

const SnapshotCountdown: FunctionComponent = () => {
    const [, timeLeftLabel] = useCountdown(PARASET_SNAPSHOT_TIMESTAMP, false)

    return (
        <div className="flex flex-row items-center justify-between w-full">
            <a
                href="https://twitter.com/ParallelNFT/status/1429916649046650880"
                target="_blank"
                rel="noopener noreferrer"
                className="text-base text-gray-400 uppercase transition duration-300 font-inconsolata hover:text-parallel-100"
            >
                Snapshot on{" "}
                {new Date(PARASET_SNAPSHOT_TIMESTAMP * 1000).toLocaleString()}
            </a>
            {timeLeftLabel ? (
                <span className="text-base font-inconsolata text-parallel-100">
                    {timeLeftLabel}
                </span>
            ) : null}
        </div>
    )
}

export default SnapshotCountdown
