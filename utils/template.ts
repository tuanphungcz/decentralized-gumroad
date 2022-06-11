import abi from "../artifacts/contracts/CryptoGummy.sol/CryptoGummy.json";

// Update const productPage to change the product page
export const productPage = {
  subtitle: "Checkout with Crypto",
  title: "Gumroad-like Product Page Template",
  creator: {
    text: "by",
    image: "/profile.png",
    twitterUrl: "https://twitter.com/tuanphungcz",
    username: "cryptodev",
  },
  descriptions: [
    "I made a simple tool which lets customer use crypto to submit a payment for the product you are selling (ebook, tutorial, video etc)",
    "It is really a tool like: Gumroad for crypto, where basically you have a simple product page which can be modifed and the flow the checkout flow is similar to gumroad",
    "Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Integer in sapien. Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Morbi scelerisque luctus velit. Fusce tellus.",
    "Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Integer in sapien. Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Morbi scelerisque luctus velit. Fusce tellus.",
    "Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Integer in sapien. Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Morbi scelerisque luctus velit. Fusce tellus.",
  ],
};
// Update const productItem to change the product detail box
export const productItem = {
  price: "For a donate",
  title: "Full package",
  items: [
    "✔ Frontend and Smart contract code",
    "✔ Guide on how to create your own product page",
  ],
};
// Update const downloadPage to change the download page
export const downloadPage = {
  subtitle: "Hidden page after checkout",
  title: " Your secret digital product page",
  download: {
    text: "Github repo",
    subtitle: "Full source code",
    url: "https://github.com/tuanphungcz/Decentralized-Gumroad",
  },
  descriptions: [
    "Thank you for your donation, click bellow on the link bellow to check the full source code",
    "Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Integer in sapien. Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Morbi scelerisque luctus velit. Fusce tellus.",
    "Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Integer in sapien. Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Morbi scelerisque luctus velit. Fusce tellus.",
    "Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Integer in sapien. Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Morbi scelerisque luctus velit. Fusce tellus.",
  ],
};

// Update the contractAddress to conenct to a different contract address
// Polygon testnet (Mumbai)
export const contractAddress = "0xBb0dbf906004cD483C5519C26EF6Ec34E95DE2fA";

export const { abi: contractABI } = abi;
