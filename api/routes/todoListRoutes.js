'use strict';
module.exports = function(app) {

  var userHandlers = require('../controllers/userController.js');

  app.route('/register')
    .post(userHandlers.register);
    
  app.route('/sign_in')
    .post(userHandlers.sign_in)

  app.route('/mylinks')
    .get(userHandlers.loginRequired, userHandlers.get_my_links)
    .post(userHandlers.loginRequired, userHandlers.update_state)  
};
