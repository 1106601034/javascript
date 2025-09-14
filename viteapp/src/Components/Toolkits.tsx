import * as Archieve from "./Archieve";
// --------------------------
// 🧰 Toolkit for Common Tasks
// --------------------------
export function HereIsSomeGoodies(): string {
  console.clear();
  const a: number = 1;
  const b: number = 2;
  const WriteLine = Archieve.tag`What is ${a} plus ${b}`;
  return WriteLine;
}
// --------------------------
// 🔢 Range Input Checker
// --------------------------
export function isInRange(value: number, min: number, max: number): boolean {
  return min < max && value >= min && value <= max;
}
// --------------------------
// 🔢 Array related
// --------------------------
export function PrintItems(List: string[]): string {
  let text: string = "";
  for (let index = 1; index <= List.length; index++) {
    text = `${text} ${index}. ${List[index - 1]}`;
  }
  return text;
}

export function AppendItems(List: string[], Items: string[]): string[] {
  const newList: string[] = List.slice();
  for (let index = 0; index < Items.length; index++) {
    newList.push(Items[index]);
  }
  return newList;
}

export function RemoveItems(List: string[], ItemIndex: number[]): string[] {
  const newList: string[] = List.slice();
  for (let index = 0; index < ItemIndex.length; index++) {
    const Item: number = ItemIndex[index];
    newList.splice(Item, 1)
  }
  return newList;
}

export function SearchItems(List: string[], Items: string[]): boolean[] {
  const CheckList: boolean[] = [];
  for (let index = 0; index < Items.length; index++) {
    CheckList.push(List.includes(Items[index]));
  }
  return CheckList;
}
// --------------------------
