export const initSql = `
-- Create accounts
CREATE SEQUENCE IF NOT EXISTS id_accounts_seq START WITH 1 INCREMENT BY 1;
CREATE TABLE IF NOT EXISTS accounts (id INTEGER DEFAULT nextval('id_accounts_seq'), userId INTEGER, name VARCHAR, type TINYINT, amount REAL, color VARCHAR);

-- Create entries
CREATE SEQUENCE IF NOT EXISTS id_entries_seq START WITH 1 INCREMENT BY 1;
CREATE TABLE IF NOT EXISTS entries (id INTEGER DEFAULT nextval('id_entries_seq'), userId INTEGER, accountId INTEGER, amount REAL, date DATE);
`;
