export interface Position {
  x: number;
  y: number;
}

export interface Connection {
  from: string;
  to: string;
}

export interface Document {
  id: string;
  name: string;
  type: string;
  content?: string;
  position: Position;
  connections: string[];
  groupId?: string;
}