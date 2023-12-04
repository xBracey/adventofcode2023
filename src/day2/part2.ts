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

const findGamePower = (game: Game) => {
  const roundRedCubes = game.rounds.map((round) => round.red);
  const roundGreenCubes = game.rounds.map((round) => round.green);
  const roundBlueCubes = game.rounds.map((round) => round.blue);

  const maxRedCubes = Math.max(...roundRedCubes);
  const maxGreenCubes = Math.max(...roundGreenCubes);
  const maxBlueCubes = Math.max(...roundBlueCubes);

  return maxRedCubes * maxGreenCubes * maxBlueCubes;
};

const day = async () => {
  const file: string[] = fs
    .readFileSync("./src/day2/input.txt", "utf-8")
    .split("\n");

  const games: Game[] = file.map((value) => parseGame(value));

  const gamePowers: number[] = games.map((game) => findGamePower(game));

  const sumOfGamePowers = gamePowers.reduce((a, b) => a + b, 0);

  console.log({ sumOfGamePowers });
};

day();
