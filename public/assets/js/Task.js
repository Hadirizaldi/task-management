import { generateId } from './utils/function.js';
import { Priority } from './utils/Priority.js';

class Task {
  constructor(taskName, priority = Priority.LOW, project) {
    if (!Priority.isValid(priority)) {
      throw new Error(`Invalid priority value: ${priority}`);
    }

    this.id = generateId('task');
    this.name = taskName;
    this.priority = priority;
    this.project = project;
    this.isCompleted = false;
    this.createdAt = new Date();
  }

  static save(task) {
    TaskStorage.save(task);
    return {
      success: true,
      message: "Task saved successfully"
    }
  }

  static getAll() {
    return TaskStorage.getAll();
  }

  static delete(taskId) {
    TaskStorage.delete(taskId);
    return {
      success: true,
      message: "Task deleted successfully"
    }
  }
}

const TaskStorage = {
  getAll: () => JSON.parse(localStorage.getItem('tasks')) || [],
  save: (task) => {
    const tasks = TaskStorage.getAll();
    tasks.push(task);
    localStorage.setItem('tasks', JSON.stringify(tasks));
  },
  delete: (taskId) => {
    const tasks = TaskStorage.getAll();
    const updatedTasks = tasks.filter((task) => task.id !== taskId);
    localStorage.setItem('tasks', JSON.stringify(updatedTasks));
  }
}

export { Task }