export const initSql = `
-- Create categories
CREATE SEQUENCE IF NOT EXISTS id_categories_seq START WITH 1 INCREMENT BY 1;
CREATE TABLE IF NOT EXISTS categories (id INTEGER DEFAULT nextval('id_categories_seq'), userId INTEGER, name VARCHAR, type TINYINT, amount REAL, color VARCHAR);

-- Create entries
CREATE SEQUENCE IF NOT EXISTS id_entries_seq START WITH 1 INCREMENT BY 1;
CREATE TABLE IF NOT EXISTS entries (id INTEGER DEFAULT nextval('id_entries_seq'), userId INTEGER, categoryId INTEGER, amount REAL, date DATE);
`;
