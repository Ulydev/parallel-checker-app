import classNames from "classnames"
import React, { FunctionComponent } from "react"

import InputContainer from "./InputContainer"

const Toggle: FunctionComponent<{
    options: any[]
    value: any
    onChange: (value: any) => void
    label: string
}> = ({ options, value, onChange, label }) => (
    <InputContainer label={label}>
        <div className="flex flex-row items-center w-full overflow-hidden rounded-sm">
            {options.map((option) => (
                <button
                    key={option}
                    className={classNames(
                        "flex uppercase transition duration-200 flex-row flex-1 px-4 py-3 text-base font-bold bg-black shadow-inner text-white",
                        value === option
                            ? "text-parallel-100"
                            : "text-opacity-20 hover:text-opacity-50"
                    )}
                    onClick={() => onChange(option)}
                >
                    {option}
                </button>
            ))}
        </div>
    </InputContainer>
)

export default Toggle
