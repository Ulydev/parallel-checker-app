import classNames from "classnames"
import React, { FunctionComponent } from "react"

export type SetCompletion = {
    completed: boolean
    missingCardsCount: number
}

const SetCompletionView: FunctionComponent<{
    setName: string
    completion: SetCompletion
}> = ({ setName, completion }) => {
    return (
        <div className="flex flex-row w-full max-w-sm mx-auto">
            <span className="w-1/2 text-white uppercase font-inconsolata">
                {setName}
            </span>
            <span
                className={classNames(
                    "uppercase font-inconsolata w-1/2 text-right",
                    completion.completed ? "text-parallel-100" : "text-gray-500"
                )}
            >
                {completion.completed
                    ? "Completed"
                    : `${completion.missingCardsCount} missing cards`}
            </span>
        </div>
    )
}

export default SetCompletionView
