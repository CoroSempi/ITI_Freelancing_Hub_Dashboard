export interface IMsg {
  _id?: string;
  content: String;
  received: Boolean;
  seen: Boolean;
  timestamp?: string;
}
