import run from "aocrunner";

const parseInput = (rawInput: string) =>
  rawInput
    .split("\n")
    .map((line) => line.split("").map((number) => parseInt(number)));

const getAdjacent = (
  row: number,
  column: number,
  width: number,
  height: number,
) => {
  const neighbours = [];

  neighbours.push(row > 0 ? { row: row - 1, column } : null);
  neighbours.push(
    row > 0 && column < width - 1 ? { row: row - 1, column: column + 1 } : null,
  );
  neighbours.push(column < width - 1 ? { row, column: column + 1 } : null);
  neighbours.push(
    row < height - 1 && column < width - 1
      ? { row: row + 1, column: column + 1 }
      : null,
  );
  neighbours.push(row < height - 1 ? { row: row + 1, column } : null);
  neighbours.push(
    row < height - 1 && column > 0
      ? { row: row + 1, column: column - 1 }
      : null,
  );
  neighbours.push(column > 0 ? { row, column: column - 1 } : null);
  neighbours.push(
    row > 0 && column > 0 ? { row: row - 1, column: column - 1 } : null,
  );

  return neighbours;
};

const increment = (input: number[][]) => {
  for (let row = 0; row < input.length; row++) {
    for (let column = 0; column < input[0].length; column++) {
      input[row][column] = input[row][column] + 1;
    }
  }

  return input;
};

const checkIfFlash = (
  input: number[][],
  row: number,
  column: number,
  flashed: Array<{ row: number; column: number }>,
) => {
  if (input[row][column] <= 9) return false;

  if (!flashed.find((item) => item.column === column && item.row === row)) {
    flashed.push({ row, column });

    const adjacents = getAdjacent(row, column, input[0].length, input.length);

    adjacents.forEach((adjacent) => {
      if (adjacent) {
        input[adjacent.row][adjacent.column] += 1;
      }
    });

    return true;
  }

  return false;
};

const part1 = (rawInput: string) => {
  const input = parseInput(rawInput);
  const steps = 100;
  const totalFlashed = [];

  for (let step = 0; step < steps; step++) {
    const flashed: Array<{ row: number; column: number }> = [];
    const incrementedInput = increment(input);

    while (true) {
      let hasFlashed = false;

      for (let row = 0; row < input.length; row++) {
        for (let column = 0; column < input[0].length; column++) {
          const flashedResult = checkIfFlash(
            incrementedInput,
            row,
            column,
            flashed,
          );
          hasFlashed = hasFlashed ? hasFlashed : flashedResult;
        }
      }

      if (!hasFlashed) break;
    }

    flashed.forEach((flash) => {
      input[flash.row][flash.column] = 0;
    });

    totalFlashed.push(flashed.length);
  }


  return  totalFlashed.reduce((a, b) => a + b, 0);
};

const part2 = (rawInput: string) => {
  const input = parseInput(rawInput);
  const steps = 1000;

  for (let step = 0; step < steps; step++) {
    const flashed: Array<{ row: number; column: number }> = [];
    const incrementedInput = increment(input);

    while (true) {
      let hasFlashed = false;

      for (let row = 0; row < input.length; row++) {
        for (let column = 0; column < input[0].length; column++) {
          const flashedResult = checkIfFlash(
            incrementedInput,
            row,
            column,
            flashed,
          );
          hasFlashed = hasFlashed ? hasFlashed : flashedResult;
        }
      }

      if (!hasFlashed) break;
    }

    flashed.forEach((flash) => {
      input[flash.row][flash.column] = 0;
    });

    if(flashed.length === 100){
      return step + 1
    }
  }

};

run({
  part1: {
    tests: [
      {
        input: `5483143223
2745854711
5264556173
6141336146
6357385478
4167524645
2176841721
6882881134
4846848554
5283751526`,
        expected: 1656,
      },
    ],
    solution: part1,
  },
  part2: {
    tests: [
      { input: `5483143223
2745854711
5264556173
6141336146
6357385478
4167524645
2176841721
6882881134
4846848554
5283751526`, expected: 195 },
    ],
    solution: part2,
  },
  trimTestInputs: true,
});
