const CategoryController = require('./controllers/CategoryController');
const SubCategoryController = require('./controllers/SubCategoryController');
const MovementTypeController = require('./controllers/MovementTypeController');
const PaymentTypeController = require('./controllers/PaymentTypeController');
const MovementController = require('./controllers/MovementController');

const getCategories = async (event) => {
  const response = await CategoryController.getAll(event);
  return response;
};

const getSubCategories = async (event) => {
  const response = await SubCategoryController.getAll(event);
  return response;
};

const getMovementsType = async (event) => {
  const response = await MovementTypeController.getAll(event);
  return response;
};

const getPaymentsType = async (event) => {
  const response = await PaymentTypeController.getAll(event);
  return response;
};

const getMovements = async (event) => {
  const response = await MovementController.getAll(event);
  return response;
};

const createMovement = async (event) => {
  const response = await MovementController.create(event);
  return response;
};

const helloWordl = async (event) => {
  const response = {
    statusCode: 200,
    body: JSON.stringify({
      age: 12,
      name: 'John',
      lastname: 'Doe Doe Doe Doe Doe',
      age3: 12,
      name3: 'John',
      lastname3: 'Doe Doe Doe Doe Doe',
      message: 'Hello World!',
      event_data: event,
    }),
  };
  return response;
};

module.exports = {
  getCategories,
  getSubCategories,
  getMovementsType,
  getPaymentsType,
  getMovements,
  createMovement,
  helloWordl,
};
