import run from "aocrunner";

const parseInput = (rawInput: string) =>
  rawInput
    .split("\n")
    .map((item) => item.substring(item.indexOf("| ") + 2).split(" "))
    .flat();

const part1 = (rawInput: string) => {
  const input = parseInput(rawInput);
  const digits: string[] = [];

  input.forEach((item) => {
    if (
      item.length === 2 ||
      item.length === 3 ||
      item.length === 4 ||
      item.length === 7
    ) {
      digits.push(item);
    }
  });

  return digits.length;
};

const parseInput2 = (rawInput: string) =>
  rawInput
    .split("\n")
    .map((item) => item.split(" | "))
    .map((element) => ({
      input: element[0].split(" "),
      output: element[1].split(" "),
    }));

interface Segment {
  top: string[];
  topLeft: string[];
  topRight: string[];
  middle: string[];
  bottomLeft: string[];
  bottomRight: string[];
  bottom: string[];
  know: string[];
}

const findKnowingPatterns = (
  segments: Segment,
  numbers: string[],
  input: string[],
) => {
  const one = input.find((element) => element.length === 2)!;
  const four = input.find((element) => element.length === 4)!;
  const seven = input.find((element) => element.length === 3)!;
  const eight = input.find((element) => element.length === 7)!;

  numbers[1] = one;
  numbers[4] = four;
  numbers[7] = seven;
  numbers[8] = eight;

  one.split("").forEach((element) => {
    segments.topRight.push(element);
    segments.bottomRight.push(element);
    segments.know.push(element);
  });

  four.split("").forEach((element) => {
    if (!segments.topRight.includes(element)) {
      segments.topLeft.push(element);
      segments.middle.push(element);
      segments.know.push(element);
    }
  });

  seven.split("").forEach((element) => {
    if (!segments.topRight.includes(element)) {
      segments.top.push(element);
      segments.know.push(element);
    }
  });

  return { segments, numbers };
};

const checkNine = (element: string, arr1: string[], arr2: string[],  arr3: string[],  arr4: string[]) => {
  let foundInOne = true;

  arr1.forEach((item) => {
    if (!element.includes(item)) {
      foundInOne = false;
    }
  });

  let foundInTwo = true;

  arr2.forEach((item) => {
    if (!element.includes(item)) {
      foundInTwo = false;
    }
  });

  let foundInThree = true;

  arr3.forEach((item) => {
    if (!element.includes(item)) {
      foundInThree = false;
    }
  });

  let foundInFour = true;

  arr4.forEach((item) => {
    if (!element.includes(item)) {
      foundInFour = false;
    }
  });

  return foundInOne && foundInTwo && foundInThree && foundInFour;
};

const checkThreeOrFive = (element: string, arr1: string[], arr2: string[]) => {
  let foundInOne = true;

  arr1.forEach((item) => {
    if (!element.includes(item)) {
      foundInOne = false;
    }
  });

  let foundInTwo = true;

  arr2.forEach((item) => {
    if (!element.includes(item)) {
      foundInTwo = false;
    }
  });

  return foundInOne && foundInTwo;
};

const checkSix = (element: string, arr1: string[]) => {
  let foundInOne = true;

  arr1.forEach((item) => {
    if (!element.includes(item)) {
      foundInOne = false;
    }
  });

  return foundInOne;
};

const findRemainingElement = (middle: string[], element: string) => {
  let finalMiddle = "";

  middle.forEach((item) => {
    if (element.includes(item)) {
      finalMiddle = item;
    }
  });

  return finalMiddle;
};

const findNewChar = (know: string[], element: string) => {
  let bottom = "";

  element.split("").forEach((item) => {
    if (!know.includes(item)) {
      bottom = item;
    }
  });

  return bottom;
};

const findRemainingPatterns = (
  segments: Segment,
  numbers: string[],
  input: string[],
) => {
  input.forEach((element) => {
    // 0, 6 oder 9
    if (element.length === 6) {
      if (
        !numbers[9] &&
        checkNine(element, segments.topRight, segments.middle, segments.topLeft, segments.bottomRight)
      ) {
        numbers[9] = element;

        if (segments.bottom.length !== 1) {
          const bottom = findNewChar(segments.know, element);
          segments.bottom = [bottom];
          segments.know.push(bottom);
        }
      } else if (!numbers[6] && checkSix(element, segments.middle)) {
        numbers[6] = element;
        if (segments.bottomRight.length !== 1) {
          const bottomRight = findRemainingElement(
            segments.bottomRight,
            element,
          );
          segments.bottomRight = [bottomRight];
        }
      } else if (!numbers[0]) {
        numbers[0] = element;
      }
    } else if (element.length === 5) {
      // 5, 2, 3
      if (
        !numbers[5] &&
        checkThreeOrFive(element, segments.topLeft, segments.middle)
      ) {
        numbers[5] = element;

        if (segments.bottom.length !== 1) {
          const bottom = findNewChar(segments.know, element);
          segments.bottom = [bottom];
          segments.know.push(bottom);
        }

        if (segments.bottomRight.length !== 1) {
          const bottomRight = findRemainingElement(
            segments.bottomRight,
            element,
          );
          segments.bottomRight = [bottomRight];
        }
      } else if (
        !numbers[3] &&
        checkThreeOrFive(element, segments.topRight, segments.bottomRight)
      ) {
        numbers[3] = element;
        const middle = findRemainingElement(segments.middle, element);
        segments.know.push(middle);
        segments.topLeft = segments.middle.filter((item) => item !== middle);
        segments.middle = [middle];
      } else if (!numbers[2]) {
        numbers[2] = element;
        const topRight = findRemainingElement(segments.topRight, element);
        segments.know.push(topRight);
        segments.topRight = [topRight];

        const bottomLeft = findNewChar(segments.know, element);
        segments.bottomLeft = [bottomLeft];
        segments.know.push(bottomLeft);
      }
    }
  });


  return numbers;
};

const part2 = (rawInput: string) => {
  const input = parseInput2(rawInput);

   let outputs: number[] = [];

  input.forEach((element) => {

    let segments = {
    top: [],
    topLeft: [],
    topRight: [],
    middle: [],
    bottomLeft: [],
    bottomRight: [],
    bottom: [],
    know: [],
  };
  let numbers: string[] = [];
 
    const { segments: firstSegments, numbers: firstNumbers } =
      findKnowingPatterns(segments, numbers, element.input);

    const finalNumbers = findRemainingPatterns(
      firstSegments,
      firstNumbers,
      element.input,
    );

    let outputNumber = "";

    element.output.forEach((output) => {
      const index = finalNumbers.findIndex((number) => {
        let outputChars = output.split("").sort();
        let numberChars = number.split("").sort();

        return outputChars.join() === numberChars.join();
      });

      outputNumber += index;
    });

    outputs.push(parseInt(outputNumber));
  });

  let sum = 0;

  outputs.forEach((output) => {
    sum += output;
  });

  return sum;
};

run({
  part1: {
    tests: [
      {
        input: `be cfbegad cbdgef fgaecd cgeb fdcge agebfd fecdb fabcd edb | fdgacbe cefdb cefbgd gcbe
edbfga begcd cbg gc gcadebf fbgde acbgfd abcde gfcbed gfec | fcgedb cgb dgebacf gc
fgaebd cg bdaec gdafb agbcfd gdcbef bgcad gfac gcb cdgabef | cg cg fdcagb cbg
fbegcd cbd adcefb dageb afcb bc aefdc ecdab fgdeca fcdbega | efabcd cedba gadfec cb
aecbfdg fbg gf bafeg dbefa fcge gcbea fcaegb dgceab fcbdga | gecf egdcabf bgf bfgea
fgeab ca afcebg bdacfeg cfaedg gcfdb baec bfadeg bafgc acf | gebdcfa ecba ca fadegcb
dbcfg fgd bdegcaf fgec aegbdf ecdfab fbedc dacgb gdcebf gf | cefg dcbef fcge gbcadfe
bdfegc cbegaf gecbf dfcage bdacg ed bedf ced adcbefg gebcd | ed bcgafe cdgba cbgef
egadfb cdbfeg cegd fecab cgb gbdefca cg fgcdab egfdb bfceg | gbdfcae bgc cg cgb
gcafb gcf dcaebfg ecagb gf abcdeg gaef cafbge fdbac fegbdc | fgae cfgab fg bagce`,
        expected: 26,
      },
    ],
    solution: part1,
  },
  part2: {
    tests: [
      {
        input: `be cfbegad cbdgef fgaecd cgeb fdcge agebfd fecdb fabcd edb | fdgacbe cefdb cefbgd gcbe
edbfga begcd cbg gc gcadebf fbgde acbgfd abcde gfcbed gfec | fcgedb cgb dgebacf gc
fgaebd cg bdaec gdafb agbcfd gdcbef bgcad gfac gcb cdgabef | cg cg fdcagb cbg
fbegcd cbd adcefb dageb afcb bc aefdc ecdab fgdeca fcdbega | efabcd cedba gadfec cb
aecbfdg fbg gf bafeg dbefa fcge gcbea fcaegb dgceab fcbdga | gecf egdcabf bgf bfgea
fgeab ca afcebg bdacfeg cfaedg gcfdb baec bfadeg bafgc acf | gebdcfa ecba ca fadegcb
dbcfg fgd bdegcaf fgec aegbdf ecdfab fbedc dacgb gdcebf gf | cefg dcbef fcge gbcadfe
bdfegc cbegaf gecbf dfcage bdacg ed bedf ced adcbefg gebcd | ed bcgafe cdgba cbgef
egadfb cdbfeg cegd fecab cgb gbdefca cg fgcdab egfdb bfceg | gbdfcae bgc cg cgb
gcafb gcf dcaebfg ecagb gf abcdeg gaef cafbge fdbac fegbdc | fgae cfgab fg bagce`,
        expected: 61229,
      },
    ],
    solution: part2,
  },
  trimTestInputs: true,
});
