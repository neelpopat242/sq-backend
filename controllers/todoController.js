const Todo = require("../models/todoModel");
exports.createTodo = async (req, res) => {
  const { title, status } = req.body;

  try {
    const todo_response = await Todo.create({
      title,
      status,
    });
    res.status(200).json({
      success: true,
      title,
      status,
    });
  } catch (err) {
    res.status(400).json({
      success: false,
      error: err.message,
    });
  }
};

exports.getTodos = async (req, res) => {
  try {
    const todo_response = await Todo.find({});
    console.log(todo_response);
    res.status(200).json({
      success: true,
      todo_response,
    });
  } catch (err) {
    res.status(500).json({
      error: err.message,
    });
  }
};

exports.deleteTodo = async (req, res) => {
  try {
    const { id } = req.params;
    await Todo.findByIdAndDelete(id);

    res.status(200).json({
      success: true,
      message: "suceessfully deleted",
    });
  } catch {
    res.status(500).json({
      err: "Doesn't exists",
    });
  }
};

exports.updateTodo = async (req, res) => {
  const { id } = req.params;
  const { title, status } = req.body;
  if (!title || !status) {
    res.status(400).json({
      error: "Please don't leave any field empty",
    });
  }

  const response = await Todo.findByIdAndUpdate(id, req.body);

  res.status(200).json({
    success: true,
  });
};
