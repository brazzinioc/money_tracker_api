const Response = require('../utils/Response');
const Logger = require('../utils/Logger');
const MovementTypeService = require('../services/MovementTypeService');

class MovementTypeController {
  constructor() {
    this.service = MovementTypeService;
  }

  async getAll(event) {
    try {
      if (this.service !== undefined) {
        const movementTypes = await this.service.getAll();

        if (movementTypes.length === 0) {
          return Response.jsonResponse(404, { message: 'No movement types found' });
        }

        return Response.jsonResponse(200, { message: 'Movement types retrevied', data: movementTypes });
      }
    } catch (e) {
      Logger.error(e);
    }

    return Response.jsonResponse(500, { message: 'Internal server error' });
  }
}

module.exports = new MovementTypeController();
