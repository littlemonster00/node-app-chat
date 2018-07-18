const path = require('path');
const express = require('express');

const pathPublic = path.join(__dirname,'../public');

const port = process.env.PORT || 3000;
const app = express();
app.use(express.static(pathPublic));

// app.get('/', (req, res) => {
//     res.status(200).sendFile('index.html');
// });
app.listen(port, () => console.log(`Server is up ${port}`));