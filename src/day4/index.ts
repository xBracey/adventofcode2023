import fs from "fs";

interface Card {
  winningNumbers: number[];
  yourNumbers: number[];
}

const cardRegex = /^Card\s*(\d*):\s*(.*) \| (.*)$/g;

const parseCard = (value: string): Card => {
  cardRegex.lastIndex = 0;

  const matches = cardRegex.exec(value);

  console.log({ matches, value });

  const winningNumbers = matches[2]
    .split(" ")
    .filter((character) => character !== "")
    .map((num) => parseInt(num));
  const yourNumbers = matches[3]
    .split(" ")
    .filter((character) => character !== "")
    .map((num) => parseInt(num));

  return { winningNumbers, yourNumbers };
};

const getWinningNumbers = (card: Card) => {
  const winningNumbers = card.winningNumbers.filter((num) =>
    card.yourNumbers.includes(num)
  );

  return winningNumbers;
};

const day = async () => {
  const file: string[] = fs
    .readFileSync("./src/day4/input.txt", "utf-8")
    .split("\n");

  const cards: Card[] = file.map((value) => parseCard(value));

  const winningNumbers = cards.map((card) => getWinningNumbers(card));

  console.log({ winningNumbers: winningNumbers[0], cards: cards[0] });

  const value = winningNumbers.map((winningNumber) =>
    winningNumber.length === 0 ? 0 : 2 ** (winningNumber.length - 1)
  );

  const sum = value.reduce((a, b) => a + b, 0);

  console.log({ sum, value: value[0] });
};

day();
