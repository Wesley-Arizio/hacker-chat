import Events from "events";
import CliConfig from "./src/cliConfig.js";
import SocketClient from "./src/socket.js";
import TerminalController from "./src/terminalController.js";

const [nodePath, filePath, ...commands] = process.argv;

const cliConfig = CliConfig.parseArguments(commands);
console.log("cliConfig: ", cliConfig);

const componentEmitter = new Events();
const socketClient = new SocketClient(cliConfig);
await socketClient.initialize();

// const controller = new TerminalController();

// await controller.initializeTable(componentEmitter);
