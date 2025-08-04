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
