import { TaskModel } from "../models/TaskModel";
import { Task, Subtask } from "../../../domain/entities/Task";
import { TeamModel } from "../models/TeamModel";
import { ProjectModel } from "../models/projectModel";
import mongoose from "mongoose";
export class TaskRepository {
  async create(taskData: Partial<Task>) {
    const newTask = new TaskModel(taskData);
    await newTask.save();

    const taskWithUser = await TaskModel.aggregate([
      { $match: { _id: newTask._id } },
      {
        $lookup: {
          from: "users",
          localField: "assignedTo",
          foreignField: "_id",
          as: "assignedToDetails",
        },
      },
      {
        $unwind: {
          path: "$assignedToDetails",
          preserveNullAndEmptyArrays: true,
        },
      },
      {
        $project: {
          _id: 1,
          projectId: 1,
          name: 1,
          description: 1,
          userId: 1,
          assignedTo: {
            _id: "$assignedToDetails._id",
            name: "$assignedToDetails.name",
            email: "$assignedToDetails.email",
            role: "$assignedToDetails.role",
            profilePic: "$assignedToDetails.profilePic",
            location: "$assignedToDetails.location",
            phone: "$assignedToDetails.phone",
          },
          status: 1,
          priority: 1,
          dueDate: 1,
          subtasks: 1,
          createdAt: 1,
          updatedAt: 1,
        },
      },
    ]);

    return taskWithUser.length > 0 ? taskWithUser[0] : null;
  }

  async createSubtask(subtaskData: any) {
    console.log("touching the create sub task repository");
    const { taskId, name, description, priority, dueDate, status } =
      subtaskData;

    const task = await TaskModel.findById(taskId);
    if (!task) {
      throw new Error("Task not found");
    }

    task.subtasks.push({
      taskId,
      name,
      description,
      priority,
      dueDate,
      status,
    });

    await task.save();
    return task;
  }

  async findByProjectId(projectId: string): Promise<Task[]> {
    const tasks = await TaskModel.aggregate([
      {
        $match: { projectId: new mongoose.Types.ObjectId(projectId) }, // Filter by projectId
      },
      {
        $lookup: {
          from: "users",
          localField: "userId",
          foreignField: "_id",
          as: "userDetails",
        },
      },
      {
        $lookup: {
          from: "users",
          localField: "assignedTo",
          foreignField: "_id",
          as: "assignedUserDetails",
        },
      },
      {
        $lookup: {
          from: "subtasks",
          localField: "_id",
          foreignField: "taskId",
          as: "subtasks",
        },
      },
      {
        $addFields: {
          user: { $arrayElemAt: ["$userDetails", 0] },
          assignedUser: { $arrayElemAt: ["$assignedUserDetails", 0] },
        },
      },
      {
        $project: {
          userDetails: 0, // Remove extra array fields
          assignedUserDetails: 0,
          "user.password": 0, // Exclude sensitive data
          "assignedUser.password": 0,
        },
      },
    ]);

    return tasks.map(
      (task) =>
        new Task(
          task._id.toString(),
          task.projectId.toString(),
          task.name,
          task.description,
          task.userId.toString(),
          task.assignedTo?.toString(),
          task.status,
          task.priority,
          task.dueDate,
          (task.subtasks ?? []).map(
            (subtask: any) =>
              new Subtask(
                subtask._id.toString(),
                subtask.taskId.toString(),
                subtask.name,
                subtask.description,
                subtask.priority,
                subtask.status,
                subtask.dueDate,
                subtask.createdAt,
                subtask.updatedAt
              )
          ),
          task.createdAt,
          task.updatedAt,
          task.user
            ? {
                id: task.user._id.toString(),
                name: task.user.name,
                email: task.user.email,
                role: task.user.role,
                profilePic: task.user.profilePic,
              }
            : null,
          task.assignedUser
            ? {
                id: task.assignedUser._id.toString(),
                name: task.assignedUser.name,
                email: task.assignedUser.email,
                role: task.assignedUser.role,
                profilePic: task.assignedUser.profilePic,
              }
            : null
        )
    );
  }

  async getAll(userId: string): Promise<Task[]> {
    console.log(userId, "user id from get all");
    if (!mongoose.Types.ObjectId.isValid(userId)) {
      throw new Error("Invalid user ID");
    }

    const teams = await TeamModel.find({
      $or: [
        { teamLeadId: new mongoose.Types.ObjectId(userId) },
        { members: new mongoose.Types.ObjectId(userId) },
      ],
    }).select("_id");

    console.log("Teams:", teams);

    const teamIds = teams.map((team) => team._id); 

    console.log("Team IDs:", teamIds);

    if (teamIds.length === 0) {
      return [];
    }

    const projects = await ProjectModel.find({
      teamId: { $in: teamIds },
    }).select("_id");


    console.log("Projects:", projects);

    const projectIds = projects.map((project) => project._id); // Extract project IDs

    console.log("Project IDs:", projectIds);

    if (projectIds.length === 0) {
      return [];
    }

    
    const tasks = await TaskModel.aggregate([
      {
        $match: { projectId: { $in: projectIds } }, 
      },
      {
        $lookup: {
          from: "projects",
          localField: "projectId",
          foreignField: "_id",
          as: "project",
        },
      },
      { $unwind: "$project" },
      {
        $lookup: {
          from: "users",
          localField: "assignedTo",
          foreignField: "_id",
          as: "assignedUser",
        },
      },
      { $unwind: { path: "$assignedUser", preserveNullAndEmptyArrays: true } },
      {
        $lookup: {
          from: "subtasks",
          localField: "_id",
          foreignField: "taskId",
          as: "subtasks"
        }
      },
      {
        $project: {
          _id: 1,
          name: 1,
          description: 1,
          status: 1,
          priority: 1,
          dueDate: 1,
          createdAt: 1,
          updatedAt: 1,
          "assignedUser._id": 1,
          "assignedUser.name": 1,
          "assignedUser.email": 1,
          "project._id": 1,
          "project.name": 1,
          "project.description": 1,
          "project.category": 1,
          "project.status": 1,

          subtasks: { $ifNull: ["$subtasks", []] }
          
        },
      },
    ]);

    // Debug: Log the tasks
    console.log("Tasks:", tasks);

    return tasks;
  }

  async findById(id: string): Promise<Task | null> {
    const task = await TaskModel.findById(id);
    if (!task) return null;

    return new Task(
      task.id,
      task.projectId.toString(),
      task.name,
      task.description,
      task.userId.toString(),
      task.assignedTo.toString(),
      task.status,
      task.priority,
      task.dueDate,
      task.subtasks.map(
        (subtask) =>
          new Subtask(
            subtask.id,
            subtask.taskId.toString(),
            subtask.name,
            subtask.description,
            subtask.priority,
            subtask.status,
            subtask.createdAt,
            subtask.updatedAt
          )
      ),
      task.createdAt,
      task.updatedAt
    );
  }

  async update(taskId: string, updatedTaskData: Partial<Task>) {
    const updatedTask = await TaskModel.findByIdAndUpdate(
      taskId,
      { $set: updatedTaskData },
      { new: true }
    );

    return updatedTask;
  }

  async delete(id: string): Promise<boolean> {
    const result = await TaskModel.findByIdAndDelete(id);
    return !!result;
  }

  async getTasksByUserId(userId: string) {
    const tasks = await TaskModel.aggregate([
      { $match: { assignedTo: new mongoose.Types.ObjectId(userId) } },
      {
        $lookup: {
          from: "users",
          localField: "assignedTo",
          foreignField: "_id",
          as: "assignedToDetails",
        },
      },
      {
        $unwind: {
          path: "$assignedToDetails",
          preserveNullAndEmptyArrays: true,
        },
      },
      {
        $project: {
          _id: 1,
          projectId: 1,
          name: 1,
          description: 1,
          userId: 1,
          assignedTo: {
            _id: "$assignedToDetails._id",
            name: "$assignedToDetails.name",
            email: "$assignedToDetails.email",
            role: "$assignedToDetails.role",
            profilePic: "$assignedToDetails.profilePic",
            location: "$assignedToDetails.location",
            phone: "$assignedToDetails.phone",
          },
          status: 1,
          priority: 1,
          dueDate: 1,
          subtasks: 1,
          createdAt: 1,
          updatedAt: 1,
        },
      },
    ]);

    return tasks;
  }

  async updateSubtask(
    taskId: string,
    subtaskId: string,
    updateData: any
  ): Promise<Subtask | null> {
    console.log("update subtask in repositor");
    console.log(updateData);
    const updatedTask = await TaskModel.findOneAndUpdate(
      { _id: taskId, "subtasks._id": subtaskId },
      {
        $set: {
          "subtasks.$.name": updateData.title,
          "subtasks.$.description": updateData.description,
          "subtasks.$.status": updateData.status,
          "subtasks.$.priority": updateData.priority,
          "subtasks.$.dueDate": updateData.dueDate,
          "subtasks.$.updatedAt": new Date(),
        },
      },
      { new: true }
    );

    if (!updatedTask) return null;

    const updatedSubtask = updatedTask.subtasks.find(
      (sub) => sub.id === subtaskId
    );
    if (!updatedSubtask) return null;

    return new Subtask(
      updatedSubtask.id,
      updatedSubtask.taskId.toString(),
      updatedSubtask.name,
      updatedSubtask.description,
      updatedSubtask.priority,
      updatedSubtask.status,
      updatedSubtask.createdAt,
      updatedSubtask.updatedAt
    );
  }

  async getSubtasksByUserId(userId: string) {
    console.log("Entering getSubtasksByUserId repository");

    const subtasks = await TaskModel.aggregate([
      { $match: { assignedTo: new mongoose.Types.ObjectId(userId) } }, // Match parent task
      { $unwind: "$subtasks" },
      {
        $project: {
          _id: "$subtasks._id",
          name: "$subtasks.name",
          description: "$subtasks.description",
          status: "$subtasks.status",
          priority: "$subtasks.priority",
          dueDate: "$subtasks.dueDate",
          parentTaskId: "$_id",
        },
      },
    ]);

    console.log(subtasks, "Fetched Subtasks");
    return subtasks;
  }

  async deleteSubtask(subtaskId: string) {
    console.log(`Deleting subtask with ID: ${subtaskId}`);

    const updatedTask = await TaskModel.findOneAndUpdate(
      { "subtasks._id": new mongoose.Types.ObjectId(subtaskId) },
      { $pull: { subtasks: { _id: subtaskId } } },
      { new: true }
    );

    if (!updatedTask) {
      console.log("Subtask not found or already deleted.");
    } else {
      console.log("Subtask deleted successfully.");
    }

    return updatedTask;
  }

  async getSubtasksByTaskId(taskId: string) {
    return await TaskModel.aggregate([
      { $match: { _id: new mongoose.Types.ObjectId(taskId) } },
      { $unwind: "$subtasks" },
      {
        $project: {
          _id: "$subtasks._id",
          title: "$subtasks.name",
          description: "$subtasks.description",
          status: "$subtasks.status",
          priority: "$subtasks.priority",
          dueDate: "$subtasks.dueDate",
        },
      },
    ]);
  }
}
