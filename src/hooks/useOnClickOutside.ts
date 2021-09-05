import React, { useEffect } from "react"

export const useOnClickOutside = (
    ref: React.MutableRefObject<any>,
    callback: () => void
) => {
    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (ref && ref.current && !ref.current.contains(event.target)) {
                callback()
            }
        }
        document.addEventListener("mousedown", handleClickOutside)
        return () => {
            document.removeEventListener("mousedown", handleClickOutside)
        }
    }, [ref]) //eslint-disable-line react-hooks/exhaustive-deps
}
