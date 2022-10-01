const Response = require('../utils/Response');
const Logger = require('../utils/Logger');
const PaymentTypeService = require('../services/PaymentTypeService');

class PaymentTypeController {
  constructor() {
    this.service = PaymentTypeService;
  }

  async getAll(event) {
    try {
      if (this.service !== undefined) {
        const paymentTypes = await this.service.getAll();

        if (paymentTypes.length === 0) {
          return Response.jsonResponse(404, { message: 'No payment types found' });
        }

        return Response.jsonResponse(200, { message: 'Payment types retrevied', data: paymentTypes });
      }
    } catch (e) {
      Logger.error(e);
    }

    return Response.jsonResponse(500, { message: 'Internal server error' });
  }
}

module.exports = new PaymentTypeController();
