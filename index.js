const express = require('express');
const app = express();
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const cookieSession = require('cookie-session');
const auth = require('./auth');
const dotenv = require('dotenv');
const path = require('path');

dotenv.config();

app.use(bodyParser.json());
app.use(cors());

const PORT = process.env.PORT || 8000;

mongoose
  .connect(
    process.env.MANGODB_URI ||
      'mongodb+srv://admin:Zxcvbnm@cluster0.wjlg0.mongodb.net/test?retryWrites=true&w=majority',
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    }
  )
  .then((result) => console.log('conntected'))
  .catch((err) => console.log(err));

const userRoutes = require('./routes/userRoutes');

// console.log(path.join(__dirname, 'client', 'build', 'index.html'));
app.use(cookieParser());
app.use(
  cookieSession({
    name: 'session',
    keys: ['somekey'],
    maxAge: 24 * 60 * 60 * 1000, // 24 hours
  })
);


app.use(auth);
app.use('/', userRoutes);

app.use(express.static(path.join(__dirname, 'client', 'build')));
app.get('*', function (req, res) {
  res.sendFile(path.join(__dirname, 'client', 'build', 'index.html'));
});

app.listen(PORT, () => console.log('Listening'));
