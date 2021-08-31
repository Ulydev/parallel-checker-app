import React, { FunctionComponent, HTMLProps } from "react"

const Input: FunctionComponent<HTMLProps<HTMLInputElement>> = ({
    label,
    ...props
}) => {
    return (
        <div className="flex flex-row items-center pl-4 space-x-4 overflow-hidden font-bold uppercase border-l-2 rounded-sm shadow-md bg-opacity-5 bg-parallel-100 border-parallel-100">
            <span className="text-xs text-gray-200">{label}</span>
            <input
                className="w-full px-4 py-3 bg-transparent bg-black bg-opacity-100 rounded-sm shadow-inner"
                {...props}
            />
        </div>
    )
}

export default Input
