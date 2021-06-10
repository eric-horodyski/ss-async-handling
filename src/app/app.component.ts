import { DatabaseService } from './core/services/database.service';
import { Platform } from '@ionic/angular';
import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
  constructor(private platform: Platform, private database: DatabaseService) {
    this.initializeApp();
  }

  initializeApp() {
    this.platform.ready().then(() => {
      this.database.init();
    });
  }
}
