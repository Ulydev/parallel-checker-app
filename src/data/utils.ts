import { Provider } from "@ethersproject/abstract-provider"
import { BigNumber } from "ethers"
import { formatEther } from "ethers/lib/utils"
import { ParallelToken__factory } from "./ParallelToken__factory"

import { RateLimiter } from "limiter"

export const PARALLEL_TOKEN_ADDRESS =
    "0x76be3b62873462d2142405439777e971754e8e77"
export const PARASET_SNAPSHOT_TIMESTAMP = 1630011600

const MAX_CARDS_PER_BATCH = 30
const MAX_CARDS_PER_OPENSEA_REQUEST = 50

export const getCardsBalancesBatch = (
    account: string,
    tokenIds: string[],
    provider: Provider
) => {
    const token = ParallelToken__factory.connect(
        PARALLEL_TOKEN_ADDRESS,
        provider
    )
    return token.balanceOfBatch(
        tokenIds.map((_) => account),
        tokenIds
    )
}

export const getCardsBalances = async (
    account: string,
    tokenIds: string[],
    provider: Provider
) => {
    const batches: string[][] = []
    while (tokenIds.length > 0) {
        batches.push(tokenIds.splice(0, MAX_CARDS_PER_BATCH))
    }
    const result: BigNumber[] = []
    return result
        .concat(
            ...(await Promise.all(
                batches.map((batch) =>
                    getCardsBalancesBatch(account, batch, provider)
                )
            ))
        )
        .map((b) => b.toNumber())
}

export const getCardsPricesBatch = async (tokenIds: string[]) => {
    const url = "https://api.opensea.io/api/v1/assets"
    const params = `${tokenIds
        .map((tokenId) => `token_ids=${tokenId}`)
        .join("&")}&asset_contract_address=${PARALLEL_TOKEN_ADDRESS}&limit=${
        tokenIds.length
    }`
    const json = await (await fetch(`${url}?${params}`)).json()
    const prices: Record<string, number> = {}
    const assets = json["assets"]
    assets.forEach((asset: any) => {
        const lastSale = asset["last_sale"]
        if (!!lastSale) {
            prices[asset["token_id"]] = parseFloat(
                formatEther(lastSale["total_price"])
            )
        }
    })
    return prices
}

export const getCardsPrices = async (tokenIds: string[]) => {
    const cardsPrices: Record<string, number> = {}
    const limiter = new RateLimiter({ tokensPerInterval: 1, interval: 1500 })
    while (tokenIds.length > 0) {
        await limiter.removeTokens(1)
        const batch = tokenIds.splice(0, MAX_CARDS_PER_OPENSEA_REQUEST)
        const batchPrices = await getCardsPricesBatch(batch)
        Object.keys(batchPrices).forEach((tokenId) => {
            cardsPrices[tokenId] = batchPrices[tokenId]
        })
    }
    return cardsPrices
}
