import run from "aocrunner";

const parseInput = (rawInput: string) => rawInput;

type Board = string[][];

function getBoards(boards: string[]): Board[] {
  const parsedBoards: Board[] = [];

  boards.forEach((board) => {
    const horizontalLines = board.split("\n");
    const parsedLines: Board = [];

    horizontalLines.forEach((line) => {
      const newLine = line.replaceAll("  ", " ").split(" ");

      parsedLines.push(newLine.filter((element) => element !== ""));
    });

    parsedBoards.push(parsedLines);
  });

  return parsedBoards;
}

function markNumber(board: Board, givenNumber: number) {
  for (let row = 0; row < board.length; row++) {
    for (let column = 0; column < board[row].length; column++) {
      if (parseInt(board[row][column]) === givenNumber) {
        board[row][column] = "*";
      }
    }
  }

  return board;
}

function fiveStars(board: Board): boolean {
  const rowWithFiveStars = board.find((line) => {
    let starCount = 0;

    line.forEach((element) => {
      if (element === "*") {
        starCount += 1;
      }
    });

    return starCount == 5;
  });

  if (rowWithFiveStars !== undefined) return true;

  for (let column = 0; column < board[0].length; column++) {
    let starCount = 0;
    for (let row = 0; row < board.length; row++) {
      if (board[row][column] === "*") {
        starCount += 1;
      }
    }

    if (starCount === 5) return true;
  }

  return false;
}

function calculateScore(board: Board, factor: number) {
  let sum = 0;

  for (let row = 0; row < board.length; row++) {
    for (let column = 0; column < board[row].length; column++) {
      if (board[row][column] !== "*") {
        sum += parseInt(board[row][column]);
      }
    }
  }

  return sum * factor;
}

const part1 = (rawInput: string) => {
  const input = parseInput(rawInput).split("\n\n");

  const chosenNumbers = input
    .shift()
    ?.split(",")
    .map((element) => parseInt(element));
  const boards = getBoards(input);

  let score = -1;

  chosenNumbers?.forEach((chosenNumber, index) => {
    if (score === -1) {
      boards.forEach((board) => {
        if (score === -1) {
          const markedBoard = markNumber(board, chosenNumber);

          if (fiveStars(markedBoard)) {
            score = calculateScore(markedBoard, chosenNumber);
          }
        }
      });
    }
  });

  return score;
};

const part2 = (rawInput: string) => {
  const input = parseInput(rawInput).split("\n\n");
  const chosenNumbers = input
    .shift()
    ?.split(",")
    .map((element) => parseInt(element));

  const boards = getBoards(input);
  let winnerBoardsCount = 0;
  const winnerBoards: number[] = [];

  let score = -1;

  chosenNumbers?.forEach((chosenNumber) => {
    boards.forEach((board, index) => {
      if (winnerBoards.includes(index)) {
        return;
      }

      const markedBoard = markNumber(board, chosenNumber);

      if (fiveStars(markedBoard)) {
        winnerBoardsCount += 1;
        winnerBoards.push(index)
      }

      if(winnerBoardsCount === boards.length){
         score = calculateScore(markedBoard, chosenNumber);
      }
    });
  });

  return score;

  return;
};

run({
  part1: {
    tests: [
      {
        input: `7,4,9,5,11,17,23,2,0,14,21,24,10,16,13,6,15,25,12,22,18,20,8,19,3,26,1

22 13 17 11  0
 8  2 23  4 24
21  9 14 16  7
 6 10  3 18  5
 1 12 20 15 19

 3 15  0  2 22
 9 18 13 17  5
19  8  7 25 23
20 11 10 24  4
14 21 16 12  6

14 21 17 24  4
10 16 15  9 19
18  8 23 26 20
22 11 13  6  5
 2  0 12  3  7`,
        expected: 4512,
      },
    ],
    solution: part1,
  },
  part2: {
    tests: [
      {
        input: `7,4,9,5,11,17,23,2,0,14,21,24,10,16,13,6,15,25,12,22,18,20,8,19,3,26,1

22 13 17 11  0
 8  2 23  4 24
21  9 14 16  7
 6 10  3 18  5
 1 12 20 15 19

 3 15  0  2 22
 9 18 13 17  5
19  8  7 25 23
20 11 10 24  4
14 21 16 12  6

14 21 17 24  4
10 16 15  9 19
18  8 23 26 20
22 11 13  6  5
 2  0 12  3  7`,
        expected: 1924,
      },
    ],
    solution: part2,
  },
  trimTestInputs: true,
});
