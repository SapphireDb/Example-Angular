import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ChatRoutingModule } from './chat-routing.module';
import { UsersComponent } from './users/users.component';
import { SelectUserComponent } from './select-user/select-user.component';
import {NgMetro4Module} from 'ng-metro4';
import { ChatWindowComponent } from './chat-window/chat-window.component';
import { UserPipe } from './user.pipe';


@NgModule({
  declarations: [UsersComponent, SelectUserComponent, ChatWindowComponent, UserPipe],
  imports: [
    CommonModule,
    ChatRoutingModule,
    NgMetro4Module
  ]
})
export class ChatModule { }
