import fs from "fs";

interface Round {
  blue: number;
  red: number;
  green: number;
}

interface Game {
  number;
  rounds: Round[];
}

const gameRegex = /^Game (\d*): (.*)$/g;

const maxRedCubes = 12;
const maxGreenCubes = 13;
const maxBlueCubes = 14;

// Example game - Game 1: 3 blue, 4 red; 1 red, 2 green, 6 blue; 2 green

const parseRound = (value: string): Round => {
  const blueRegex = /(\d*) blue/g;
  const redRegex = /(\d*) red/g;
  const greenRegex = /(\d*) green/g;

  const blueMatches = blueRegex.exec(value);
  const redMatches = redRegex.exec(value);
  const greenMatches = greenRegex.exec(value);

  return {
    blue: blueMatches && blueMatches[1] ? parseInt(blueMatches[1]) : 0,
    red: redMatches && redMatches[1] ? parseInt(redMatches[1]) : 0,
    green: greenMatches && greenMatches[1] ? parseInt(greenMatches[1]) : 0,
  };
};

const parseGame = (value: string): Game => {
  gameRegex.lastIndex = 0;

  const matches = gameRegex.exec(value);

  const rounds = matches[2].split("; ").map((round) => parseRound(round));

  return { rounds, number: parseInt(matches[1]) };
};

const day = async () => {
  const file: string[] = fs
    .readFileSync("./src/day2/input.txt", "utf-8")
    .split("\n");

  const games: Game[] = file.map((value) => parseGame(value));

  const validGames = games.filter((game) => {
    const isValid = game.rounds.every((round) => {
      const redCubes = round.red;
      const greenCubes = round.green;
      const blueCubes = round.blue;

      return (
        redCubes <= maxRedCubes &&
        greenCubes <= maxGreenCubes &&
        blueCubes <= maxBlueCubes
      );
    });

    return isValid;
  });

  const validGameNumbers = validGames.map((game) => game.number);

  const sumOfValues = validGameNumbers.reduce((a, b) => a + b, 0);

  console.log({ sumOfValues });
};

day();
