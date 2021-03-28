#!/usr/bin/env node

import Events from "events";
import CliConfig from "./src/cliConfig.js";
import EventManager from "./src/eventManager.js";
import SocketClient from "./src/socket.js";
import TerminalController from "./src/terminalController.js";

const [nodePath, filePath, ...commands] = process.argv;

const cliConfig = CliConfig.parseArguments(commands);
console.log("cliConfig: ", cliConfig);

const componentEmitter = new Events();
const socketClient = new SocketClient(cliConfig);
await socketClient.initialize();

const eventManager = new EventManager({ componentEmitter, socketClient });

const events = eventManager.getEvents();
socketClient.attachEvents(events);

const data = {
  roomId: cliConfig.room,
  userName: cliConfig.userName,
};

eventManager.joinRoomAndWaitForMessages(data);

const controller = new TerminalController();
await controller.initializeTable(componentEmitter);
