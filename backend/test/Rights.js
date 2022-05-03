const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("Nft contract", function () {
    /*
    admin = addr1
    wl = addr2
    */
    it("Admin and white list", async function () {
        const [owner, addr1, addr2, addr3] = await ethers.getSigners();

        const contract = await ethers.getContractFactory("NeonApes");
        const nftContract = await contract.deploy("Neon Apes", "NEOA", Date.now() + 3600 * 1000 * 24);
        await nftContract.deployed();

        await nftContract.setAdmin(addr1.address);
        expect(await nftContract.admin()).to.equal(addr1.address); // addr1 is admin

        await nftContract.whitelistAddr(addr2.address, true);
        expect(await nftContract.isWhitelisted(addr2.address)).to.equal(true); // addr2 is WL

        expect(await nftContract.admin() == addr3.address).to.equal(false); // addr3 is not admin
        expect(await nftContract.isWhitelisted(addr3.address)).to.equal(false); // addr3 is not WL
    });
    it("Minting", async function () {
        const [owner, addr1, addr2, addr3] = await ethers.getSigners();
        const contract = await ethers.getContractFactory("NeonApes");
        const nftContract = await contract.deploy("Neon Apes", "NEOA", Date.now() + 3600 * 1000 * 24);
        await nftContract.deployed();

        let result = ""

        //Owner is WL
        await nftContract.whitelistAddr(owner.address, true);

        expect(await nftContract.saleIsActive()).to.equal(false); // Sale is paused
        expect(await nftContract.saleIsActiveForwhitelist()).to.equal(false); // WL Sale is paused

        try { await nftContract.mint(1, { value: ethers.utils.parseEther("0.15"), }); result = "ok" } catch (error) { result = error.message }
        expect(result.includes("Sale must be active")).to.equal(true); // Mint is paused

        try { await nftContract.whitelistedMint({ value: ethers.utils.parseEther("0.15"), }); result = "ok" } catch (error) { result = error.message }
        expect(result.includes("Sale must be active")).to.equal(true); // WL Mint is paused

        await nftContract.flipWhitelistSaleState();
        expect(await nftContract.saleIsActive()).to.equal(false); // Sale is paused
        expect(await nftContract.saleIsActiveForwhitelist()).to.equal(true); // WL Sale is active

        try { await nftContract.mint(1, { value: ethers.utils.parseEther("0.15"), }); result = "ok" } catch (error) { result = error.message }
        expect(result.includes("Sale must be active")).to.equal(true); // Mint is not allowed

        try { await nftContract.whitelistedMint({ value: ethers.utils.parseEther("0.15"), }); result = "ok" } catch (error) { result = error.message }
        expect(result.includes("ok")).to.equal(true); // WL owner can mint

        await nftContract.flipSaleState();
        expect(await nftContract.saleIsActive()).to.equal(true); // Mint ok
        expect(await nftContract.saleIsActiveForwhitelist()).to.equal(true); // WL Mint ok

        try { await nftContract.mint(1, { value: ethers.utils.parseEther("0.15"), }); result = "ok" } catch (error) { result = error.message }
        expect(result.includes("ok")).to.equal(true); // OK

        try { await nftContract.whitelistedMint({ value: ethers.utils.parseEther("0.15"), }); result = "ok" } catch (error) { result = error.message }
        expect(result.includes("Sender is not whitelisted")).to.equal(true); // WL mint is possible only once

        await nftContract.whitelistAddr(owner.address, true);

        try { await nftContract.mint(2, { value: ethers.utils.parseEther("0.15"), }); result = "ok" } catch (error) { result = error.message }
        expect(result.includes("Value sent is lower than mint price")).to.equal(true); // Mint value too low
        try { await nftContract.whitelistedMint({ value: ethers.utils.parseEther("0.1"), }); result = "ok" } catch (error) { result = error.message }
        expect(result.includes("Value sent is lower than mint price")).to.equal(true); // Mint value too low

        try { await nftContract.mint(4, { value: ethers.utils.parseEther("0.6"), }); result = "ok" } catch (error) { result = error.message }
        expect(result.includes("Max purchase is 3 tokens")).to.equal(true); // Max purchase

        try { await nftContract.specialMint(); result = "ok" } catch (error) { result = error.message }
        expect(result.includes("ok")).to.equal(true); // Special mint #1

        try { await nftContract.specialMint(); result = "ok" } catch (error) { result = error.message }
        expect(result.includes("Only one special mint is possible")).to.equal(true); // Special mint #2
    });
    it("Balance", async function () {
        const [owner, addr1, addr2, addr3] = await ethers.getSigners();
        const contract = await ethers.getContractFactory("NeonApes");
        const nftContract = await contract.deploy("Neon Apes", "NEOA", Date.now() + 3600 * 1000 * 24);
        await nftContract.deployed();

        await nftContract.flipSaleState();
        await nftContract.mint(3, { value: ethers.utils.parseEther("0.45"), });
        expect(await nftContract.provider.getBalance(nftContract.address)).to.equal("450000000000000000"); // 0.45 ETH on contract
        await nftContract.withdraw();
        expect(await nftContract.provider.getBalance(nftContract.address)).to.equal(0); // 0 on contract
    })
});
