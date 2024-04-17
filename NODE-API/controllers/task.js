import { Task } from '../models/task.js';
import ErrorClass from '../utils/error.js';

export const newTask = async (req, res, next) => {
  try {
    const { title, description } = req.body;

    if (!title) return next(new Error('not found any'));

    const data = await Task.create({
      title,
      description,
      user: req.user,
    });

    res.status(201).json({
      success: true,
      msg: 'task added successfully',
    });
  } catch (error) {
    next(error);
  }
};

export const getMyTasks = async (req, res, next) => {
  try {
    const userID = req.user._id;

    //find method will return the array of all the user associate with tasks
    const task = await Task.find({ user: userID });

    res.status(201).json({
      success: true,
      task,
    });
  } catch (error) {
    next(error);
  }
};

export const updateTask = async (req, res, next) => {
  try {
    const { id } = req.params;

    const task = await Task.findById(id);

    if (!task) return next(new ErrorClass('invalid id login', 404));

    //task is having the complete task object with title dis comp
    task.isCompleted = !task.isCompleted;
    //after put req we have to call the save method to update the object
    await task.save();

    res.status(201).json({
      success: true,
      msg: 'task updated',
      task,
    });
  } catch (error) {
    next(error);
  }
};

export const deleteTask = async (req, res, next) => {
  const { id } = req.params;

  const task = await Task.findById(id);

  if (!task) return next(new ErrorClass('invalid id login', 404));

  //save and deleteOne and delete are handy methods to change the db
  await task.deleteOne();

  res.status(201).json({
    success: true,
    msg: 'task deleted ',
    task,
  });
};
