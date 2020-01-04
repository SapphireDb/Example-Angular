import { Pipe, PipeTransform } from '@angular/core';
import {Observable} from 'rxjs';
import {User} from './models/user';
import {DefaultCollection, SapphireDb} from 'ng-sapphiredb';
import {map, shareReplay, take} from 'rxjs/operators';

@Pipe({
  name: 'user'
})
export class UserPipe implements PipeTransform {

  userCollection: DefaultCollection<User>;
  users$: Observable<User[]>;

  constructor(private db: SapphireDb) {
    this.userCollection = this.db.collection('users');
    this.users$ = this.userCollection.values();
  }

  transform(userId: string): Observable<User> {
    return this.users$.pipe(
      map(users => users.find(u => u.id === userId))
    );
  }

}
