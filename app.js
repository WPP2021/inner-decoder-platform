const express = require('express');
const fileUpload = require('express-fileupload');
const cors = require('cors');
const routes = require('./routes');

const app = express();

app.use(cors());
app.use(express.json());
app.use(fileUpload({ createParentPath: true }));
app.use('/uploads', express.static('uploads'));
app.use('/reports', express.static('reports'));

app.use('/api', routes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server listening at http://localhost:${PORT}`);
});