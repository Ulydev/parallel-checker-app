import classNames from "classnames"
import React, { FunctionComponent, HTMLProps } from "react"
import Dropzone from "react-dropzone"

import InputContainer from "./InputContainer"

type InputProps = HTMLProps<HTMLInputElement>

const inputClassName =
    "w-full px-4 py-3 bg-black rounded-sm shadow-inner text-base text-gray-200 placeholder-gray-600"

const Input: FunctionComponent<
    Omit<InputProps, "type"> & { type: InputProps["type"] | "image" }
> = ({ label, ...props }) => {
    const element = (() => {
        switch (props.type) {
            case "image":
                return (
                    <Dropzone
                        accept="image/*"
                        maxFiles={1}
                        onDrop={([file]) =>
                            props.onChange && props.onChange(file as any)
                        }
                    >
                        {({ getRootProps, getInputProps }) => (
                            <div className={inputClassName} {...getRootProps()}>
                                <input {...getInputProps()} />
                                <p
                                    className={classNames(
                                        "font-normal normal-case",
                                        !props.value && "text-gray-600"
                                    )}
                                >
                                    {props.value
                                        ? (props.value as any).name
                                        : "Drag image here or click"}
                                </p>
                            </div>
                        )}
                    </Dropzone>
                )
            default:
                return <input className={inputClassName} {...props} />
        }
    })()

    return <InputContainer label={label || ""}>{element}</InputContainer>
}

export default Input
