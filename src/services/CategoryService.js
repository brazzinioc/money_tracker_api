const Database = require('../utils/Database');
const Logger = require('../utils/Logger');

class CategoryService {
  constructor() {
    this.tableName = 'categories';
  }

  async getAll() {
    try {
      const query = `
      SELECT
          bi_id,
          vc_category,
          IFNULL(vc_description, '') vc_description,
          dt_timestamp_created,
          dt_timestamp_updated
      FROM
        ${this.tableName}
      ORDER BY
        vc_category`;

      const result = await Database.executeQuery(query, []);
      return result[0];
    } catch (e) {
      Logger.error(e);
    }

    return [];
  }
}

module.exports = new CategoryService();
