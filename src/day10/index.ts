import run from "aocrunner";

const parseInput = (rawInput: string) =>
  rawInput.split("\n").map((line) => line.split(""));

const checkIfOpening = (bracket: string) =>
  bracket === "(" || bracket === "{" || bracket === "<" || bracket === "[";

const checkIfRightBracket = (delimiter: string, bracket: string) => {
  if (bracket === "(" && delimiter === ")") return true;
  if (bracket === "{" && delimiter === "}") return true;
  if (bracket === "<" && delimiter === ">") return true;
  if (bracket === "[" && delimiter === "]") return true;

  return false;
};

const findClosingBracket = (bracket: string): string => {
  if (bracket === "(") return ")";
  if (bracket === "{") return "}";
  if (bracket === "<") return ">";
  if (bracket === "[") return "]";

  return "";
};

const part1 = (rawInput: string) => {
  const lines = parseInput(rawInput);
  const stack: string[] = [];
  const scores: { [key: string]: number } = {
    ")": 3,
    "]": 57,
    "}": 1197,
    ">": 25137,
  };

  const corruptChars: string[] = [];

  lines.forEach((line) => {
    line.forEach((delimiter) => {
      if (checkIfOpening(delimiter)) {
        stack.push(delimiter);
        return;
      }

      const openingBracket = stack.pop();

      if (!openingBracket) {
        return;
      }

      if (!checkIfRightBracket(delimiter, openingBracket)) {
        corruptChars.push(delimiter);
      }
    });
  });

  let sum = 0;

  corruptChars.forEach((char) => {
    sum += scores[char];
  });

  return sum;
};

const part2 = (rawInput: string) => {
  const lines = parseInput(rawInput);
  const scores: { [key: string]: number } = {
    ")": 1,
    "]": 2,
    "}": 3,
    ">": 4,
  };
  const scoresMissingChars: number[] = [];

  lines.forEach((line) => {
    const stack: string[] = [];
    let corruptLine = false;

    line.forEach((delimiter) => {
      if (checkIfOpening(delimiter)) {
        stack.push(delimiter);
        return;
      }

      const openingBracket = stack.pop();

      if (openingBracket && !checkIfRightBracket(delimiter, openingBracket)) {
        corruptLine = true;
      }
    });

    if (!corruptLine) {
      const missingChars: string[] = [];
      const remainingChars = stack.reverse();

      remainingChars.forEach((char) => {
        missingChars.push(findClosingBracket(char));
      });

      let score = 0;

      missingChars.forEach((char) => {
        score = score * 5 + scores[char];
      });

      scoresMissingChars.push(score);
    }
  });

  const sortedMissingChars = scoresMissingChars.sort(
    (a: number, b: number) => a - b,
  );

  return sortedMissingChars[Math.round((sortedMissingChars.length - 1) / 2)];
};

run({
  part1: {
    tests: [
      {
        input: `[({(<(())[]>[[{[]{<()<>>
[(()[<>])]({[<{<<[]>>(
{([(<{}[<>[]}>{[]{[(<()>
(((({<>}<{<{<>}{[]{[]{}
[[<[([]))<([[{}[[()]]]
[{[{({}]{}}([{[{{{}}([]
{<[[]]>}<{[{[{[]{()[[[]
[<(<(<(<{}))><([]([]()
<{([([[(<>()){}]>(<<{{
<{([{{}}[<[[[<>{}]]]>[]]`,
        expected: 26397,
      },
    ],
    solution: part1,
  },
  part2: {
    tests: [
      {
        input: `[({(<(())[]>[[{[]{<()<>>
[(()[<>])]({[<{<<[]>>(
{([(<{}[<>[]}>{[]{[(<()>
(((({<>}<{<{<>}{[]{[]{}
[[<[([]))<([[{}[[()]]]
[{[{({}]{}}([{[{{{}}([]
{<[[]]>}<{[{[{[]{()[[[]
[<(<(<(<{}))><([]([]()
<{([([[(<>()){}]>(<<{{
<{([{{}}[<[[[<>{}]]]>[]]`,
        expected: 288957,
      },
    ],
    solution: part2,
  },
  trimTestInputs: true,
});
