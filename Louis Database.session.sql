CREATE TABLE electricity(
    id INT(11) NOT NULL AUTO_INCREMENT PRIMARY KEY,
    month DATE DEFAULT NULL,
    `usage` DECIMAL(8,3) DEFAULT NULL,
    cost DECIMAL(8,2) DEFAULT NULL,
    created TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
