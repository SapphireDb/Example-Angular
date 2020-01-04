import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {SelectUserComponent} from './select-user/select-user.component';
import {ChatWindowComponent} from './chat-window/chat-window.component';

const routes: Routes = [
  { path: 'select-user', component: SelectUserComponent },
  { path: 'chat/:userId', component: ChatWindowComponent },
  { path: '', redirectTo: 'select-user', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ChatRoutingModule { }
