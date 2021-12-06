import run from "aocrunner";

interface Coordinates {
  x: number;
  y: number;
}

interface Line {
  start: Coordinates;
  end: Coordinates;
}

const parseInput = (rawInput: string) => rawInput;

const preProcessInput = (input: string) => {
  const lines = input.split("\n");
  const withoutArrow = lines.map((line) => line.replace(" -> ", ","));

  const coordinatesObject = withoutArrow.map((element) => {
    const coordinates = element.split(",");
    return {
      start: {
        x: parseInt(coordinates[0]),
        y: parseInt(coordinates[1]),
      },
      end: {
        x: parseInt(coordinates[2]),
        y: parseInt(coordinates[3]),
      },
    };
  });

  return coordinatesObject;
};

const findBiggestXandY = (lines: Line[]) => {
  let x = 0;
  let y = 0;

  lines.forEach((line) => {
    if (Math.max(line.start.x, line.end.x) > x) {
      x = Math.max(line.start.x, line.end.x);
    }

    if (Math.max(line.start.y, line.end.y) > y) {
      y = Math.max(line.start.y, line.end.y);
    }
  });

  return { x: x + 1, y: y + 1 };
};

const printMap = (map: string[][]) => {
  map.forEach((row) => {
    console.log(row.join(" "));
  });
  console.log("\n\n");
};

const fillInLines = (coordinatesMap: string[][], lines: Line[]) => {
  lines.forEach((line) => {
    if (line.start.x === line.end.x || line.start.y === line.end.y) {
      const start =
        line.end.x < line.start.x || line.end.y < line.start.y
          ? line.end
          : line.start;
      const end =
        line.end.x < line.start.x || line.end.y < line.start.y
          ? line.start
          : line.end;

      for (let x = start.x; x <= end.x; x++) {
        for (let y = start.y; y <= end.y; y++) {
          const actualValue = coordinatesMap[y][x];

          if (actualValue === ".") {
            coordinatesMap[y][x] = String(1);
          } else {
            coordinatesMap[y][x] = String(parseInt(actualValue) + 1);
          }
        }
      }
    }
  });

  return coordinatesMap;
};

const countDangerousPoints = (map: string[][]) => {
  let count = 0;

  for (let y = 0; y < map.length; y++) {
    for (let x = 0; x < map[y].length; x++) {
      if (parseInt(map[y][x]) >= 2) {
        count++;
      }
    }
  }

  return count;
};

const part1 = (rawInput: string) => {
  const input = parseInput(rawInput);

  const lines = preProcessInput(input);
  const { x, y } = findBiggestXandY(lines);

  const map = Array(y)
    .fill(".")
    .map(() => Array(x).fill("."));

  const filledMap = fillInLines(map, lines);

  return countDangerousPoints(filledMap);
};

const fillDiagonals = (map: string[][], lines: Line[]) => {
  lines.forEach((line) => {
    for (let i = 0; i <= Math.abs(line.start.x - line.end.x); i++) {
      const x = line.start.x > line.end.x ? line.start.x - i : line.start.x + i;
      const y = line.start.y > line.end.y ? line.start.y - i : line.start.y + i;

      const actualValue = map[y][x];

      if (actualValue === ".") {
        map[y][x] = String(1);
      } else {
        map[y][x] = String(parseInt(actualValue) + 1);
      }
    }
  });

  return map;
};

const part2 = (rawInput: string) => {
  const input = parseInput(rawInput);

  const lines = preProcessInput(input);
  const { x, y } = findBiggestXandY(lines);

  const map = Array(y)
    .fill(".")
    .map(() => Array(x).fill("."));

  const diagonalLines = lines.filter(
    (line) => !(line.start.x === line.end.x || line.start.y === line.end.y),
  );

  const filledMap = fillInLines(map, lines);
  const withDiagonals = fillDiagonals(filledMap, diagonalLines);

  if (lines.length < 20) {
    printMap(withDiagonals);
  }

  return countDangerousPoints(withDiagonals);
};

run({
  part1: {
    tests: [
      {
        input: `0,9 -> 5,9
8,0 -> 0,8
9,4 -> 3,4
2,2 -> 2,1
7,0 -> 7,4
6,4 -> 2,0
0,9 -> 2,9
3,4 -> 1,4
0,0 -> 8,8
5,5 -> 8,2`,
        expected: 5,
      },
    ],
    solution: part1,
  },
  part2: {
    tests: [
      {
        input: `0,9 -> 5,9
8,0 -> 0,8
9,4 -> 3,4
2,2 -> 2,1
7,0 -> 7,4
6,4 -> 2,0
0,9 -> 2,9
3,4 -> 1,4
0,0 -> 8,8
5,5 -> 8,2`,
        expected: 12,
      },
    ],
    solution: part2,
  },
  trimTestInputs: true,
});
