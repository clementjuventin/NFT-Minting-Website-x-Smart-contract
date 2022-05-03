import React from "react"
import "./Logo.css"

class Logo extends React.Component {
    render() {
        return (
            <div class="logoC">
                <a href="https://discord.com/">
                    <img src="/dis.png" height="40px"></img>
                </a>
                <a href="https://opensea.io/">
                    <img src="/ope.png" height="40px"></img>
                </a>
                <a href="https://twitter.com">
                    <img src="/twi.png" height="40px"></img>
                </a>
            </div>
        )
    }
}
export default Logo