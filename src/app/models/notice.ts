import {Base} from './base';
import {User} from './user';
import {Category} from './category';

export class Notice extends Base {
  content: string;

  userId: number;
  user?: User;

  categoryId: number;
  category?: Category;
}
