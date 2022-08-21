import { Entity } from "../models/entity.model.js";

export interface IRepository<T extends Entity> {

  insert(entity: T): void;
  update(id: string, updatedEntity: T): void;
  delete(id: string): void;
  getAll(): T[];
  getById(id: string): T | undefined;
  
}