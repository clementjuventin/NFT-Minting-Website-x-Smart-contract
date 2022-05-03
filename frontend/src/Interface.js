import React, { useEffect, useState } from "react";
import "./Interface.css"
import abi from "./utils/NeonApes.json";
import { ethers } from "ethers";

function Interface() {
    //, 'background-size':'contain',
    const [currentAccount, setCurrentAccount] = useState("");
    const contractAddress = "0x92Bf38Acc559b283AC5aCced82b1e8D7BaEa33f9";
    const contractABI = abi.abi;

    function getContract() {
        const { ethereum } = window;
        if (ethereum) {
            const provider = new ethers.providers.Web3Provider(ethereum);
            const signer = provider.getSigner();
            return new ethers.Contract(contractAddress, contractABI, signer);
        }
    }

    async function isMintPossible(contract) {
        const { ethereum } = window;
        const addr = await ethereum.request({ method: "eth_requestAccounts" })

        const saleIsActiveForWL = await contract.saleIsActiveForwhitelist.call();
        const saleIsActive = await contract.saleIsActive.call();
        const isWL = saleIsActiveForWL ? await contract.isWhitelisted(addr[0]) : false;
        return { saleIsActiveForWL : saleIsActiveForWL, saleIsActive : saleIsActive, isWL : isWL};
    }

    async function mint() {
        const contract = getContract()
        const res = await isMintPossible(contract)
        if(res.saleIsActive){
            const txn = await contract.mint(1, {
                value: ethers.utils.parseEther("0.15")
            });
            await txn.wait();
        }
        else if(res.saleIsActiveForWL && res.isWL){
            const txn = await contract.whitelistedMint({
                value: ethers.utils.parseEther("0.15")
            });
            await txn.wait();
        }
        else {
            document.getElementById("mintingButton").classList.add("otherNeon");
            document.getElementById("mintingButton").lastChild.innerHTML = "Unmintable now";
            setTimeout(function () {
                document.getElementById("mintingButton").classList.remove("otherNeon");
                document.getElementById("mintingButton").lastChild.innerHTML = "Mint";
            }, 2000);
        }
    }

    const connectWallet = async () => {
        const { ethereum } = window;
        if (!ethereum) {
            return;
        }
        const accounts = await ethereum.request({ method: "eth_requestAccounts" });
        setCurrentAccount(accounts[0]);
    }

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
                    <img src="/left.png" />
                </div>
                <div class="prev">
                    <img src="/right.png" />
                </div>
            </div>
            <div class="button">
                <div>
                    <a class="neon" href="#" style={{ display: "none" }}></a>
                    <a class="neon" href="#" style={{ display: "none" }}></a>

                    {!currentAccount && (
                        <a onClick={connectWallet} class="neon" href="#">
                            <span></span>
                            <span></span>
                            <span></span>
                            <span></span>
                            Connect wallet
                        </a>
                    )}
                    {currentAccount && (
                        <a id="mintingButton" class="neon" href="#" onClick={mint}>
                            <span></span>
                            <span></span>
                            <span></span>
                            <span></span>
                            <div>Mint</div>
                        </a>
                    )}
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
export default Interface