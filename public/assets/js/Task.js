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
    this.project = project
  }

  static save(task) {
    TaskStorage.save(task);
  }

  static getAll() {
    return TaskStorage.getAll();
  }
}

const TaskStorage = {
  getAll: () => JSON.parse(localStorage.getItem('tasks')) || [],
  save: (task) => {
    const tasks = TaskStorage.getAll();
    tasks.push(task);
    localStorage.setItem('tasks', JSON.stringify(tasks));
  }
}

export { Task }