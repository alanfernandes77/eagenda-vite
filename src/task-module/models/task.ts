import { Entity } from "../../shared/models/entity.model";
import { TaskPriority } from "./priority.enum";

export class Task extends Entity {
  public description: string;
  public priority: TaskPriority;
  public creationDate: string;

  constructor(description: string, priority: TaskPriority, id?: string) {
    super();

    if (id) this.id = id;

    this.description = description;
    this.priority = priority;
    this.creationDate = new Date().toLocaleString();
  }
}