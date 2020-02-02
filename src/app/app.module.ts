import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import {SAPPHIRE_DB_OPTIONS, SapphireDbModule} from 'ng-sapphiredb';
import {SapphireDbOptions} from 'sapphiredb';
import {FormsModule} from '@angular/forms';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    SapphireDbModule,
    FormsModule
  ],
  providers: [
    {
      provide: SAPPHIRE_DB_OPTIONS,
      useValue: {
        useSsl: true,
        serverBaseUrl: 'sapphiredb-demo.azurewebsites.net',
        connectionType: 'websocket'
      } as SapphireDbOptions
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
