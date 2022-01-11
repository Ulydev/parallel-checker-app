import React from "react"

import PageDivider from "./PageDivider"

const Footer = () => (
    <div className="w-full pb-8 mt-16 overflow-x-hidden bg-parallel-100">
        <PageDivider className="text-parallel-200" />
        <div className="flex flex-col items-center w-full max-w-4xl mx-auto">
            <div className="flex flex-col items-center px-4 text-center text-opacity-50 lg:px-0 font-inconsolata text-parallel-200">
                <span>© 2021 Parallel Inc. All Rights Reserved.</span>
            </div>
        </div>
    </div>
)

export default Footer
