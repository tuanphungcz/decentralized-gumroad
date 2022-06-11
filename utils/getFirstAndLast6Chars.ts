const getFirstAndLast6Chars = (str: string) =>
  `${str.slice(0, 10)}...${str.substr(-6)}`;

export default getFirstAndLast6Chars;
