import run from "aocrunner";

const parseInput = (rawInput: string) => rawInput;

const part1 = (rawInput: string) => {
  const input = parseInput(rawInput);
  const measurements = input
    .split("\n")
    .map((measurement) => parseInt(measurement));

  let counter = 0;
  let previousMeasurement = 0;

  measurements.forEach((measurement, index) => {
    if (index === 0) {
      previousMeasurement = measurement;
      return;
    }

    if (measurement > previousMeasurement) {
      counter += 1;
    }

    previousMeasurement = measurement;
  });

  return counter;
};

const part2 = (rawInput: string) => {
  const input = parseInput(rawInput);
  const measurements = input
    .split("\n")
    .map((measurement) => parseInt(measurement));
  let counter = 0;

  const sum = (a: number, b: number, c: number) => a + b + c;

  for (let i = 2; i < measurements.length; i++) {
    const sumFirstWindow = sum(
      measurements[i],
      measurements[i - 1],
      measurements[i - 2],
    );

    const sumSecondWindow = sum(
      measurements[i + 1],
      measurements[i],
      measurements[i - 1],
    );

    if (sumSecondWindow > sumFirstWindow) {
      counter += 1;
    }
  }

  return counter;
};

run({
  part1: {
    tests: [
      {
        input: `199
                200
                208
                210
                200
                207
                240
                269
                260
                263
`,
        expected: 7,
      },
    ],
    solution: part1,
  },
  part2: {
    tests: [
      {
        input: `199     
                200   
                208 
                210
                200
                207
                240 
                269
                260
                263
                `,
        expected: 5,
      },
    ],
    solution: part2,
  },
  trimTestInputs: true,
});
