import React from "react"
import "./Info.css"

class Info extends React.Component {
    render() {
        return (
            <div class="info">
                <div class="logo">
                    <b style={{}}>S<span>up</span>p<span>l</span>y: </b>
                    <b>1.000</b>
                    <br/>
                    <b><span>M</span>i<span>nt</span> d<span>a</span>te: </b>
                    <b><span>6t</span>h<span> May</span></b>
                    <br/>
                    <b>M<span>i</span>nt <span>pr</span>ice: </b>
                    <b>0.15<span> E</span>TH + <span>fee</span></b>
                    <br></br><br/>
                    <b id="timeLeft"></b>
                </div>
            </div>
        )
        /*
Supply:	9.999
Mint date:	6th May
Mint Price:	0.2 ETH + fee
        */
    }
}
export default Info