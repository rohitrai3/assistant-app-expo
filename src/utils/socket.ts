import { io, Socket } from "socket.io-client";
import { state$ } from "./store";

export default class SocketSingleton {
  private static instance: Socket;

  private constructor() { }

  public static getInstance(): Socket {
    if (!SocketSingleton.instance) {
      SocketSingleton.instance = io(state$.backend.get());
    }

    return SocketSingleton.instance;
  }
}

