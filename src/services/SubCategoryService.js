const Database = require('../utils/Database');
const Logger = require('../utils/Logger');

class SubCategoryService {
  constructor() {
    this.tableName = 'sub_categories';
  }

  async getAll() {
    try {
      const query = `
      SELECT
        bi_id,
        vc_sub_category,
        IFNULL(vc_description, '') vc_description,
        bi_category_id,
        dt_timestamp_created,
        dt_timestamp_updated
      FROM
        ${this.tableName}
      ORDER BY
        vc_sub_category`;

      const result = await Database.executeQuery(query, []);
      return result[0];
    } catch (e) {
      Logger.error(e);
    }

    return [];
  }

  async getByIdCategory(idCategory) {
    try {
      const query = `
      SELECT
        bi_id,
        vc_sub_category,
        IFNULL(vc_description, '') vc_description,
        bi_category_id,
        dt_timestamp_created,
        dt_timestamp_updated
      FROM
        ${this.tableName}
      WHERE
        bi_category_id = ?
      ORDER BY
        vc_sub_category`;

      const result = await Database.executeQuery(query, [idCategory]);
      return result[0];
    } catch (e) {
      Logger.error(e);
    }

    return [];
  }
}

module.exports = new SubCategoryService();
