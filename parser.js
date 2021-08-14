

const doTakePen = (size) => {
  console.info(`Taking pen of size ${size}`);
}

const doLowerPen = () => {
  console.info(`Lowering pen`);
}

const doRaisePen = () => {
  console.info(`Raising pen`);
}

const doDrawWest = (lineLength) => {
  console.info(`Drawing west for ${lineLength}`);
}

const doDrawEast = (lineLength) => {
  console.info(`Drawing east for ${lineLength}`);
}

const doDrawSouth = (lineLength) => {
  console.info(`Drawing south for ${lineLength}`);
}

const doDrawNorth = (lineLength) => {
  console.info(`Drawing north for ${lineLength}`);
}


class Parser {
  constructor() {
    this.commandTypes = [
      new CommandType("P", doTakePen, true),
      new CommandType("D", doLowerPen,),
      new CommandType("U", doRaisePen),
      new CommandType("W", doDrawWest, true),
      new CommandType("E", doDrawEast, true),
      new CommandType("S", doDrawSouth, true),
      new CommandType("N", doDrawNorth, true),
    ];
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
    return this.commandTypes.find((c) => c.name === commandString);
  }
}

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
}

export default Parser;
