import fs from "fs";

const numberValuesObj: Record<string, string> = {
  0: "zero",
  1: "one",
  2: "two",
  3: "three",
  4: "four",
  5: "five",
  6: "six",
  7: "seven",
  8: "eight",
  9: "nine",
};

function reverse(s: string): string {
  return s.split("").reverse().join("");
}

const findFirstNumberValue = (
  value: string,
  numberValues: Record<number, string>
) => {
  const numberIndexes: Record<number, number> = {};

  console.log({ value, numberValues });

  Object.entries(numberValues).forEach(
    ([numKey, numValue]: [string, string]) => {
      const bothValues = [
        value.indexOf(numValue),
        value.indexOf(numKey),
      ].filter((num) => num !== -1);

      if (bothValues.length)
        numberIndexes[parseInt(numKey)] = Math.min(...bothValues);
    }
  );

  const keysSorted = Object.entries(numberIndexes)
    .sort((a, b) => a[1] - b[1])
    .map(([key]) => key);

  console.log({ keysSorted });

  return keysSorted[0];
};

const findNumberValues = (value: string) => {
  const firstNumberValue = findFirstNumberValue(value, numberValuesObj);

  const numberValuesReversed = Object.entries(numberValuesObj).map(
    ([key, value]) => [key, reverse(value)]
  );

  const lastNumberValue = findFirstNumberValue(
    reverse(value),
    Object.fromEntries(numberValuesReversed)
  );

  return [firstNumberValue, lastNumberValue];
};

const day = async () => {
  const file: string[] = fs
    .readFileSync("./src/day1/input.txt", "utf-8")
    .split("\n");

  const values = file.map((value) => findNumberValues(value));

  const valuesCombined = values.map((value) => parseInt(value[0] + value[1]));

  const sumOfValues = valuesCombined.reduce((a, b) => a + b, 0);

  console.log({ sumOfValues });
};

day();
