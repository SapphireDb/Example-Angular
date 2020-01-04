import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {DefaultCollection, SapphireDb} from 'ng-sapphiredb';
import {User} from '../models/user';
import {Observable} from 'rxjs';
import {Router} from '@angular/router';
import {map} from 'rxjs/operators';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.less']
})
export class UsersComponent implements OnInit {

  @Input() exceptId: string;
  @Output() userSelected = new EventEmitter<User>();

  userCollection: DefaultCollection<User>;
  users$: Observable<User[]>;

  constructor(private db: SapphireDb) { }

  ngOnInit() {
    this.userCollection = this.db.collection<User>('users');
    this.users$ = this.userCollection.values().pipe(
      map(users => {
        if (this.exceptId) {
          return users.filter(u => u.id !== this.exceptId);
        }

        return users;
      })
    );
  }

}
