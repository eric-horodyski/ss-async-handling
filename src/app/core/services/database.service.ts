import { TranslateService } from '@ngx-translate/core';
/* eslint-disable no-shadow */
import { Injectable } from '@angular/core';
import { Capacitor } from '@capacitor/core';
import { AlertController } from '@ionic/angular';
import { SQLite, SQLiteObject } from '@ionic-enterprise/secure-storage/ngx';

// eslint-disable-next-line @typescript-eslint/naming-convention
const DATABASE_VERSION = 1;

@Injectable({
  providedIn: 'root',
})
export class DatabaseService {
  private database: SQLiteObject;

  constructor(
    private alertController: AlertController,
    private sqlite: SQLite
  ) {}

  /**
   * Initialize the connection to the database
   *
   * @return
   * @memberof DatabaseService
   */
  async init(): Promise<void> {
    if (Capacitor.getPlatform() === 'web') {
      return;
    }

    await this.setupDatabase();
  }

  /**
   * Connect to an existing, or create a new database
   *
   * @private
   * @memberof DatabaseService
   */
  private async setupDatabase() {
    if (Capacitor.getPlatform() === 'web') {
      return;
    }
    try {
      const db = await this.sqlite.create({
        name: 'cmips_eev',
        location: 'default',
        key: 'password',
      });
      this.database = db;
      await db.executeSql(
        'CREATE TABLE IF NOT EXISTS software(name, company, type, version)',
        []
      );
      await this.database.transaction((tx) => {
        tx.executeSql(
          'INSERT INTO software (name, company, type, version) VALUES (?,?,?,?)',
          ['secure-storage', 'ionic', 'native', '2.0'],
          (t, result) => {}
        );
      });
    } catch (error) {
      alert(error.toString());
    }
  }

  private async getVersionNumber(): Promise<number> {
    return DATABASE_VERSION;
  }
}
