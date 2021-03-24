export default class CliConfig {
  constructor({ userName, room, hostUri }) {
    this.userName = userName;
    this.room = room;

    const { hostname, port, protocol } = new URL(hostUri);
    this.host = hostname;
    this.port = port;
    this.protocol = protocol.replace(/\W/, "");
  }

  static parseArguments(commands) {
    const cmd = new Map();
    for (const key in commands) {
      const index = parseInt(key);
      const command = commands[index];

      const commandPreffix = "--";
      if (!command.includes(commandPreffix)) continue;

      cmd.set(command.replace(commandPreffix, ""), commands[index + 1]);
    }

    const cmdObject = Object.fromEntries(cmd);
    return new CliConfig(cmdObject);
  }
}
