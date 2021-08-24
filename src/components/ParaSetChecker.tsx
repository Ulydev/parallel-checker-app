import classNames from "classnames"
import { ethers } from "ethers"
import React, { FunctionComponent } from "react"
import { useState } from "react"
import { cards } from "../data/cards"
import { getCardsBalances } from "../data/utils"

import { providers } from "@0xsequence/multicall"
import { useMemo } from "react"
import { sets } from "data/sets"
import SetCompletionView, { SetCompletion } from "./SetCompletionView"
import { useStoreActions, useStoreState } from "state/hooks"

const getAllCardsBalances = async (
    account: string
): Promise<Record<string, number>> => {
    const provider = new providers.MulticallProvider(
        new ethers.providers.JsonRpcProvider(
            process.env.REACT_APP_JSON_RPC_ENDPOINT
        )
    )
    const cardsIds = Object.keys(cards)
    const cardsBalances = await getCardsBalances(
        account,
        [...cardsIds],
        provider
    )
    const balanceByCardId: Record<string, number> = {}
    cardsBalances.forEach((balance, i) => {
        balanceByCardId[cardsIds[i]] = balance
    })
    return balanceByCardId
}

const isENSDomain = (address: string) =>
    address.includes(".eth") && address.split(".eth")[0].length > 0

const ParaSetChecker: FunctionComponent<{}> = () => {
    const cardsBalances = useStoreState((store) => store.cardsBalances)
    const setCardsBalances = useStoreActions(
        (actions) => actions.setCardsBalances
    )
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState<string>()

    const [account, setAccount] = useState<string>()
    const accountValid =
        isENSDomain(account || "") || ethers.utils.isAddress(account || "")

    const loadCardsBalances = async () => {
        if (!account) return
        setCardsBalances(undefined)
        setError(undefined)
        setLoading(true)
        try {
            setCardsBalances(await getAllCardsBalances(account))
        } catch (e) {
            setError(e.toString())
        }
        setLoading(false)
    }

    const message = !!cardsBalances
        ? "Completed sets:"
        : error || (loading ? "Loading..." : <>&nbsp;</>)

    const setsCompletion = useMemo(() => {
        const result: Record<string, SetCompletion> = {}
        if (cardsBalances) {
            Object.keys(sets).forEach((setName) => {
                const set: Set<string> = (sets as any)[setName]
                const missingCardsCount = Array.from(set)
                    .map((tokenId) => cardsBalances[tokenId] > 0)
                    .map((b) => (b === true ? 0 : 1) as number)
                    .reduce((a, b) => a + b)
                const completed =
                    missingCardsCount > 0
                        ? 0
                        : Array.from(set)
                              .map((tokenId) => cardsBalances[tokenId])
                              .reduce((a, b) => Math.min(a, b))
                result[setName] = {
                    missingCardsCount,
                    completed
                }
            })
        }
        return result
    }, [cardsBalances])

    return (
        <div className="flex flex-col">
            <div className="flex flex-row items-center space-x-4">
                <input
                    className="flex-1 px-4 py-2 text-sm placeholder-gray-400 bg-gray-100 bg-opacity-90 text-parallel-200 rounded-2xl"
                    placeholder="0x0000...0000"
                    onChange={(e) => setAccount(e.target.value)}
                />
                <button
                    onClick={loadCardsBalances}
                    className={classNames(
                        "px-8 py-2 text-sm transition duration-300 opacity-75 text-parallel-200 rounded-2xl font-inconsolata",
                        "transition duration-300",
                        accountValid
                            ? "bg-parallel-100 hover:opacity-100"
                            : "bg-gray-400"
                    )}
                    disabled={!accountValid}
                >
                    Check
                </button>
            </div>
            <span
                className={classNames(
                    "text-parallel-100 text-center font-inconsolata mt-8 text-sm",
                    loading && "animate-pulse"
                )}
            >
                {message}
            </span>
            <div className="flex flex-col mt-8 space-y-4 text-sm">
                {Object.keys(sets).map((setName, i) =>
                    !!setsCompletion[setName] ? (
                        <SetCompletionView
                            i={i}
                            setName={setName}
                            completion={setsCompletion[setName]}
                        />
                    ) : (
                        <span>&nbsp;</span>
                    )
                )}
            </div>
        </div>
    )
}

export default ParaSetChecker
