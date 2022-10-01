const Response = require('../utils/Response');
const Logger = require('../utils/Logger');
const MovementService = require('../services/MovementService');

class MovementController {
  constructor() {
    this.service = MovementService;
  }

  async getAll(event) {
    try {
      if (this.service !== undefined) {
        const movements = await this.service.getAll();

        if (movements.length === 0) {
          return Response.jsonResponse(404, { message: 'No movements found' });
        }

        return Response.jsonResponse(200, { message: 'Movements retrevied', data: movements });
      }
    } catch (e) {
      Logger.error(e);
    }

    return Response.jsonResponse(500, { message: 'Internal server error' });
  }

  async create(event) {
    try {
      if (this.service !== undefined) {
        const {
          date,
          price,
          description,
          idCategory,
          idSubCategory,
          idMovementType,
          idPaymentType,
        } = JSON.parse(event.body);

        if (!date
          || !price
          || !idCategory
          || !idSubCategory
          || !idMovementType
          || !idPaymentType) {
          return Response.jsonResponse(400, { message: 'date, price, idCategory, idSubCategory, idMovementType, idPayment are required' });
        }

        const newMovement = {
          date,
          price,
          description: description || '',
          idCategory,
          idSubCategory,
          idMovementType,
          idPaymentType,
        };

        let movement = await this.service.create(newMovement);
        if (movement && movement.affectedRows > 0 && movement.insertId > 0) {
          movement = await this.service.getById(movement.insertId);
          return Response.jsonResponse(201, { message: 'Movement created', data: movement });
        }
      }
    } catch (e) {
      Logger.error(e);
    }

    return Response.jsonResponse(500, { message: 'Internal server error' });
  }
}

module.exports = new MovementController();
