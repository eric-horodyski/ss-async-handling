import { DatabaseService } from 'src/app/core/services/database.service';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { SQLite } from '@ionic-native/sqlite/ngx';
import {
  TranslateLoader,
  TranslateService,
  TranslateStore,
} from '@ngx-translate/core';

@NgModule({
  declarations: [AppComponent],
  entryComponents: [],
  imports: [BrowserModule, IonicModule.forRoot(), AppRoutingModule],
  providers: [
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
    DatabaseService,
    SQLite,
    TranslateService,
    TranslateStore,
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
