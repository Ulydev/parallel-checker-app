import classNames from "classnames"
import React, { FunctionComponent } from "react"

const ParallelLogo: FunctionComponent<{
    mode: "dark" | "light"
    color?: string
    animated?: boolean
}> = ({ mode, color, animated = true }) => (
    <svg
        width="14"
        height="33"
        viewBox="0 0 14 33"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="overflow-visible"
    >
        {/* disappearing */}
        <path
            d="M9.31629 13.6688C9.70614 12.5988 10.9087 12.0406 12.0026 12.4219L12.0597 12.4427C13.1164 12.8444 13.6605 13.9982 13.2775 15.0494L7.41768 31.1331C7.02783 32.2032 5.82532 32.7614 4.73133 32.3801L4.67424 32.3593C3.61761 31.9575 3.07346 30.8038 3.45648 29.7525L9.31629 13.6688Z"
            fill="currentColor"
            style={{ willChange: "transform", color }}
            className={classNames(
                "transition duration-300 transform group-hover:duration-200",
                animated &&
                    "group-hover:-translate-x-1 group-hover:translate-y-2 group-hover:opacity-0",
                mode === "light" ? "text-white" : "text-parallel-200"
            )}
        ></path>
        <path
            d="M6.58252 1.86686C6.97237 0.796817 8.17487 0.238601 9.26887 0.619918L9.32596 0.640716C10.3826 1.04247 10.9267 2.19619 10.5437 3.24747L4.6839 19.3312C4.29405 20.4012 3.09154 20.9594 1.99755 20.5781L1.94046 20.5573C0.883828 20.1556 0.339688 19.0019 0.722699 17.9506L6.58252 1.86686Z"
            fill="currentColor"
            style={{ willChange: "transform", color }}
            className={classNames(
                "transition duration-300 transform group-hover:duration-200",
                animated &&
                    "group-hover:translate-x-1 group-hover:-translate-y-2 group-hover:opacity-0",
                mode === "light" ? "text-white" : "text-parallel-200"
            )}
        ></path>
        {/* appearing */}
        {animated && (
            <>
                <path
                    d="M9.31629 13.6688C9.70614 12.5988 10.9087 12.0406 12.0026 12.4219L12.0597 12.4427C13.1164 12.8444 13.6605 13.9982 13.2775 15.0494L7.41768 31.1331C7.02783 32.2032 5.82532 32.7614 4.73133 32.3801L4.67424 32.3593C3.61761 31.9575 3.07346 30.8038 3.45648 29.7525L9.31629 13.6688Z"
                    fill="currentColor"
                    className={classNames(
                        "transition duration-200 transform translate-x-1 -translate-y-2 opacity-0 group-hover:duration-300 group-hover:translate-x-0 group-hover:translate-y-0 group-hover:opacity-100",
                        mode === "light"
                            ? "text-parallel-100"
                            : "text-parallel-200"
                    )}
                ></path>
                <path
                    d="M6.58252 1.86686C6.97237 0.796817 8.17487 0.238601 9.26887 0.619918L9.32596 0.640716C10.3826 1.04247 10.9267 2.19619 10.5437 3.24747L4.6839 19.3312C4.29405 20.4012 3.09154 20.9594 1.99755 20.5781L1.94046 20.5573C0.883828 20.1556 0.339688 19.0019 0.722699 17.9506L6.58252 1.86686Z"
                    fill="currentColor"
                    className={classNames(
                        "transition duration-200 transform -translate-x-1 translate-y-2 opacity-0 group-hover:duration-300 group-hover:translate-x-0 group-hover:translate-y-0 group-hover:opacity-100",
                        mode === "light"
                            ? "text-parallel-100"
                            : "text-parallel-200"
                    )}
                ></path>
            </>
        )}
    </svg>
)

export default ParallelLogo
