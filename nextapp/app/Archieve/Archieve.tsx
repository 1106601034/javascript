// 
export function StacktSymbol(params: number) {
  for (let index = 1; index <= params; index++) {
    console.log('#'.repeat(index));
  }
}

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

