module.exports = app => {
    const controller = require('../controllers/customerEvents')();
  
    app.route('/api/v1/customer-events')
      .get(controller.listCustomerEvents)
      .post(controller.saveCustomerEvents);
  }
