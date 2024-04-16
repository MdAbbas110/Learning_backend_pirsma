import { Task } from '../models/task.js';

export const newTask = async (req, res, next) => {
  const { title, description } = req.body;

  if (!title) return res.status(404).json({ msg: 'title is required' });

  const data = await Task.create({
    title,
    description,
    user: req.user,
  });

  res.status(201).json({
    success: true,
    msg: 'task added successfully',
  });
};
