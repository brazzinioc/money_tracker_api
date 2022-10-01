const Database = require('../utils/Database');
const Logger = require('../utils/Logger');

class PaymentTypeService {
  constructor() {
    this.tableName = 'payments_type';
  }

  async getAll() {
    try {
      const query = `
      SELECT
        in_id,
        vc_payment_type,
        IFNULL(vc_description, '') vc_description,
        dt_timestamp_created,
        dt_timestamp_updated
      FROM
        ${this.tableName}
      ORDER BY
        vc_payment_type`;

      const result = await Database.executeQuery(query, []);
      return result[0];
    } catch (e) {
      Logger.error(e);
    }

    return [];
  }
}

module.exports = new PaymentTypeService();
