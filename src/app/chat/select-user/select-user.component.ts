import { Component, OnInit } from '@angular/core';
import {CommandResult, DefaultCollection, SapphireDb} from 'ng-sapphiredb';
import {User} from '../models/user';
import {Observable} from 'rxjs';
import {Router} from '@angular/router';
import {finalize, take} from 'rxjs/operators';

@Component({
  selector: 'app-select-user',
  templateUrl: './select-user.component.html',
  styleUrls: ['./select-user.component.less']
})
export class SelectUserComponent implements OnInit {

  userCollection: DefaultCollection<User>;
  users$: Observable<User[]>;

  newUsername: string;

  constructor(private db: SapphireDb, private router: Router) { }

  ngOnInit() {
    this.userCollection = this.db.collection<User>('users');
    this.users$ = this.userCollection.values();
  }

  selectUser(user: User) {
    this.router.navigateByUrl(`chat/chat/${user.id}`);
  }

  createAndSelectUser() {
    this.userCollection.add({
      username: this.newUsername
    }).subscribe((newUserResult: CommandResult<User>) => {
      if (!newUserResult.error) {
        this.selectUser(newUserResult.value);
      }
    });
  }
}
