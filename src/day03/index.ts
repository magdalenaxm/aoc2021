import run from "aocrunner";

const parseInput = (rawInput: string) => rawInput;

const stringToBinary = (num: string) => parseInt(num, 2);

const part1 = (rawInput: string) => {
  const input = parseInput(rawInput);
  const reportLines = input.split("\n");

  let gammaRate = "";
  let epsilonRate = "";

  for (let i = 0; i < reportLines[0].length; i++) {
    let zeroCount = 0;
    let oneCount = 0;

    reportLines.forEach((reportLine) => {
      if (reportLine[i] === "1") {
        oneCount += 1;
      } else {
        zeroCount += 1;
      }
    });

    if (oneCount > zeroCount) {
      gammaRate += "1";
      epsilonRate += "0";
    } else {
      gammaRate += "0";
      epsilonRate += "1";
    }
  }

  return stringToBinary(gammaRate) * stringToBinary(epsilonRate);
};

function findOxygenRating(
  reportLines: string[],
  filterBy: "least" | "most",
  index = 0,
): string {
  if (reportLines.length === 1) {
    return reportLines[0];
  }

  let zeroCount = 0;
  let oneCount = 0;
  let newReportLines;

  reportLines.forEach((reportLine) => {
    if (reportLine[index] === "1") {
      oneCount += 1;
    } else {
      zeroCount += 1;
    }
  });

  if (oneCount > zeroCount || oneCount === zeroCount) {
    newReportLines = reportLines.filter((reportLine) =>
      filterBy === "most"
        ? reportLine[index] === "1"
        : reportLine[index] === "0",
    );
  } else {
    newReportLines = reportLines.filter((reportLine) =>
      filterBy === "most"
        ? reportLine[index] === "0"
        : reportLine[index] === "1",
    );
  }

  return findOxygenRating(newReportLines, filterBy, index + 1);
}

const part2 = (rawInput: string) => {
  const input = parseInput(rawInput);
  const reportLines = input.split("\n");

  let oxygenGeneratorRating = findOxygenRating(reportLines, "most");
  let co2ScrubberRating = findOxygenRating(reportLines, "least");

  return (
    stringToBinary(oxygenGeneratorRating) * stringToBinary(co2ScrubberRating)
  );
};

run({
  part1: {
    tests: [
      {
        input: `
        00100
        11110
        10110
        10111
        10101
        01111
        00111
        11100
        10000
        11001
        00010
        01010
        `,
        expected: 198,
      },
    ],
    solution: part1,
  },
  part2: {
    tests: [
      {
        input: `
        00100
        11110
        10110
        10111
        10101
        01111
        00111
        11100
        10000
        11001
        00010
        01010
        `,
        expected: 230,
      },
    ],
    solution: part2,
  },
  trimTestInputs: true,
});
