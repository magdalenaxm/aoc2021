import run from "aocrunner";

const parseInput = (rawInput: string) => rawInput;

const part1 = (rawInput: string) => {
  const input = parseInput(rawInput)
    .split(",")
    .map((item) => parseInt(item));

  let minimalFuel = 0;

  input.forEach((actualPos, index) => {
    let fuelCount = 0;

    input.forEach((pos) => {
      fuelCount += Math.abs(actualPos - pos);
    });

    if (fuelCount < minimalFuel || index === 0) {
      minimalFuel = fuelCount;
    }
  });

  return minimalFuel;
};

const part2 = (rawInput: string) => {
  const input = parseInput(rawInput)
    .split(",")
    .map((item) => parseInt(item));

  let minimalFuel = 0;
  let biggestNumber = Math.max(...input);

  for (let i = 0; i <= biggestNumber; i++) {
    let fuelCount = 0;
    
    input.forEach((actualPos, index) => {
      fuelCount += (Math.abs(actualPos - i) * ( Math.abs(actualPos - i) + 1))/2
    })

    if (fuelCount < minimalFuel || i === 0) {
      minimalFuel = fuelCount;
    }
  };

  return minimalFuel;
};

run({
  part1: {
    tests: [{ input: `16,1,2,0,4,2,7,1,2,14`, expected: 37 }],
    solution: part1,
  },
  part2: {
    tests: [{ input: `16,1,2,0,4,2,7,1,2,14`, expected: 168 }],
    solution: part2,
  },
  trimTestInputs: true,
});
