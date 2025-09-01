import * as Archieve from "./Archieve";
// --------------------------
// 🧰 Toolkit for Common Tasks
// --------------------------
export function HereIsSomeGoodies(): any {
  console.clear();
  let a: number = 1;
  let b: number = 2;
  let WriteLine = Archieve.tag`What is ${a} plus ${b}`;
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
export function PrintItems(List: any[]): string {
  let text: string = "";
  for (let index = 1; index <= List.length; index++) {
    text = `${text} ${index}. ${List[index - 1]}`;
  }
  return text;
}

export function AppendItems(List: any[], Items: any[]): any[] {
  let newList: any[] = List.slice();
  for (let index = 0; index < Items.length; index++) {
    newList.push(Items[index]);
  }
  return newList;
}

export function RemoveItems(List: any[], ItemIndex: number[]): any[] {
  let newList: any[] = List.slice();
  for (let index = 0; index < ItemIndex.length; index++) {
    let Item: number = ItemIndex[index];
    newList.splice(Item, 1)
  }
  return newList;
}

export function SearchItems(List: any[], Items: string[]): boolean[] {
  let CheckList: boolean[] = [];
  for (let index = 0; index < Items.length; index++) {
    CheckList.push(List.includes(Items[index]));
  }
  return CheckList;
}
// --------------------------
