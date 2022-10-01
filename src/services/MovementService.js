const Database = require('../utils/Database');
const Logger = require('../utils/Logger');

class MovementService {
  constructor() {
    this.tableName = 'movements';
  }

  async create(movement) {
    try {
      const query = `
      INSERT INTO ${this.tableName}
      (
        dt_date,
        dc_price,
        vc_description,
        bi_category_id,
        bi_sub_category_id,
        in_movement_type_id,
        in_payment_type_id
      ) VALUES (
        ?,
        ?,
        ?,
        ?,
        ?,
        ?,
        ?
      )`;

      const result = await Database.executeQuery(query, Object.values(movement));
      return result[0];
    } catch (e) {
      Logger.error(e);
    }

    return [];
  }

  async getAll() {
    try {
      const query = `
      SELECT
        t1.bi_id,
        t1.dt_date,
        t1.dc_price,
        IFNULL(t1.vc_description, '') vc_description,
        t2.vc_category,
        t3.vc_sub_category,
        t4.vc_movement_type,
        t5.vc_payment_type,
        t1.dt_timestamp_created,
        t1.dt_timestamp_updated
      FROM ${this.tableName} t1
      INNER JOIN categories t2  ON t2.bi_id = t1.bi_category_id
      INNER JOIN sub_categories t3 ON t3.bi_id = t1.bi_sub_category_id
      INNER JOIN movements_type t4 ON t4.in_id = t1.in_movement_type_id
      INNER JOIN payments_type t5 ON t5.in_id = t1.in_payment_type_id
      ORDER BY
        dt_date DESC`;

      const result = await Database.executeQuery(query, []);
      return result[0];
    } catch (e) {
      Logger.error(e);
    }

    return [];
  }

  async getById(id) {
    try {
      const query = `
      SELECT
        t1.bi_id,
        t1.dt_date,
        t1.dc_price,
        IFNULL(t1.vc_description, '') vc_description,
        t1.bi_category_id,
        t2.vc_category,
        t1.bi_sub_category_id,
        t3.vc_sub_category,
        t1.in_movement_type_id,
        t4.vc_movement_type,
        t1.in_payment_type_id,
        t5.vc_payment_type,
        t1.dt_timestamp_created,
        t1.dt_timestamp_updated
      FROM ${this.tableName} t1
      INNER JOIN categories t2  ON t2.bi_id = t1.bi_category_id
      INNER JOIN sub_categories t3 ON t3.bi_id = t1.bi_sub_category_id
      INNER JOIN movements_type t4 ON t4.in_id = t1.in_movement_type_id
      INNER JOIN payments_type t5 ON t5.in_id = t1.in_payment_type_id
      WHERE
        t1.bi_id = ?
      `;

      const result = await Database.executeQuery(query, [id]);
      return result[0];
    } catch (e) {
      Logger.error(e);
    }

    return [];
  }
}

module.exports = new MovementService();
