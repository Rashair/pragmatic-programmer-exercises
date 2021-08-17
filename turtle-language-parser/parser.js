import Drawer from "./drawer.js";

class CommandType {
  constructor(name, action, hasArg = false) {
    this.name = name;
    this.action = action;
    this.hasArg = hasArg;
  }
}

class Command {
  constructor(type, arg = null) {
    this.type = type;
    this.arg = arg;
  }

  execute() {
    console.info(`Executing command ${this.type.name} with arg ${this.arg}`)
    this.type.action(this.arg);
  }
}

class Parser {
  constructor() {
    const drawer = new Drawer();
    this.commandTypes = [
      new CommandType("P", (arg) => drawer.doTakePen(arg), true),
      new CommandType("D", () => drawer.doLowerPen,),
      new CommandType("U", () => drawer.doRaisePen),
      new CommandType("W", (arg) => drawer.doDrawWest(arg), true),
      new CommandType("E", (arg) => drawer.doDrawEast(arg), true),
      new CommandType("S", (arg) => drawer.doDrawSouth(arg), true),
      new CommandType("N", (arg) => drawer.doDrawNorth(arg), true),
    ];
    this.drawer = drawer;
  }

  tryParseCommand(instructionString) {
    try {
      return this.parseCommand(instructionString)
    }
    catch (e) {
      console.log(e);
      return null;
    }
  }

  parseCommand(instructionString) {
    if (!instructionString)
      throw new Error(`Empty command`);

    const commandAndArg = instructionString.split(" ");
    const type = this.findCommandType(commandAndArg[0]);
    if (!type)
      throw new Error(`Command ${instructionString} not found`);

    if (!type.hasArg)
      return new Command(type);

    if (commandAndArg.length < 2)
      throw new Error(`Missing argument for command: ${commandAndArg[0]}`);

    return new Command(type, commandAndArg[1]);
  }

  findCommandType(commandString) {
    const upperCaseCommand = commandString.toUpperCase();
    return this.commandTypes.find((c) => c.name === upperCaseCommand);
  }
}

export default Parser;
