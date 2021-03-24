export default class SocketClient {
  #serverConnection = {};
  constructor({ host, port, protocol }) {
    this.host = host;
    this.port = port;
    this.protocol = protocol;
  }

  async createConnection() {
    const options = {
      port: this.port,
      host: this.host,
      headers: {
        Connection: "Upgrade",
        Upgrade: "websocket",
      },
    };

    const http = await import(this.protocol);
    const request = http.request(options);
    request.end();

    return new Promise((resolve) => {
      request.once("upgrade", (response, socket) => resolve(socket));
    });
  }

  async initialize() {
    this.#serverConnection = await this.createConnection();
    console.log("I connected to the server");
  }
}

// , (response, socket) => {
//       socket.on("data", (data) => {
//         console.log("CLIENT RECEIVED DATA: ", data.toString());
//       });

//       setInterval(() => {
//         socket.write("HI");
//       }, 500);
//     }
