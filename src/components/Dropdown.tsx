import classnames from "classnames"
import React, { FunctionComponent, ReactElement, useRef, useState } from "react"
import { CSSTransition } from "react-transition-group"

import { useOnClickOutside } from "hooks/useOnClickOutside"

const Dropdown: FunctionComponent<{
    className?: string
    popupClassName?: string
    content: (open: boolean, close: () => void) => React.ReactNode
    children: (open: boolean) => React.ReactNode
}> = ({ className, popupClassName, children, content, ...props }) => {
    const [open, setOpen] = useState(false)

    const ref = useRef(null)
    const nodeRef = React.useRef(null)
    useOnClickOutside(ref, () => setOpen(false))
    return (
        <div
            ref={ref}
            className={classnames(
                "w-full relative inline-block text-left rounded-sm"
            )}
        >
            <button
                {...props}
                className={className}
                onClick={() => setOpen(!open)}
            >
                {children(open)}
            </button>
            <CSSTransition
                nodeRef={nodeRef}
                in={open}
                timeout={200}
                classNames="popup"
                unmountOnExit
            >
                <div
                    ref={nodeRef}
                    className={classnames(
                        "flex flex-col origin-top-right absolute right-0 mt-1 bg-black rounded-sm z-10",
                        popupClassName
                    )}
                    style={{
                        marginRight: 0,
                        minWidth: "8rem",
                        willChange: "transform"
                    }}
                    role="menu"
                    aria-orientation="vertical"
                    aria-labelledby="options-menu"
                >
                    {content(open, () => setOpen(false))}
                </div>
            </CSSTransition>
        </div>
    )
}

export default Dropdown
