const express = require("express");
const routes = require('./routes/routes');
const app = express();

app.use(express.json());
app.use('/', routes);

const listener = app.listen(process.env.PORT || 3080, () => {
  console.log('Listening on port ' + listener.address().port)
})