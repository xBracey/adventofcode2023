import fs from "fs";

interface Entity {
  x: number;
  y: number;
  w: number;
  h: 1;
}

interface Symbol extends Entity {
  w: 1;
}

interface Value extends Entity {
  value: number;
}

const getSymbols = (puzzle: string[][]): Symbol[] => {
  const symbols: Symbol[] = [];

  puzzle.forEach((row, y) => {
    row.forEach((character, x) => {
      if (!character.match(/[0-9]/) && character !== ".") {
        symbols.push({ x, y, w: 1, h: 1 });
      }
    });
  });

  return symbols;
};

const getValue = (
  currentValue: string | null,
  character: string,
  restOfCharacters: string[]
): string | false => {
  if (!character) {
    return currentValue;
  }

  if (character.match(/[0-9]/)) {
    return getValue(
      currentValue ? currentValue + character : character,
      restOfCharacters[0],
      restOfCharacters.slice(1)
    );
  }

  if (currentValue) {
    return currentValue;
  }

  return false;
};

const getValues = (puzzle: string[][]): Value[] => {
  const values: Value[] = [];

  puzzle.forEach((row, y) => {
    for (let x = 0; x < row.length; x++) {
      const character = row[x];
      const restOfCharacters = row.slice(x + 1);
      const value = getValue(null, character, restOfCharacters);

      if (value) {
        values.push({ x, y, w: value.length, h: 1, value: parseInt(value) });
        x += value.length - 1;
      }
    }
  });

  return values;
};

// Diagonals are touching
const doesValueTouchSymbol = (value: Value, symbol: Symbol) => {
  const minAX = value.x;
  const maxAX = value.x + value.w;
  const minAY = value.y;
  const maxAY = value.y + value.h;

  const minBX = symbol.x;
  const maxBX = symbol.x + symbol.w;
  const minBY = symbol.y;
  const maxBY = symbol.y + symbol.h;

  const aLeftOfB = maxAX < minBX;
  const aRightOfB = minAX > maxBX;
  const aAboveB = minAY > maxBY;
  const aBelowB = maxAY < minBY;

  return !(aLeftOfB || aRightOfB || aAboveB || aBelowB);
};

const day = async () => {
  const file: string[] = fs
    .readFileSync("./src/day3/input.txt", "utf-8")
    .split("\n");

  const puzzle: string[][] = file.map((value) => value.split(""));

  const symbols = getSymbols(puzzle);
  const values = getValues(puzzle);

  const touchingValues = values.filter((value) => {
    return symbols.some((symbol) => doesValueTouchSymbol(value, symbol));
  });

  const sumOfTouchingValues = touchingValues.reduce((a, b) => a + b.value, 0);

  console.log({ sumOfTouchingValues });
};

day();
