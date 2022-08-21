import { Guid } from "./guid.model.js";

export abstract class Entity {
  
  public id: string;

  constructor() {
    this.id = new Guid().generateNewId();
  }
  
}