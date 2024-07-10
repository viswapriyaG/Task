// src/controllers/taskController.js
let tasks = [];
let nextTaskId = 1;

const getAllTasks = (req, res) => {
  res.json(tasks);
};

const getTaskById = (req, res) => {
  const id = parseInt(req.params.id);
  const task = tasks.find(task => task.id === id);
  if (task) {
    res.json(task);
  } else {
    res.status(404).send('Task not found');
  }
};

const createTask = (req, res) => {
  const { name, completed } = req.body;
  const newTask = { id: nextTaskId++, name, completed: completed || false };
  tasks.push(newTask);
  res.status(201).json(newTask);
};

const updateTask = (req, res) => {
  const id = parseInt(req.params.id);
  const { name, completed } = req.body;
  let updatedTask = tasks.find(task => task.id === id);
  if (updatedTask) {
    updatedTask.name = name || updatedTask.name;
    updatedTask.completed = completed !== undefined ? completed : updatedTask.completed;
    res.json(updatedTask);
  } else {
    res.status(404).send('Task not found');
  }
};

const deleteTask = (req, res) => {
  const id = parseInt(req.params.id);
  tasks = tasks.filter(task => task.id !== id);
  res.status(204).send();
};

module.exports = {
  getAllTasks,
  getTaskById,
  createTask,
  updateTask,
  deleteTask
};