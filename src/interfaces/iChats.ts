import { IMsg } from './iMsg';

export interface iChats {
  _id?: string;
  fullName: string;
  studentID: string;
  branch: string;
  track: string;
  ChatRoom?: IMsg[];
}
