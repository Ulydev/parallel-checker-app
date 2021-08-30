import React, { FunctionComponent } from "react"

import PageHeader from "components/PageHeader"

const CardGeneratorPage: FunctionComponent<{}> = () => {
    return (
        <div className="flex flex-col w-full text-white">
            <PageHeader
                title="Card Generator"
                description="Create your own fan-made cards."
            />
        </div>
    )
}

export default CardGeneratorPage
