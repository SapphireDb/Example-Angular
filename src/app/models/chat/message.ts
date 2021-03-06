import {Base} from '../base';

export interface Message extends Base {
  content: string;
  ownerId: number;
  receiverId: number;
}
