export default { 
    up:"CREATE TABLE games (id INT NOT NULL PRIMARY KEY, created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP, updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP)",
    down:"DROP TABLE games" 
}
    