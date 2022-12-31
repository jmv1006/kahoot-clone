import SessionIdentifier from "./session-identifier";

interface ServerToClientEvents {
    noArg: () => void;
    basicEmit: (a: number, b: string, c: Buffer) => void;
    withAck: (d: string, callback: (e: number) => void) => void;
    'updated-session-info': (identifier : SessionIdentifier) => void;
}
  
interface ClientToServerEvents {
hello: () => void;
}

interface InterServerEvents {
ping: () => void;
}

interface SocketData {
name: string;
age: number;
}

export {ServerToClientEvents, ClientToServerEvents, InterServerEvents, SocketData};