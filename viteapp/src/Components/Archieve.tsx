// --------------------------
// Stack Symbol
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
export function tag(literal: any, ...values: any): string {
  let result: number = 0;
  switch (literal[1]) {
    case " plus ":
      result = values[0] + values[1];
      break;
    case " minus ":
      result = values[0] - values[1];
      break;
  }
  return `${values[0]}${literal[1]}${values[1]} is ${result}`;
}
// --------------------------
//  Shopping List
// --------------------------
export class ShoppingCart {
  private items: Item[];

  public constructor() {
    this.items = [];
  }

  public getContents() {
    return this.items;
  }
}

export class Item {
  private name: string;
  private price: number;
  private quantity: number;

  public constructor(name: string, price: number, quantity: number) {
    this.name = name;
    this.price = price;
    this.quantity = quantity;
  }

  public getName() {
    return this.name;
  }

  public getPrice() {
    return this.price;
  }

  public getQuantity() {
    return this.quantity;
  }

  public PrintItem() {
    return `Name: ${this.name} Price: ${this.price} Quantity: ${this.quantity}`;
  }
}

export function PrintItems(List: string[]): string {
  if (List.length > 5) {
    console.log("Your cart is full!");
  }

  let text: string = "";
  for (let index = 1; index <= List.length; index++) {
    text = `${text} ${index}. ${List[index - 1]}`;
  }
  return text;
}
