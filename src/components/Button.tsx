import classNames from "classnames"
import React, { FunctionComponent, HTMLProps } from "react"

type ButtonProps = HTMLProps<HTMLButtonElement>

const Button: FunctionComponent<
    Omit<ButtonProps, "type"> & { type?: "button" | "submit" | "reset" }
> = ({ className, children, ...props }) => (
    <button
        className={classNames(
            "relative py-3 px-4 text-sm bg-parallel-100 transition duration-200 bg-opacity-5 overflow-hidden font-bold uppercase border-b-2 rounded-sm shadow-md group",
            props.disabled ? "border-gray-600" : "border-parallel-100",
            className
        )}
        {...props}
    >
        <div
            className={classNames(
                "relative z-10 transition duration-200",
                props.disabled
                    ? "text-gray-600"
                    : "text-gray-200 group-hover:text-parallel-200 group-hover:text-opacity-75"
            )}
        >
            {children}
        </div>
        <div
            className={classNames(
                "absolute top-0 left-0 w-full h-full transition duration-200 origin-bottom transform scale-y-0 bg-parallel-100",
                !props.disabled && "group-hover:scale-y-100"
            )}
        />
    </button>
)

export default Button
