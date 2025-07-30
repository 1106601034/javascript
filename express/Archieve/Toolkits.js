// --------------------------
// 🧰 Toolkit for Common Tasks
// --------------------------
export default class Toolkits {
  // --------------------------
  // 🧮 Array To List
  // --------------------------
  static arrayToList(array) {
    return array.map(item => item.toString());
  }

  // --------------------------
  // 🧮 Duplicate List
  // --------------------------
  static duplicateList(list) {
    return [...list];
  }

  // --------------------------
  // 🧠 Reusable Input Helpers (Node.js only)
  // --------------------------
  static async readString(prompt, error) {
    const input = await this._readLine(prompt);
    return input.trim() !== '' ? input : (console.log(error), this.readString(prompt, error));
  }

  static async readInt(prompt, error) {
    const input = await this._readLine(prompt);
    const parsed = parseInt(input);
    return !isNaN(parsed) ? parsed : (console.log(error), this.readInt(prompt, error));
  }

  static async readPositiveInt(prompt, error) {
    const val = await this.readInt(prompt, error);
    return val > 0 ? val : (console.log(error), this.readPositiveInt(prompt, error));
  }

  static async readDouble(prompt, error) {
    const input = await this._readLine(prompt);
    const parsed = parseFloat(input);
    return !isNaN(parsed) ? parsed : (console.log(error), this.readDouble(prompt, error));
  }

  static async readPositiveDouble(prompt, error) {
    const val = await this.readDouble(prompt, error);
    return val > 0 ? val : (console.log(error), this.readPositiveDouble(prompt, error));
  }

  // --------------------------
  // 🔢 Range Input Checker
  // --------------------------
  static isInRange(value, min, max) {
    return min < max && value >= min && value <= max;
  }

  // --------------------------
  // 🔢 Menu Related
  // --------------------------
  static async listToMenu(list, message, error) {
    console.log('-'.repeat(40));
    list.forEach(item => console.log(item));
    let choice;
    do {
      console.log('-'.repeat(40));
      choice = await this.readInt(message, error);
    } while (!this.isInRange(choice, 1, list.length));
    return choice;
  }

  static quit(message) {
    console.log('-'.repeat(40));
    console.log(message);
    console.log('-'.repeat(40));
  }

  static async pressEnterToClear(message) {
    console.log(message);
    await this._readLine('');
    console.clear();
  }

  // --------------------------
  // 🔄 Private: Input (Node.js)
  // --------------------------
  static _readLine(prompt) {
    const readline = require('readline');
    const rl = readline.createInterface({
      input: process.stdin,
      output: process.stdout,
    });

    return new Promise(resolve =>
      rl.question(prompt, answer => {
        rl.close();
        resolve(answer);
      })
    );
  }
}
