exports.createWorkerTable = `
  CREATE TABLE IF NOT EXISTS workers (
    id INT NOT NULL AUTO_INCREMENT,
    name VARCHAR(255) NOT NULL,
    company_name VARCHAR(255),
    email VARCHAR(255) UNIQUE,
    CONSTRAINT workers_pk PRIMARY KEY (id)
  )ENGINE=INNODB;
`;
exports.createOrderTable = `
  CREATE TABLE IF NOT EXISTS orders (
    id INT NOT NULL AUTO_INCREMENT,
    title VARCHAR(255) NOT NULL,
    description VARCHAR(255),
    deadline DATETIME NOT NULL,
    CONSTRAINT orders_pk PRIMARY KEY (id)
  )ENGINE=INNODB;
`;
exports.createOrderWorkersTable = `
  CREATE TABLE IF NOT EXISTS order_workers (
    order_id INT NOT NULL,
    worker_id INT NOT NULL,
    FOREIGN KEY (order_id) REFERENCES orders(id)
      ON DELETE CASCADE
      ON UPDATE CASCADE,
    FOREIGN KEY (worker_id) REFERENCES workers(id)
      ON DELETE CASCADE
      ON UPDATE CASCADE,
    CONSTRAINT order_workers_pk PRIMARY KEY (order_id, worker_id)
  )ENGINE=INNODB;
`;

// export const a = `
//   INSERT INTO order_workers (order_id, worker_id)
//   SELECT '2', '4'
//     FROM DUAL
//   WHERE (SELECT COUNT(*) FROM order_workers WHERE order_id=2) < 5;
// `;
