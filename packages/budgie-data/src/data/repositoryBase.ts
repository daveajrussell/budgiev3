import { Database } from 'duckdb-async';
import { config } from '../config';
import { initSql } from './init/initSql';

export abstract class RepositoryBase {
  private _db!: Database;

  constructor() {
    this.initDbAsync();
  }

  async queryAsync(sql: string, ...args: any): Promise<any> {
    const statement = await this._db.prepare(sql);
    return await statement.all(...args);
  }

  private async initDbAsync() {
    this._db = await Database.create(config.duckDBFilePath);
    await this._db.run(initSql);
  }
}
