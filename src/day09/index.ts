import run from "aocrunner";

const parseInput = (rawInput: string) =>
  rawInput.split("\n").map((row) => {
    const numbers = row.split("");
    return numbers.map((number) => parseInt(number));
  });

const part1 = (rawInput: string) => {
  const input = parseInput(rawInput);
  const lowPoints: number[] = [];

  for (let row = 0; row < input.length; row++) {
    for (let column = 0; column < input[0].length; column++) {
      if (input[row][column] === 9) continue;

      const actualValue = input[row][column];

      const topValue = row !== 0 ? input[row - 1][column] : null;
      const leftValue = column !== 0 ? input[row][column - 1] : null;
      const rightValue =
        column + 1 !== input[row].length ? input[row][column + 1] : null;
      const bottomValue =
        row + 1 !== input.length ? input[row + 1][column] : null;

      let higherAdjacent = true;

      if (topValue !== null && topValue < actualValue) {
        higherAdjacent = false;
      }
      if (leftValue !== null && leftValue < actualValue) {
        higherAdjacent = false;
      }
      if (rightValue !== null && rightValue < actualValue) {
        higherAdjacent = false;
      }
      if (bottomValue !== null && bottomValue < actualValue) {
        higherAdjacent = false;
      }

      if (higherAdjacent) {
        lowPoints.push(actualValue);
      }
    }
  }

  let sum = 0;

  lowPoints.forEach((point) => {
    sum += point + 1;
  });

  return sum;
};

const findLowPoints = (input: number[][]) => {
  const lowPoints = [];
  for (let row = 0; row < input.length; row++) {
    for (let column = 0; column < input[0].length; column++) {
      if (input[row][column] === 9) continue;

      const actualValue = input[row][column];

      const topValue = row !== 0 ? input[row - 1][column] : null;
      const leftValue = column !== 0 ? input[row][column - 1] : null;
      const rightValue =
        column + 1 !== input[row].length ? input[row][column + 1] : null;
      const bottomValue =
        row + 1 !== input.length ? input[row + 1][column] : null;

      let higherAdjacent = true;

      if (topValue !== null && topValue < actualValue) {
        higherAdjacent = false;
      }
      if (leftValue !== null && leftValue < actualValue) {
        higherAdjacent = false;
      }
      if (rightValue !== null && rightValue < actualValue) {
        higherAdjacent = false;
      }
      if (bottomValue !== null && bottomValue < actualValue) {
        higherAdjacent = false;
      }

      if (higherAdjacent) {
        lowPoints.push({ value: actualValue, row, column });
      }
    }
  }

  return lowPoints;
};

interface Item {
  row: number;
  column: number;
  element: number;
}

const findBasins = (
  row: number,
  column: number,
  input: number[][],
  foundItems: Item[],
) => {
  const actualValue = input[row][column];

  if (actualValue === 9) {
    return foundItems;
  }

  const topValue = row !== 0 ? input[row - 1][column] : null;
  const leftValue = column !== 0 ? input[row][column - 1] : null;
  const rightValue =
    column + 1 !== input[row].length ? input[row][column + 1] : null;
  const bottomValue = row + 1 !== input.length ? input[row + 1][column] : null;

  const endOfBasin =  topValue !== null &&
    topValue !== actualValue + 1 &&
    topValue !== null &&
    topValue !== actualValue + 1 &&
    rightValue !== null &&
    rightValue !== actualValue + 1 &&
    bottomValue !== null &&
    bottomValue !== actualValue + 1

  if (
   endOfBasin
  ) {
    return [...foundItems, { element: actualValue, row, column }];
  }

  let topItems: Item[] = [];
  let leftItems: Item[] = [];
  let rightItems: Item[] = [];
  let bottomItems: Item[] = [];

  if (topValue !== null && topValue === actualValue + 1) {
    topItems = findBasins(row - 1, column, input, foundItems);
  }

  if (leftValue !== null && leftValue === actualValue + 1) {
    leftItems = findBasins(row, column - 1, input, foundItems);
  }

  if (rightValue !== null && rightValue === actualValue + 1) {
    rightItems = findBasins(row, column + 1, input, foundItems);
  }

  if (bottomValue !== null && bottomValue === actualValue + 1) {
    bottomItems = findBasins(row + 1, column, input, foundItems);
  }

  return [
    ...topItems,
    ...leftItems,
    ...rightItems,
    ...bottomItems,
    { element: actualValue, row, column },
  ];
};


const part2 = (rawInput: string) => {
  const input = parseInput(rawInput);

  const fullBasins: Item[][] = [];
  const basins: number[] = [];

  const lowPoints = findLowPoints(input);

  lowPoints.forEach((lowPoint) => {
    const basin = findBasins(lowPoint.row, lowPoint.column, input, []);
    const finalBasin = basin.filter(
      (item, index, self) =>
        index ===
        self.findIndex((t) => t.column === item.column && t.row === item.row),
    );

    basins.push(finalBasin.length);
    fullBasins.push(finalBasin);
  });

  const sortedBasins = basins.sort((a: number, b: number) => b - a);
console.log(sortedBasins[1])
  console.log(fullBasins.find(basin => basin.length === 88))

  return sortedBasins[0] * sortedBasins[1] * sortedBasins[2];
};

run({
  part1: {
    tests: [
      {
        input: `2199943210
3987894921
9856789892
8767896789
9899965678`,
        expected: 15,
      },
    ],
    solution: part1,
  },
  part2: {
    tests: [
      {
        input: `2199943210
3987894921
9856789892
8767896789
9899965678`,
        expected: 1134,
      },
    ],
    solution: part2,
  },
  trimTestInputs: true,
});
