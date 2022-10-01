const Response = require('../utils/Response');
const Logger = require('../utils/Logger');
const SubCategoryService = require('../services/SubCategoryService');

class SubCategoryController {
  constructor() {
    this.service = SubCategoryService;
  }

  async getAll(event) {
    try {
      let idCategory;

      if (event.queryStringParameters !== null) {
        idCategory = event.queryStringParameters.idCategory || undefined;
      }

      if (this.service !== undefined) {
        let subCategories;

        if (idCategory && idCategory > 0) {
          subCategories = await this.service.getByIdCategory(idCategory);
        } else {
          subCategories = await this.service.getAll();
        }

        if (subCategories && subCategories.length === 0) {
          return Response.jsonResponse(404, { message: 'No sub categories found' });
        }

        return Response.jsonResponse(200, { message: 'Sub categories retrevied', data: subCategories });
      }
    } catch (e) {
      Logger.error(e);
    }

    return Response.jsonResponse(500, { message: 'Internal server error' });
  }
}

module.exports = new SubCategoryController();
