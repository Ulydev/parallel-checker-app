import classnames from "classnames"
import React, { FunctionComponent, ReactElement } from "react"
import { BiChevronDown } from "react-icons/bi"

import Dropdown from "./Dropdown"

const Select: FunctionComponent<{
    value: any
    options: any[]
    onChange: (value: any) => void
    full?: boolean
    display?: (value: any) => ReactElement
    className?: string
    optionClassName?: string
    selectedOptionClassName?: string
    popupClassName?: string
}> = ({
    value,
    options,
    onChange,
    display,
    className,
    optionClassName,
    selectedOptionClassName,
    popupClassName,
    ...props
}) => {
    return (
        <Dropdown
            className={classnames(
                "flex flex-row w-full justify-start items-center px-4 py-3 bg-black rounded-sm shadow-inner text-base text-gray-200 placeholder-gray-600",
                className
            )}
            content={(open, close) => (
                <>
                    {options.map((v, i) => (
                        <button
                            key={i}
                            className={classnames(
                                "flex flex-row",
                                "pl-4 pr-8 py-3",
                                "transition duration-200",
                                i === 0 && "rounded-t-xl",
                                i === options.length - 1 && "rounded-b-xl",
                                optionClassName,
                                v === value
                                    ? "shadow-inner font-bold"
                                    : "opacity-50 hover:opacity-75",
                                v === value && selectedOptionClassName
                            )}
                            onClick={() => {
                                onChange(v)
                                close()
                            }}
                        >
                            {display ? display(v) : v}
                        </button>
                    ))}
                </>
            )}
        >
            {(open) => (
                <>
                    {display ? display(value) : value}
                    <BiChevronDown
                        className="ml-auto"
                        size="1.4rem"
                        style={open ? { transform: "scaleY(-1)" } : {}}
                    />
                </>
            )}
        </Dropdown>
    )
}

export default Select
