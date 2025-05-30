import express from "express";
import { TaskController } from "../controllers/TaskController";

const router = express.Router();
const taskController = new TaskController();

router.post("/create", taskController.createTask.bind(taskController));
router.get('/:projectId', taskController.getTasksByProjectId.bind(taskController))
router.post("/subtask/create", taskController.createSubtask.bind(taskController));
router.get('/user/:userId', taskController.getTasksByUserId.bind(taskController))
router.get('/tasks/:userId', taskController.getAllTasks.bind(taskController))
router.put("/:taskId", taskController.updateTask.bind(taskController));
router.delete('/:id', taskController.deleteTask.bind(taskController))
router.post('/subtasks', taskController.createSubtask.bind(taskController))
router.get('/subtask/:userId', taskController.getSubtasksByUserId.bind(taskController));
router.delete('/subtask/:subtaskId', taskController.deleteSubtask.bind(taskController))
router.get('/:taskId/subtasks', taskController.getSubtasksByTaskId.bind(taskController))
router.put('/:taskId/subtasks/:subtaskId', taskController.updateSubtask.bind(taskController));

export default router;
