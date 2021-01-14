const express = require('express');
const router = express.Router();
const Users = require('../schema/userSchema');
const Todo = require('../schema/todoSchema');
const bcrypt = require('bcryptjs');
const ObjectID = require('mongodb').ObjectID;
const {
  registerValidation,
  loginValidation,
  resetValidation,
  taskValidation,
} = require('../validation/validation');

router.get('http://localhost:8000/test', (req, res) => {
  res.send('test');
});

router.post('/api/newuser', async (req, res) => {
  const { error } = registerValidation(req.body);

  if (error) return res.send({ message: error.details[0].message });

  const emailExist = await Users.findOne({ email: req.body.Email });
  if (emailExist) return res.send({ message: 'Email already exists! ' });

  const salt = await bcrypt.genSalt(10);
  const hashPassword = await bcrypt.hash(req.body.Password, salt);

  const user = new Users({
    name: req.body.Firstname,
    surrname: req.body.Lastname,
    email: req.body.Email,
    password: hashPassword,
  });

  try {
    const savedUser = await user.save();
    res.send({ message: 'Your account has been created!', correct: true });
  } catch (e) {
    res.status(400).send(e);
  }
});

router.post('/api/resetPassword', async (req, res) => {
  const { error } = resetValidation(req.body);

  if (error) return res.send({ message: error.details[0].message });

  const emailExist = await Users.findOne({ email: req.body.Email });
  if (!emailExist) return res.send({ message: 'Email not found! ' });

  if (req.body.NewPassword != req.body.ConfirmNewPassword)
    return res.send({ message: 'Passwords are not the same' });

  const salt = await bcrypt.genSalt(10);
  const newHashedPassword = await bcrypt.hash(req.body.NewPassword, salt);

  const updatedPassword = await Users.updateOne(
    { email: req.body.Email },
    { $set: { password: newHashedPassword } }
  );

  res.send({ message: 'Your password has been changed', correct: true });
});

router.post('/api/login', async (req, res, next) => {
  // const { error } = loginValidation(req.body);

  // if (error) return res.send({ message: error.details[0].message });

  const client = await Users.findOne({ email: req.body.Email });
  if (!client) return res.send({ message: 'Email not found!' });

  const validPass = await bcrypt.compare(req.body.Password, client.password);
  if (!validPass) return res.send({ message: 'Invalid password!' });

  req.session.user = client;
  const user = { ...client };

  res.cookie('user', user._doc);
  console.log(user._doc);
  res.send({ message: 'You are logged in', correct: true });
});

router.post('/api/signOut', (req, res) => {
  delete req.session.user;
  res.clearCookie('user');
  res.send('logged out');
});

router.post('/api/newToDo', async (req, res, next) => {
  const { error } = taskValidation(req.body);
  if (error) return res.send({ message: error.details[0].message });
  const { Title, Description, Priority } = req.body;

  const singleTodo = new Todo({
    userId: req.session.user._id,
    name: Title,
    description: Description,
    priority: Priority,
  });
  console.log(req.session.user);
  if (req.session.user.credits < 1) {
    return res.send({
      message: "You don't have enough credits",
    });
  }
  try {
    const savedSingleTodo = await singleTodo.save();
    const updateCredits = await Users.updateOne(
      { _id: req.session.user._id },

      {
        $set: {
          credits: req.session.user.credits - 1,
        },
      }
    );

    req.session.user.credits -= 1;

    const userStatus = await Users.findOne({ _id: req.session.user._id });

    if (userStatus.newUser) {
      const updateUserStatus = await Users.updateOne(
        { _id: req.session.user._id },

        {
          $set: {
            newUser: false,
          },
        }
      );

      req.session.user.newUser = false;
    }

    res.status(200).send({ message: 'You added task', correct: true });
    console.log(req.session.user.credits);
  } catch (e) {
    res.send({ message: 'Something went wrong' });
    console.log(e);
  }
});

router.post('/api/payCard', async (req, res) => {
  const { price } = req.body;
  try {
    const updateCredits = await Users.updateOne(
      { _id: req.session.user._id },

      {
        $set: {
          credits: req.session.user.credits + Math.ceil(price),
        },
      }
    );

    req.session.user.credits += Math.ceil(price);
    res.send({ message: 'Awesome!' });
  } catch (e) {
    res.send({ message: e });
  }
});

router.get('/api/todos', async (req, res) => {
  const todos = await Todo.find({ userId: req.session.user._id });
  res.send(todos);
});

router.post('/api/delete', async (req, res) => {
  const userToDelete = await Users.deleteOne({ _id: req.session.user._id });
  const deleteUserTasks = await Todo.deleteMany({
    userId: req.session.user._id,
  });

  delete req.session.user;
  res.clearCookie('user');
  res.send('logged out');
});

router.get('/api/userpanel', async (req, res) => {
  try {
    const userInfo = await Users.find({ _id: req.session.user._id });
    res.send({ correct: true, user: userInfo });
  } catch (e) {
    res.send(e);
  }
});

router.post('/api/changeStatusTask', async (req, res) => {
  const { idTask } = req.body;
  // const myId = JSON.parse(req.body.idTask);
  const newStatusTask = await Todo.updateOne(
    { _id: idTask },
    {
      $set: {
        complete: 'Completed',
        finishedDate: Date.now(),
      },
    }
  );
  res.send({ message: 'New status of task' });
});

module.exports = router;
