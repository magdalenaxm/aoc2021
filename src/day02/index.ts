import run from "aocrunner";

const parseInput = (rawInput: string) => rawInput;

const part1 = (rawInput: string) => {
  const input = parseInput(rawInput);
  const instructions = input
    .split("\n");

  let depth = 0;
  let horizontalPos = 0;

  instructions.forEach(instruction => {
    const [command, amount] = instruction.split(" ");

    switch(command) {
      case "forward":
        horizontalPos += parseInt(amount);
        return;
      case "up":
        depth -=  parseInt(amount);
        return;
      case "down":
        depth += parseInt(amount)
        return
    }
  })

  return depth * horizontalPos;
};

const part2 = (rawInput: string) => {
  const input = parseInput(rawInput);
   const instructions = input
    .split("\n");

  let depth = 0;
  let horizontalPos = 0;
  let aim = 0;

  instructions.forEach(instruction => {
    const [command, amount] = instruction.split(" ");

    switch(command) {
      case "forward":
        horizontalPos += parseInt(amount);
        depth += aim * parseInt(amount)
        return;
      case "up":
        aim -= parseInt(amount)
        return;
      case "down":
        aim += parseInt(amount)
        return
    }
  })

  return depth * horizontalPos;

  return;
};

run({
  part1: {
    tests: [
      { input: `
          forward 5
          down 5
          forward 8
          up 3
          down 8
          forward 2
`, expected: 150 },
    ],
    solution: part1,
  },
  part2: {
    tests: [
       { input: `
          forward 5
          down 5
          forward 8
          up 3
          down 8
          forward 2
`, expected: 900 },
    ],
    solution: part2,
  },
  trimTestInputs: true,
});
