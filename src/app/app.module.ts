import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import {SAPPHIRE_DB_OPTIONS, SapphireDbModule, SapphireDbOptions} from 'ng-sapphiredb';
import {HttpClientModule} from '@angular/common/http';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    SapphireDbModule
  ],
  providers: [
    {
      provide: SAPPHIRE_DB_OPTIONS,
      useValue: <SapphireDbOptions>{
        serverBaseUrl: 'localhost:5001',
        useSsl: true,
        connectionType: 'websocket'
      }
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
