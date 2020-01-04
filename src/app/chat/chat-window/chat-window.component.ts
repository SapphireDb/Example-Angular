import { Component, OnInit } from '@angular/core';
import {combineLatest, Observable, of, ReplaySubject} from 'rxjs';
import {ActivatedRoute} from '@angular/router';
import {map, shareReplay, switchMap} from 'rxjs/operators';
import {User} from '../models/user';
import {DefaultCollection, SapphireDb} from 'ng-sapphiredb';
import {Message} from '../models/message';

@Component({
  selector: 'app-chat-window',
  templateUrl: './chat-window.component.html',
  styleUrls: ['./chat-window.component.less']
})
export class ChatWindowComponent implements OnInit {
  userId$: Observable<string>;
  user$: Observable<User>;

  chatPartner$ = new ReplaySubject<User>(1);

  messageCollection: DefaultCollection<Message>;
  messages$: Observable<Message[]>;

  newMessage: string;

  constructor(private db: SapphireDb, private route: ActivatedRoute) { }

  ngOnInit() {
    this.userId$ = this.route.params.pipe(
      map((params) => params.userId)
    );

    this.user$ = this.userId$.pipe(
      switchMap((userId: string) => {
        return this.db.collection<User>('users').where(['id', '==', userId]).first().values();
      }),
      shareReplay()
    );

    this.messageCollection = this.db.collection('messages');

    this.messages$ = combineLatest([ this.user$, this.chatPartner$ ]).pipe(
      switchMap(([user, chatPartner]: [User, User]) => {
        if (chatPartner.id === null) {
          return this.messageCollection.where([
            ['ownerId', '==', chatPartner.id],
            'or',
            ['receiverId', '==', chatPartner.id]
          ]).values();
        }

        return this.messageCollection.where([
          [
            ['ownerId', '==', user.id],
            'and',
            ['receiverId', '==', chatPartner.id]
          ],
          'or',
          [
            ['ownerId', '==', chatPartner.id],
            'and',
            ['receiverId', '==', user.id]
          ]
        ]).values();
      }),
      shareReplay()
    )
  }

  sendMessage(from: User, to: User) {
    if (!this.newMessage) {
      return;
    }

    this.messageCollection.add({
      content: this.newMessage,
      receiverId: to.id,
      ownerId: from.id
    });

    this.newMessage = '';
  }
}
