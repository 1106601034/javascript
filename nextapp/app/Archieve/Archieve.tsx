// --------------------------
// Stackt Symbol
// --------------------------
export function StacktSymbol(params: number) {
  for (let index = 1; index <= params; index++) {
    console.log('#'.repeat(index));
  }
}
// --------------------------
// fizzBuzz
// --------------------------
export function fizzBuzz(n: number): (string | number)[] {
  const result: (string | number)[] = [];
  for (let i = 1; i <= n; i++) {
    result.push(
      i % 3 === 0 && i % 5 === 0 ? 'FizzBuzz' :
        i % 3 === 0 ? 'Fizz' :
          i % 5 === 0 ? 'Buzz' : i
    );
  }
  return result;
}
// --------------------------
// check if it is a even
// --------------------------
export function isEven(args: number): boolean {
  while (args - 2 != -1 && args - 2 != -2) {
    args -= 2;
  }
  return args === 0;
}
// --------------------------
// count 'B'
// --------------------------
export function countBs(args: string): number {
  let count: number = 0;
  for (let index = 0; index != args.length; index++) {
    if (args[index] === "B") {
      count += 1;
    }
  }
  return count;
}
// --------------------------
// 
// --------------------------
