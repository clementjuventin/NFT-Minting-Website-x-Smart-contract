require('@nomiclabs/hardhat-waffle');
require('dotenv').config();

module.exports = {
  solidity: '0.8.1',
  networks: {
    rinkeby: {
      url: 'https://eth-rinkeby.alchemyapi.io/v2/4y0tsUpJn7S_YyB2cVZY2ArVLAgvJc5a',
      accounts: [process.env.PK],
    },
  },
};