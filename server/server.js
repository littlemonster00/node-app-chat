const express = require('express');
const bodyParser = require('body-parser');
const http = require('http');
const path = require('path');


const {mongoose} = require('./db/mongoose'); /* connect mongodb */
const pathPublic = path.join(__dirname, '../public');

// import routing
const user_register = require('./routes/user_register'); /* use mini application route */
const user_login = require('./routes/user_login');
const user_logout = require('./routes/user_logout');
const todo_get_all = require('./routes/todos_get_all');
const todo_create = require('./routes/todo_create');
const todo_get_id = require('./routes/todos_get_id');
const todo_delete = require('./routes/todos_delete');
const todo_update = require('./routes/todos_update');
const credit_create = require('./routes/user_create_credit');
const user_recharge = require('./routes/user_recharge');
const user_payment = require('./routes/user_payment');


const port = process.env.PORT || 3000;
let app = express();
let server = http.createServer(app);

app.use(bodyParser.urlencoded({extended: false})); /* using for form */
app.use(bodyParser.json()); /* applicaton/json */

// route
app.use(express.static(pathPublic));

app.use(user_register.router);
app.use(user_login.router);
app.use(user_logout.router)
app.use(todo_create.router);
app.use(todo_get_all.router);
app.use(todo_get_id.router);
app.use(todo_delete.router);
app.use(todo_update.router);
app.use(credit_create.router);
app.use(user_recharge.router);
app.use(user_payment.router);
// app.get('/users', (req, res) => {
//   res.sendFile()
// });

server.listen(port, () => console.log(`Sever is up on ${port}`));