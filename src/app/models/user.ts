import {Base} from './base';
import {Notice} from './notice';

export class User extends Base {
  username: string;
  firstName: string;
  lastName: string;

  notices?: Notice[];
}
