const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const fileRoutes = require('./routes/fileRoutes'); 
const userRoutes = require('./routes/userRoute'); 
const sequelize = require('./config/database');

const app = express();
const port = 8080;

app.use(bodyParser.json({ limit: "50mb" }));
app.use(cors()); 

app.use('/file', fileRoutes);
app.use('/user', userRoutes);

sequelize.sync().then(() => {
  app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
  });
});
