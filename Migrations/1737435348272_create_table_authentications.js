export default { 
    up:"CREATE TABLE authentications (id INT NOT NULL PRIMARY KEY, created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP, updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP)",
    down:"DROP TABLE authentications" 
}
    