const express = require("express");
const fileUpload = require('express-fileupload');
const routes = require('./routes/routes');
const app = express();

app.use(fileUpload({
  createParentPath: true
}));
app.use(express.static('uploads'));


app.use(express.json());
app.use('/', routes);

const listener = app.listen(process.env.PORT || 3080, () => {
  console.log('Listening on port ' + listener.address().port)
})