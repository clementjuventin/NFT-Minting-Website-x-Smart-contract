const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("Nft contract", function () {
    describe("Whitelist and admin tests", function () {
        it("Admin should be the addr1", async function () {
            const [owner, addr1, addr2, addr3] = await ethers.getSigners();

            const contract = await ethers.getContractFactory("NeonApes");
            const nftContract = await contract.deploy("Neon Apes", "NEOA", Date.now() + 3600 * 1000 * 24);
            await nftContract.deployed();
            await nftContract.setAdmin(addr1.address);
            expect(await nftContract.admin()).to.equal(addr1.address);
        });
        it("owner whitelist addr2", async function () {
            const [owner, addr1, addr2, addr3] = await ethers.getSigners();

            const contract = await ethers.getContractFactory("NeonApes");
            const nftContract = await contract.deploy("Neon Apes", "NEOA", Date.now() + 3600 * 1000 * 24);
            await nftContract.deployed();
            await nftContract.whitelistAddr(addr2.address, true);
            expect(await nftContract.isWhitelisted(addr2.address)).to.equal(true);
        });
        it("addr3 not whitelist", async function () {
            const [owner, addr1, addr2, addr3] = await ethers.getSigners();

            const contract = await ethers.getContractFactory("NeonApes");
            const nftContract = await contract.deploy("Neon Apes", "NEOA", Date.now() + 3600 * 1000 * 24);
            await nftContract.deployed();
            expect(await nftContract.isWhitelisted(addr3.address)).to.equal(false);
        });
    });
    describe("Minting tests", function () {
        it("Mint should not be possible", async function () {
            const [owner, addr1, addr2, addr3] = await ethers.getSigners();

            const contract = await ethers.getContractFactory("NeonApes");
            const nftContract = await contract.deploy("Neon Apes", "NEOA", Date.now() + 3600 * 1000 * 24);
            await nftContract.deployed();
            let success = "";
            try {
                await nftContract.mint(2, {
                    value: ethers.utils.parseEther("0.3"),
                });
            } catch (error) { success = error.message }
            expect(success.includes("Sale must be active")).to.equal(true);
        });
        it("Mint after sale is available", async function () {
            const [owner, addr1, addr2, addr3] = await ethers.getSigners();

            const contract = await ethers.getContractFactory("NeonApes");
            const nftContract = await contract.deploy("Neon Apes", "NEOA", Date.now() + 3600 * 1000 * 24);
            await nftContract.deployed();
            await nftContract.flipSaleState();
            let success = "";
            try {
                await nftContract.mint(2, {
                    value: ethers.utils.parseEther("0.3"),
                });
                success = "Minted";
            } catch (error) { success = error.message }
            expect(success.includes("Minted")).to.equal(true);
        });
        it("Not enought ether send", async function () {
            const [owner, addr1, addr2, addr3] = await ethers.getSigners();

            const contract = await ethers.getContractFactory("NeonApes");
            const nftContract = await contract.deploy("Neon Apes", "NEOA", Date.now() + 3600 * 1000 * 24);
            await nftContract.deployed();
            await nftContract.flipSaleState();
            let success = "";
            try {
                await nftContract.mint(3, {
                    value: ethers.utils.parseEther("0.3"),
                });
                success = "Minted";
            } catch (error) { success = error.message }
            expect(success.includes("Value sent is lower than mint price")).to.equal(true);
        });
        it("Max purchase count exceed", async function () {
            const [owner, addr1, addr2, addr3] = await ethers.getSigners();

            const contract = await ethers.getContractFactory("NeonApes");
            const nftContract = await contract.deploy("Neon Apes", "NEOA", Date.now() + 3600 * 1000 * 24);
            await nftContract.deployed();
            await nftContract.flipSaleState();
            let success = "";
            try {
                await nftContract.mint(4, {
                    value: ethers.utils.parseEther("0.3"),
                });
                success = "Minted";
            } catch (error) { success = error.message }
            expect(success.includes("Max purchase is 3 tokens")).to.equal(true);
        });
        it("WL Mint should not be possible", async function () {
            const [owner, addr1, addr2, addr3] = await ethers.getSigners();

            const contract = await ethers.getContractFactory("NeonApes");
            const nftContract = await contract.deploy("Neon Apes", "NEOA", Date.now() + 3600 * 1000 * 24);
            await nftContract.deployed();
            let success = "";
            try {
                await nftContract.whitelistedMint({
                    value: ethers.utils.parseEther("0.15"),
                });
            } catch (error) { success = error.message }
            expect(success.includes("Sale must be active")).to.equal(true);
        });
        it("WL Mint after sale is available", async function () {
            const [owner, addr1, addr2, addr3] = await ethers.getSigners();

            const contract = await ethers.getContractFactory("NeonApes");
            const nftContract = await contract.deploy("Neon Apes", "NEOA", Date.now() + 3600 * 1000 * 24);
            await nftContract.deployed();
            await nftContract.whitelistAddr(owner.address, true);
            await nftContract.flipWhitelistSaleState();
            let success = "";
            try {
                await nftContract.whitelistedMint({
                    value: ethers.utils.parseEther("0.15"),
                });
                success = "Minted";
            } catch (error) { success = error.message }
            expect(success.includes("Minted")).to.equal(true);
        });
        it("WL Not enought ether send", async function () {
            const [owner, addr1, addr2, addr3] = await ethers.getSigners();

            const contract = await ethers.getContractFactory("NeonApes");
            const nftContract = await contract.deploy("Neon Apes", "NEOA", Date.now() + 3600 * 1000 * 24);
            await nftContract.deployed();
            await nftContract.flipWhitelistSaleState();
            let success = "";
            try {
                await nftContract.whitelistedMint({
                    value: ethers.utils.parseEther("0.10"),
                });
                success = "Minted";
            } catch (error) { success = error.message }
            expect(success.includes("Value sent is lower than mint price")).to.equal(true);
        });
        it("Special mint", async function () {
            const [owner, addr1, addr2, addr3] = await ethers.getSigners();

            const contract = await ethers.getContractFactory("NeonApes");
            const nftContract = await contract.deploy("Neon Apes", "NEOA", Date.now() + 3600 * 1000 * 24);
            await nftContract.deployed();
            let success = "";
            try {
                await nftContract. specialMint();
                success = "Minted";
            } catch (error) { success = error.message }
            expect(success.includes("Minted")).to.equal(true);
        });
        it("Special mint twice", async function () {
            const [owner, addr1, addr2, addr3] = await ethers.getSigners();

            const contract = await ethers.getContractFactory("NeonApes");
            const nftContract = await contract.deploy("Neon Apes", "NEOA", Date.now() + 3600 * 1000 * 24);
            await nftContract.deployed();
            let success = "";
            try {
                await nftContract. specialMint();
                await nftContract. specialMint();
                success = "Minted";
            } catch (error) { success = error.message }
            expect(success.includes("Only one special mint is possible")).to.equal(true);
        });
    });
    describe("Balance tests", function () {
        it("receive", async function () {
            const [owner, addr1, addr2, addr3] = await ethers.getSigners();
            const contract = await ethers.getContractFactory("NeonApes");
            const nftContract = await contract.deploy("Neon Apes", "NEOA", Date.now() + 3600 * 1000 * 24);
            await nftContract.deployed();
            await nftContract.flipSaleState();
            await nftContract.mint(3, {
                value: ethers.utils.parseEther("0.45"),
            });
            expect(await nftContract.provider.getBalance(nftContract.address)).to.equal("450000000000000000");
        });
        it("withdraw", async function () {
            const [owner, addr1, addr2, addr3] = await ethers.getSigners();
            const contract = await ethers.getContractFactory("NeonApes");
            const nftContract = await contract.deploy("Neon Apes", "NEOA", Date.now() + 3600 * 1000 * 24);
            await nftContract.deployed();
            await nftContract.flipSaleState();
            await nftContract.mint(3, {
                value: ethers.utils.parseEther("0.45"),
            });
            await nftContract.withdraw();
            expect(await nftContract.provider.getBalance(nftContract.address)).to.equal(0);
        });
    })
});
