import { Provider } from "@ethersproject/abstract-provider"
import { BigNumber } from "ethers"
import { ParallelToken__factory } from "./ParallelToken__factory"

const PARALLEL_TOKEN_ADDRESS = "0x76be3b62873462d2142405439777e971754e8e77"

const MAX_CARDS_PER_BATCH = 30

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
