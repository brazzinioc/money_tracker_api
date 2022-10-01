const Response = require('../utils/Response');
const Logger = require('../utils/Logger');
const CategoryService = require('../services/CategoryService');

class CategoryController {
  constructor() {
    this.service = CategoryService;
  }

  async getAll(event) {
    try {
      if (this.service !== undefined) {
        const categories = await this.service.getAll();

        if (categories.length === 0) {
          return Response.jsonResponse(404, { message: 'No categories found' });
        }

        return Response.jsonResponse(200, { message: 'Categories retrevied', data: categories });
      }
    } catch (e) {
      Logger.error(e);
    }

    return Response.jsonResponse(500, { message: 'Internal server error' });
  }
}

module.exports = new CategoryController();
