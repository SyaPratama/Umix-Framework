export default { 
    up:"CREATE TABLE IF NOT EXISTS personal_access_tokens (id INT NOT NULL AUTO_INCREMENT PRIMARY KEY, created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP, updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP)",
    down:"DROP TABLE personal_access_tokens" 
}
    