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

  static async findById(id) {
    const { rows } = await pool.query(
      'SELECT * FROM tea WHERE id=$1',
      [id]
    );
    
    if(!rows[0]) throw new Error(`No tea with id ${id}`);
    return new Tea(rows[0]);
  }

  static async find() {
    const { rows } = await pool.query('SELECT * FROM tea');

    return rows.map(row => new Tea(row));
  }

  static async update(id, { type, name, origin }) {
    const { rows } = await pool.query(
      `UPDATE tea
        SET type=$1,
            name=$2,
            origin=$3
        WHERE id=$4
        RETURNING *`,
      [type, name, origin, id]
    );
    if(!rows[0]) throw new Error(`No tea with id ${id}`);
    return new Tea(rows[0]);
  }

  static async delete(id) {
    const { rows } = await pool.query(
      'DELETE FROM tea WHERE id=$1 RETURNING *',
      [id]);

    return new Tea(rows[0]);
  }
};
