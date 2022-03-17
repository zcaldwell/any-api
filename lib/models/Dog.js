const pool = require('../utils/pool');

module.exports = class Dog {
  id;
  name;
  age;

  constructor(row) {
    this.id = row.id;
    this.name = row.name;
    this.age = row.age;
  }

  static async insert({ name, age }) {
    const { rows } = await pool.query(
      'INSERT INTO dogs(name, age) VALUES ($1, $2) RETURNING *;',
      [name, age]
    );
    return new Dog(rows[0]);
  }

  static async findAll() {
    const { rows } = await pool.query(
      `
      SELECT
        *
      FROM
        dogs
      `
    );
    return rows.map((row) => new Dog(row));
  }

  static async findById(id) {
    const { rows } = await pool.query(
      `
      SELECT
        *
      FROM
        dogs
      WHERE
        id=$1
      `,
      [id]
    );
    return new Dog(rows[0]);
  }
};
