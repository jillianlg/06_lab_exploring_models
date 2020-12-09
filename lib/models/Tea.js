const pool = require('../utils/pool');

module.exports = class Tea {
  id;
  type;
  name;
  origin;

  constructor(row) {
    this.id = row.id;
    this.type = row.type;
    this.name = row.name;
    this.origin = row.origin;
  }

  static async insert({ type, name, origin }) {
    const { rows } = await pool.query(
      'INSERT INTO tea (type, name, origin) VALUES($1, $2, $3) RETURNING *',
      [type, name, origin]
    );
    return new Tea(rows[0]);
  }
};
