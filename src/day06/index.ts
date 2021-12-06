import run from "aocrunner";

const parseInput = (rawInput: string) => rawInput;


const insertInResgister = (input: number[]) => {
  const register = Array(9).fill(0);

  input.forEach((numberOfFish) => {
    register[numberOfFish] = register[numberOfFish] + 1;
  });

  return register;
};

const updateFishes = (fishRegister: number[]) => {
  const newFishes = fishRegister[0];

  for (let i = 0; i < fishRegister.length - 1; i++) {
    fishRegister[i] = fishRegister[i + 1];
  }

  fishRegister[6] = fishRegister[6] + newFishes;
  fishRegister[8] = newFishes;

  return fishRegister;
};

const part1 = (rawInput: string) => {
  const input = parseInput(rawInput)
    .split(",")
    .map((item) => parseInt(item));
  const numberOfDays = 80;

  let fishes = insertInResgister(input);

  for (let i = 0; i < numberOfDays; i++) {
    fishes = updateFishes(fishes);
  }

  let sum = 0;

  fishes.forEach((fish) => {
    sum += fish;
  });

  return sum;
};

const part2 = (rawInput: string) => {
  const input = parseInput(rawInput)
    .split(",")
    .map((item) => parseInt(item));

  const numberOfDays = 256;

  let fishes = insertInResgister(input);

  for (let i = 0; i < numberOfDays; i++) {
    fishes = updateFishes(fishes);
  }

  let sum = 0;

  fishes.forEach((fish) => {
    sum += fish;
  });

  return sum;

};

run({
  part1: {
    tests: [{ input: "3,4,3,1,2", expected: 5934 }],
    solution: part1,
  },
  part2: {
    tests: [{ input: "3,4,3,1,2", expected: 26984457539 }],
    solution: part2,
  },
  trimTestInputs: true,
});
