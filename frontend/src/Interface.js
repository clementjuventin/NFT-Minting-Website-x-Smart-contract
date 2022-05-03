import React from "react"
import "./Interface.css"

class Interface extends React.Component {
    render() {
        //, 'background-size':'contain',
        return (
            <div>
                <div class="imageC">
                    <div class="container">
                        <div class="carousel">

                            <div style={{
                                'backgroundImage': `url(${process.env.PUBLIC_URL + "/1.png"})`
                            }} class="item a">
                            </div>
                            <div style={{
                                'backgroundImage': `url(${process.env.PUBLIC_URL + "/2.png"})`
                            }} class="item b"></div>
                            <div style={{
                                'backgroundImage': `url(${process.env.PUBLIC_URL + "/3.png"})`
                            }} class="item c"></div>
                            <div style={{
                                'backgroundImage': `url(${process.env.PUBLIC_URL + "/4.png"})`
                            }} class="item d"></div>
                            <div style={{
                                'backgroundImage': `url(${process.env.PUBLIC_URL + "/5.png"})`
                            }} class="item e"></div>
                            <div style={{
                                'backgroundImage': `url(${process.env.PUBLIC_URL + "/6.png"})`
                            }} class="item f"></div>
                        </div>
                    </div>
                    <div class="next">
                        <img src="/left.png"/>
                    </div>
                    <div class="prev">
                        <img src="/right.png"/>
                    </div>
                </div>
                <div class="button">
                    <div>
                        <a class="neon" href="#" style={{ display: "none" }}>
                            <span></span>
                            <span></span>
                            <span></span>
                            <span></span>
                            Mint
                        </a>
                        <a class="neon" href="#" style={{ display: "none" }}>
                            <span></span>
                            <span></span>
                            <span></span>
                            <span></span>
                            Connect wallet
                        </a>
                        <a class="neon" href="#">
                            <span></span>
                            <span></span>
                            <span></span>
                            <span></span>
                            Mint
                        </a>
                    </div>
                </div>
                <div id="center">
                    <div id="main"></div>
                    <div class="row" id="r-one">
                        <span class="sq" id="sq-1"></span>
                        <span class="sq" id="sq-2"></span>
                        <span class="sq" id="sq-3"></span>
                    </div>
                    <div class="row" id="r-two">
                        <span class="sq" id="sq-4"></span>
                        <span class="sq" id="sq-5"></span>
                        <span class="sq" id="sq-6"></span>
                    </div>
                    <div class="row" id="r-three">
                        <span class="sq" id="sq-7"></span>
                        <span class="sq" id="sq-8"></span>
                        <span class="sq" id="sq-9"></span>
                    </div>
                    <div class="row" id="r-four">
                        <span class="sq" id="sq-10"></span>
                        <span class="sq" id="sq-11"></span>
                        <span class="sq" id="sq-12"></span>
                    </div>
                </div>
            </div >
        )
    }
}
export default Interface