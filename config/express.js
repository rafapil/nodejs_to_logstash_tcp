const express       = require('express');
const bodyParser    = require('body-parser');
const config        = require('config');

module.exports = () =>{
    const app = express();

    // setando variaveis da aplicacao 
    app.set('port', process.env.PORT || config.get('server.port'));

    // middwares
    app.use(bodyParser.json());

    require('../api/routes/customerEvents')(app);

    return app; 
}

