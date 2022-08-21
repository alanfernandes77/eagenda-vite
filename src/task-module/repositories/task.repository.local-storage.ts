import { IContext } from "../../shared/interfaces/context.interface";
import { IRepository } from "../../shared/interfaces/repository.interface";
import { Task } from "../models/task";

export class TaskRepositoryLocalStorage implements IRepository<Task>, IContext {
  private readonly localKey: string;
  private readonly localStorage: Storage;
  private tasks: Task[];

  constructor() {
    this.localKey = "tasks";
    this.localStorage = window.localStorage;
    this.tasks = this.getAll();
  }

  saveChanges(): void {
    const serializedTasks = JSON.stringify(this.tasks);

    this.localStorage.setItem(this.localKey, serializedTasks);
  }

  insert(entity: Task): void {
    this.tasks.push(entity);
    this.saveChanges();
  }

  update(id: string, updatedEntity: Task): void {
    const selectedId = this.tasks.findIndex((t) => t.id === id);

    this.tasks[selectedId] = {
      id: id,
      description: updatedEntity.description,
      priority: updatedEntity.priority,
      creationDate: updatedEntity.creationDate
    };

    this.saveChanges();
  }

  delete(id: string): void {
    this.tasks = this.tasks.filter((x) => x.id !== id);
    this.saveChanges();
  }

  getAll(): Task[] {
    const key = this.localStorage.getItem(this.localKey);

    if (key) return JSON.parse(key);

    return [];
  }

  getById(id: string): Task | undefined {
    return this.tasks.find((t) => t.id === id);
  }
}
