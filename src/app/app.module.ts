import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SAPPHIRE_DB_OPTIONS, SapphireDbModule, SapphireDbOptions } from 'ng-sapphiredb';
import {NgMetro4Module} from 'ng-metro4';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    SapphireDbModule,
    NgMetro4Module
  ],
  providers: [
    {
      provide: SAPPHIRE_DB_OPTIONS,
      useValue: <SapphireDbOptions>{
        serverBaseUrl: 'localhost:5000',
        useSsl: false,
        connectionType: 'websocket'
      }
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
