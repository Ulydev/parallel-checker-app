import { FunctionComponent } from "react"

const InputContainer: FunctionComponent<{ label: string }> = ({
    label,
    children
}) => (
    <div className="flex flex-row items-center pl-4 space-x-4 font-bold uppercase border-l-2 rounded-sm shadow-md bg-opacity-5 bg-parallel-100 border-parallel-100">
        <span className="w-24 text-xs text-gray-300 text-opacity-50">
            {label}
        </span>
        {children}
    </div>
)

export default InputContainer
