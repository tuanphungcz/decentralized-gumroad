[![Product Name Screen Shot][product-screenshot]](https://twitter.com/tuanphungcz)

## About The Project

CryptoGummy is a cryptogumroad clone build on Polygon network, as for now, user can deploy their own version of product page and sell digital products for MATIC tokens (polygon).

### Built With

This section should list any major libraries and tools used to build this project.

- [React.js](https://reactjs.org/)
- [Tailwind CSS](https://tailwindcss.com/)
- [Solidity](https://soliditylang.org/)
- [Ethers.js](https://docs.ethers.io/v5/)
- [Vercel](https://vercel.com)
- [Alchemy Node](https://www.alchemy.com/)

<!-- GETTING STARTED -->

## Getting Started

This is how you can start the project. The smart contracts was deployed to polygon testnet with the following contract address - [0xBb0dbf906004cD483C5519C26EF6Ec34E95DE2fA](https://mumbai.polygonscan.com/address/0xBb0dbf906004cD483C5519C26EF6Ec34E95DE2fA)

## Run locally with polygon testnet

1. Clone the repo

```sh
git clone https://github.com/tuanphungcz/cryptogummy-base-fe.git

```

2. Install the dependencies

```sh
yarn
```

3. Run the app

```sh
yarn start
```

## Run locally on local matic

1. Clone the repo

```sh
git clone https://github.com/tuanphungcz/cryptogummy-base-fe.git

```

2. Install the dependencies

```sh
yarn
```

3. Deploy the contract

```sh
npx hardhat run scripts/deploy.js --network mumbai
```

4. Update **utils/template** with the new deployed contract address.

5. Run the app

```sh
yarn start
```

<!-- LICENSE -->

## License

Distributed under the MIT License. See `LICENSE.txt` for more information.

<!-- CONTACT -->

## Contact

You can DM me on Twitter 👉 [@tuanphungcz](https://twitter.com/tuanphungcz)

[product-screenshot]: public/product-image-1.png
