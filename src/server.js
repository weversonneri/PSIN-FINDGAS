const express = require('express');
const routes = require('./routes');
const cors = require('cors');
const path = require('path');
const { sequelize } = require('./app/models/index');
require('dotenv').config();

const app = express();

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'app', 'views'));

app.use(express.static("public"));

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const PORT = process.env.PORT || 3001;

app.use('/api', routes);

app.listen(PORT, () => {
  console.log(`🔥 Server started at http://localhost:${PORT}`);

  sequelize.authenticate().then(() => {
    console.log('✅ Successfully connected with database.');
  })
    .catch((err) => {
      console.error('❌ Unable to connect to the database: ', err);
    });
});
