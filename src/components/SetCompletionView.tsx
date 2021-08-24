import classNames from "classnames"
import React, { FunctionComponent } from "react"
import styled, { keyframes } from "styled-components"

export type SetCompletion = {
    completed: number
    missingCardsCount: number
}

const AppearDiv = styled.div<{ i: number }>`
    animation: ${keyframes`
        from { opacity: 0; }
        to { opacity: 1; }
    `} 0.3s ${({ i }) => (i + 1) * 0.15}s forwards;
    opacity: 0;
`

const SetCompletionView: FunctionComponent<{
    setName: string
    completion: SetCompletion
    i: number
}> = ({ setName, completion, i }) => {
    return (
        <AppearDiv i={i} className="flex flex-row w-full max-w-sm mx-auto">
            <span className="w-1/2 text-white uppercase font-inconsolata">
                {setName}
            </span>
            <span
                className={classNames(
                    "uppercase font-inconsolata w-1/2 text-right",
                    completion.completed ? "text-parallel-100" : "text-gray-500"
                )}
            >
                {completion.completed > 0
                    ? `${
                          completion.completed > 1
                              ? ` ${completion.completed}`
                              : ""
                      }Completed`
                    : `${completion.missingCardsCount} missing cards`}
            </span>
        </AppearDiv>
    )
}

export default SetCompletionView
