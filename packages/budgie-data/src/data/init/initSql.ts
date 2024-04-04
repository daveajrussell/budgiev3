export const initSql = `
CREATE SEQUENCE IF NOT EXISTS id_categories_seq START WITH 1 INCREMENT BY 1;
CREATE TABLE IF NOT EXISTS categories (id INTEGER DEFAULT nextval('id_categories_seq'), name VARCHAR, userId INTEGER, type TINYINT, amount REAL, color VARCHAR);
`;
