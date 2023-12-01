import fs from "fs";

const isCharacterNumber = (character: string) => {
  const numbers = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9"];

  return numbers.includes(character);
};

const findNumberValues = (value: string) => {
  const characters = value.split("");

  const filtered = characters.filter((character) =>
    isCharacterNumber(character)
  );

  return [filtered[0], filtered[filtered.length - 1]];
};

const day = async () => {
  const file: string[] = fs
    .readFileSync("./src/day1/input.txt", "utf-8")
    .split("\n");

  const values = file.map((value) => findNumberValues(value));

  const valuesCombined = values.map((value) => parseInt(value[0] + value[1]));

  const sumOfValues = valuesCombined.reduce((a, b) => a + b, 0);

  console.log({ values, valuesCombined, sumOfValues });
};

day();
