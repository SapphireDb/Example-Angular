import {Component} from '@angular/core';
import {SapphireDbService} from 'ng-sapphiredb';
import {Observable} from 'rxjs';
import {DefaultCollection} from 'sapphiredb';
import {Example} from './models/basic/example';
import {User} from './models/chat/user';
import {Message} from './models/chat/message';
import {map} from 'rxjs/operators';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.less']
})
export class AppComponent {
  exampleCollection: DefaultCollection<Example>;
  examples$: Observable<Example[]>;

  userCollection: DefaultCollection<User>;
  users$: Observable<User[]>;
  chatPartners$: Observable<User[]>;
  messageCollection: DefaultCollection<Message>;
  messages$: Observable<Message[]>;

  currentUser: User;
  chatPartner: User;
  newMessageContent: string;

  constructor(private db: SapphireDbService) {
    this.exampleCollection = this.db.collection<Example>('basic.examples');
    this.examples$ = this.exampleCollection.values();

    this.userCollection = this.db.collection<User>('chat.users');
    this.users$ = this.userCollection.values();
  }

  /* Basic example */
  addExample() {
    this.exampleCollection.add({
      content: prompt('Content of new example:')
    });
  }

  updateExample(example: Example) {
    this.exampleCollection.update({
      ...example,
      content: prompt('New content of example:')
    });
  }

  removeExample(example: Example) {
    this.exampleCollection.remove(example);
  }

  /* Chat */
  createUser() {
    this.userCollection.add({
      username: prompt('New username: ') || 'default'
    });
  }

  setUser(currentUser: User) {
    this.currentUser = currentUser;
    this.chatPartner = null;
    this.chatPartners$ = this.users$.pipe(
      map((users) => users.filter(u => u.id !== this.currentUser.id))
    );
  }

  setChatPartner(chatPartner: User) {
    this.chatPartner = chatPartner;
    this.messageCollection = this.db.collection<Message>('chat.messages').where([
      [['ownerId', '==', this.currentUser.id], 'and', ['receiverId', '==', this.chatPartner.id]],
      'or',
      [['ownerId', '==', this.chatPartner.id], 'and', ['receiverId', '==', this.currentUser.id]]
    ]);
    this.messages$ = this.messageCollection.values();
  }

  sendMessage() {
    this.messageCollection.add({
      ownerId: this.currentUser.id,
      receiverId: this.chatPartner.id,
      content: this.newMessageContent
    });
    this.newMessageContent = '';
  }
}
