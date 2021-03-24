export default class Controller {
  #users = new Map();
  constructor({ socketServer }) {
    this.socketServer = socketServer;
  }

  onNewConnection(socket) {
    const { id } = socket;
    console.log("Connection stablished with id: ", id);

    const userData = { id, socket };

    this.#updateGlobalUserData(id, userData);

    socket.on("data", this.#onSocketData(id));
    socket.on("error", this.#onSocketClose(id));
    socket.on("end", this.#onSocketClose(id));
  }

  #onSocketClose(id) {
    return (data) => {
      console.log("onSocketClose: ", data.toString());
    };
  }

  #onSocketData(id) {
    return (data) => {
      console.log("onSocketData: ", data.toString());
    };
  }

  #updateGlobalUserData(socketId, userData) {
    const users = this.#users;
    const user = users.get(socketId) ?? {};

    const updateUserData = {
      ...user,
      ...userData,
    };
    users.set(socketId, updateUserData);

    return users.get(socketId);
  }
}
