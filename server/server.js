const express = require('express');
const bodyParser = require('body-parser');
const http = require('http');

const {mongoose} = require('./db/mongoose'); /* connect mongodb */

// import routing
const user_register = require('./routes/user_register'); /* use mini application route */
const user_login = require('./routes/user_login');
const user_logout = require('./routes/user_logout');
const port = process.env.PORT || 3000;
let app = express();
let server = http.createServer(app);

app.use(bodyParser.urlencoded({extended: false})); /* using for form */
app.use(bodyParser.json()); /* applicaton/json */

// route
app.use(user_register.router);
app.use(user_login.router);
app.use(user_logout.router)

server.listen(port, () => console.log(`Sever is up on ${port}`));