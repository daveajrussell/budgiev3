// packages/core/src/config.ts
import path from 'path';

const defaultDuckDBFilePath = path.join(__dirname, '..', 'budgie.duckdb');

export const config = {
  duckDBFilePath: defaultDuckDBFilePath,
};
