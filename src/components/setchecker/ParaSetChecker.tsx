import { providers } from "@0xsequence/multicall"
import classNames from "classnames"
import { ethers } from "ethers"
import React, { FunctionComponent } from "react"
import { useState } from "react"
import { useMemo } from "react"

import { useStoreActions, useStoreState } from "state/hooks"

import { cards } from "data/cards"
import { sets } from "data/sets"
import { getCardsBalances, getCardsBalancesInVault } from "data/utils"

import Button from "components/Button"
import Input from "components/Input"
import SetCompletionView, {
    SetCompletion
} from "components/setchecker/SetCompletionView"

const getAllCardsBalances = async (
    account: string
): Promise<Record<string, { wallet: number; vault: number }>> => {
    const provider = new providers.MulticallProvider(
        new ethers.providers.JsonRpcProvider(
            process.env.REACT_APP_JSON_RPC_ENDPOINT
        )
    )
    try {
        account = await provider.resolveName(account)
    } catch (e) {
        throw new Error("Could not resolve ENS name")
    }
    const cardsIds = Object.keys(cards)
    const walletCardsBalances = await getCardsBalances(
        account,
        [...cardsIds],
        provider
    )
    const vaultCardsBalances = await getCardsBalancesInVault(
        account,
        [...cardsIds],
        provider
    )
    const balanceByCardId: Record<string, { wallet: number; vault: number }> =
        {}
    cardsIds.forEach(
        (cardId) => (balanceByCardId[cardId] = { wallet: 0, vault: 0 })
    )
    walletCardsBalances.forEach((balance, i) => {
        balanceByCardId[cardsIds[i]].wallet = balance
    })
    vaultCardsBalances.forEach((balance, i) => {
        balanceByCardId[cardsIds[i]].vault = balance
    })
    return balanceByCardId
}

const isENSDomain = (address: string) =>
    address.includes(".eth") && address.split(".eth")[0].length > 0

const ParaSetChecker: FunctionComponent<{}> = () => {
    const totalCardsBalances = useStoreState(
        (store) => store.totalCardsBalances
    )
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

    const message = !!totalCardsBalances
        ? "Completed sets:"
        : error || (loading ? "Loading..." : <>&nbsp;</>)

    const setsCompletion = useMemo(() => {
        const result: Record<string, SetCompletion> = {}
        if (totalCardsBalances) {
            Object.keys(sets).forEach((setName) => {
                const set: Set<string> = (sets as any)[setName]
                const missingCardsCount = Array.from(set)
                    .map((tokenId) => totalCardsBalances[tokenId] > 0)
                    .map((b) => (b === true ? 0 : 1) as number)
                    .reduce((a, b) => a + b)
                const completed =
                    missingCardsCount > 0
                        ? 0
                        : Array.from(set)
                              .map((tokenId) => totalCardsBalances[tokenId])
                              .reduce((a, b) => Math.min(a, b))
                result[setName] = {
                    missingCardsCount,
                    completed
                }
            })
        }
        return result
    }, [totalCardsBalances])

    return (
        <div className="flex flex-col w-full">
            <div className="flex flex-row items-center w-full">
                <Input
                    type="text"
                    label="Address"
                    containerClassName="flex-1"
                    placeholder="0x0000...0000"
                    onChange={(e) => setAccount((e.target as any).value)}
                />
                <Button
                    className="rounded-l-none"
                    onClick={loadCardsBalances}
                    disabled={!accountValid}
                >
                    Check
                </Button>
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
                            key={i}
                            i={i}
                            setName={setName}
                            completion={setsCompletion[setName]}
                        />
                    ) : (
                        <span key={i}>&nbsp;</span>
                    )
                )}
            </div>
        </div>
    )
}

export default ParaSetChecker
