import {Component, OnInit} from '@angular/core';
import {DefaultCollection, SapphireDb} from 'ng-sapphiredb';
import {Observable} from 'rxjs';
import {User} from './models/user';
import {Notice} from './models/notice';
import {Category} from './models/category';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.less']
})
export class AppComponent implements OnInit {
  userCollection: DefaultCollection<User>;
  noticeCollection: DefaultCollection<Notice>;
  categoryCollection: DefaultCollection<Category>;

  users$: Observable<User[]>;
  categories$: Observable<Category[]>;

  constructor(private db: SapphireDb) {
  }

  ngOnInit(): void {
    this.userCollection = this.db.collection<User>('users');
    this.noticeCollection = this.db.collection<Notice>('notices');
    this.categoryCollection = this.db.collection<Category>('categories');

    this.users$ = this.userCollection.include('notices.user').include('notices.category').values();
    this.categories$ = this.categoryCollection.values();
  }

  createUser() {
    const username = prompt('New username');
    this.userCollection.add({
      firstName: username,
      lastName: username,
      username: username
    });
  }

  createNotice(user: User) {
    const notice = prompt('New notice');
    this.noticeCollection.add({
      categoryId: 2,
      userId: user.id,
      content: notice
    });
  }

  createCategory() {
    const category = prompt('New category');
    this.categoryCollection.add({
      name: category
    });
  }

  updateCategory(category: Category) {
    const categoryName = prompt('New category');
    this.categoryCollection.update({
      ...category,
      name: categoryName
    });
  }
}
