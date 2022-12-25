const express = require("express");
const router = express.Router();
const tasksController = require("./controllers/TasksController");
const tasksMiddleware = require("./middlewares/tasksMiddlewares");

router.get("/tasks", tasksController.getAll);
router.post("/tasks",tasksMiddleware.validateBody, tasksController.createTask);
router.delete("/tasks/:id", tasksController.deleteTask);
router.put("/tasks/:id", tasksController.updateTask);
router.get("/tasks/filter", tasksController.filterTask);
router.get("/", tasksController.home);

module.exports = router;