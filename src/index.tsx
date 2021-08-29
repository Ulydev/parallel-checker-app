import { Web3Provider } from "@ethersproject/providers"
import { Web3ReactProvider } from "@web3-react/core"
import React from "react"
import ReactDOM from "react-dom"
import "react-grid-layout/css/styles.css"
import ReactModal from "react-modal"
import "react-resizable/css/styles.css"

import App from "./App"
import "./index.css"
import * as serviceWorker from "./serviceWorker"

ReactModal.setAppElement("#root")

const getLibrary = (provider: any) => new Web3Provider(provider)

ReactDOM.render(
    /*<React.StrictMode>*/
    <Web3ReactProvider getLibrary={getLibrary}>
        <App />
    </Web3ReactProvider>,
    /*</React.StrictMode>*/ document.getElementById("root")
)

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister()
